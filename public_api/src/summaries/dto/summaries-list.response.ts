import { ApiProperty } from "@nestjs/swagger";

export class PostStatusRow {
  @ApiProperty({ description: "ID поста", example: 1 })
  postId: number;

  @ApiProperty({ description: "Название поста", example: "Лакировка" })
  postName: string;

  @ApiProperty({
    description: "Технологическое значение/номер поста",
    example: 10,
  })
  postValue: number;

  // @ApiProperty({
  //   description: "Текущий физический режим работы оборудования",
  //   enum: ["работа", "операция", "то", "блокировка"],
  //   example: "то"
  // })
  // currentMode: "работа" | "операция" | "то" | "блокировка";

  @ApiProperty({
    description:
      "Флаг блокировки (true, если lablock активен и режим поста 'работа', 'то' или 'операция')",
    example: true,
  })
  isLocked: boolean;
}

export class SummaryRow {
  @ApiProperty({ description: "id сводки", example: 1 })
  id: number;

  @ApiProperty({ description: "Название конвейера", example: "201" })
  conveyorName: string;

  @ApiProperty({ description: "Код продукта", example: "057787" })
  productCode: string;

  @ApiProperty({
    description: "Наименование продукта",
    example: "Туба PRINCESS ESSEX Extra Red 60 мл D 28 мм металлическая 2023",
  })
  productName: string;

  @ApiProperty({ description: "Партия", example: "1234E26" })
  batchName: string;

  @ApiProperty({ description: "План", example: 40000 })
  plan: number;

  @ApiProperty({ description: "Активная", example: true })
  isActive: boolean;

  @ApiProperty({ description: "Завершена", example: false })
  isFinished: boolean;

  // @ApiProperty({ description: "Заблокирована", example: false })
  // isLocked: boolean;

  @ApiProperty({
    description: "Дата сводки",
    example: "2026-05-26T00:00:00.000Z",
  })
  date: Date;

  @ApiProperty({ description: "Смена", example: 2 })
  shift: number;

  @ApiProperty({
    type: [PostStatusRow],
    description:
      "Текущие статусы и состояния блокировок по всем постам конвейера",
  })
  postStatuses: PostStatusRow[];
}

export class SummariesListResponse {
  @ApiProperty({ type: [SummaryRow], description: "Список сводок" })
  summaries: SummaryRow[];
}
