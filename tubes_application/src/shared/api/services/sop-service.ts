import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface ISOPPicture {
  id: number;
  operation_id: number;
  src: string;
}

export interface ISOPPictureData {
  pictures: ISOPPicture[] | [];
}

export default class SopService {
  static async getSopPictures(
    operationId: number | null,
  ): Promise<ISOPPictureData> {
    const res = await $api.get(
      `${ApiRoutes.GET_SOP_PICTURES}?operation_id=${operationId}`,
    );
    return res.data;
  }
}
