import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as net from "node:net";
import { PrintZplDto } from "./print-zpl-dto";

@Injectable()
// export class ZplService {
//   private socket: net.Socket;
//   constructor() {}

//   async sendDataToSocket(dto: PrintZplDto) {
//     return new Promise((resolve, reject) => {
//       this.socket = new net.Socket();
//       this.socket.connect(dto.port, dto.ip, () => {
//         this.socket.write(dto.zpl, "ascii", () => {
//           this.socket.end();
//           resolve("");
//         });
//       });
//       this.socket.on("error", (error) => {
//         reject(error);
//       });
//     });
//   }

//   async printZPLData(dto: PrintZplDto) {
//     try {
//       await this.sendDataToSocket(dto);
//     } catch (error: unknown) {
//       const message =
//         error instanceof Error ? error.message : "Неизвестная ошибка печати";
//       throw new HttpException(message, HttpStatus.BAD_REQUEST);
//     }
//   }
// }
export class ZplService {
  private async sendDataToSocket(dto: PrintZplDto): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(5000);

      socket.connect(dto.port, dto.ip, () => {
        socket.write(dto.zpl, "ascii", () => {
          socket.end();
        });
      });

      socket.on("end", () => resolve());

      socket.on("timeout", () => {
        socket.destroy();
        reject(new Error("Printer connection timeout"));
      });

      socket.on("error", (error) => {
        socket.destroy();
        reject(error);
      });
    });
  }

  async printZPLData(dto: PrintZplDto) {
    try {
      await this.sendDataToSocket(dto);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Неизвестная ошибка печати";
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
