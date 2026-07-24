import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { SummariesService } from "./summaries.service";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { SummariesListResponse } from "./dto/summaries-list.response";
import { ChangeLockDto } from "./dto/change-lock.dto";

@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}

  @ApiOperation({ summary: "Получить список сводок" })
  @ApiOkResponse({ type: SummariesListResponse })
  @Get()
  getList(
    @Query(new ValidationPipe({ transform: true })) query: GetSummariesListDto,
  ): Promise<SummariesListResponse> {
    return this.summaryService.getList(query);
  }

  @ApiOperation({
    summary: "Установить/снять лабораторную блокировку сводки",
    description:
      "Переключает флаг isLocked на сводке и генерирует 4 записи блокировки/разблокировки в таблице Status для всех постов.",
  })
  @ApiOkResponse({
    description: "Успешное изменение состояния блокировки",
    schema: {
      oneOf: [
        {
          example: {
            message: "Сводка и посты успешно заблокированы",
            lock_id: 123,
          },
          description: "При переданном state: true",
        },
        {
          example: { message: "Сводка и посты успешно разблокированы" },
          description: "При переданном state: false",
        },
      ],
    },
  })
  @ApiBadRequestResponse({
    description: "Ошибка валидации бизнес-логики",
    schema: {
      oneOf: [
        {
          example: {
            statusCode: 400,
            message: "Сводка неактивна. Изменение статуса невозможно",
            error: "Bad Request",
          },
          description: "Когда у сводки флаг isActive === false",
        },
        {
          example: {
            statusCode: 400,
            message:
              "Пост уже находится в состоянии: 'Заблокирован'('Разблокирован')",
            error: "Bad Request",
          },
          description: "Когда запрашиваемый state совпадает с текущим isLocked",
        },
        {
          example: {
            statusCode: 400,
            message: "Пост завершил работу. Изменение статуса невозможно",
            error: "Bad Request",
          },
          description: "Когда пост уже завершил работу",
        },
        {
          example: {
            statusCode: 400,
            message:
              "Необходимо указать причину блокировки и имя сотрудника лаборатории",
            error: "Bad Request",
          },
          description:
            "В пэйлоаде блокировки не указана причина и имя сотрудника",
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: "Ошибка поиска сводки или поста в базе данных",
    schema: {
      oneOf: [
        {
          example: {
            statusCode: 404,
            message: "Сводка с указанным ID не найдена в базе данных",
            error: "Not found",
          },
          description: "Когда сводка с указанным id не найдена",
        },
        {
          example: {
            statusCode: 404,
            message: "Пост с таким номером не существует",
            error: "Not found",
          },
          description: "Когда пост с указанным номером не найден",
        },
        {
          example: {
            statusCode: 404,
            message: "Не найдена запись блокировки",
            error: "Not found",
          },
          description: "Попытка разблокировки при отсутствии записи блокировки",
        },
        {
          example: {
            statusCode: 404,
            message: "Не найдена запись статуса для изменения состояния",
            error: "Not found",
          },
          description:
            "Попытка разблокировки при отсутствии хоть одной записи статуса",
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("change-lock")
  changeLock(
    @Body(new ValidationPipe({ transform: true })) dto: ChangeLockDto,
  ) {
    return this.summaryService.changeLockState(dto);
  }
}
