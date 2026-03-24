import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("adding conveyors");

  const conveyors: { name: string }[] = [{ name: "201" }, { name: "202" }];

  await prisma.conveyor.createMany({
    data: conveyors,
    skipDuplicates: true,
  });
  console.log("conveyors added");

  const posts: { value: number; name: string }[] = [
    { value: 1, name: "Пост 1" },
    { value: 2, name: "Пост 2" },
    { value: 3, name: "Пост 3" },
    { value: 4, name: "Пост 4" },
  ];

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });

  const ranks: { val: number; description: string }[] = [
    { val: 1, description: "1-й разряд" },
    { val: 2, description: "2-й разряд" },
    { val: 3, description: "3-й разряд" },
    { val: 4, description: "4-й разряд" },
    { val: 5, description: "5-й разряд" },
  ];

  await prisma.rank.createMany({
    data: ranks,
    skipDuplicates: true,
  });

  const allPosts = await prisma.post.findMany();
  const postMap = new Map(allPosts.map((p) => [p.value, p.id]));
  const postMapById = new Map(allPosts.map((p) => [p.id, p.value]));
  const allRanks = await prisma.rank.findMany();
  const ranksMap = new Map(allRanks.map((p) => [p.val, p.id]));
  const ranksMapById = new Map(allRanks.map((p) => [p.id, p.val]));
  const allConveyors = await prisma.conveyor.findMany();
  const conveyorsMap = new Map(allConveyors.map((c) => [c.name, c.id]));

  const printers: { conveyor_id: number; port: number; ip: string }[] = [
    {
      conveyor_id: conveyorsMap.get("201"),
      port: 9100,
      ip: "192.168.251.248",
    },
    {
      conveyor_id: conveyorsMap.get("202"),
      port: 9100,
      ip: "192.168.250.97",
    },
  ].filter(
    (p): p is { conveyor_id: number; port: number; ip: string } =>
      p.conveyor_id !== undefined,
  );

  await prisma.printer.createMany({
    data: printers,
    skipDuplicates: true,
  });

  const operations: {
    post_id: number;
    description: string;
    min_rank_id: number;
  }[] = [
    {
      post_id: postMap.get(1)!,
      description: "Замена пуансона",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка вылета носика",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Замена матрицы и внутреннего формирователя",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Позиционирование матрицы",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка датчика наличия тубы",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка толкателя туб",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка длины отреза",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка высоты резца",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка накатных роликов",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Замена полировочной щетки",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Настройка входного и выходного барабана",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Синхронизация печей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Натяжка цепей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "ТО №1",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "ТО №2",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "ТО №3",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Прочее",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(1)!,
      description: "Простой",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Настройка вдува",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Настройка положения форсунок",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Настройка давления впрыска",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Настройка входного и выходного барабана",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Синхронизация печей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Натяжка цепей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Замена лака и прокачка системы",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "ТО №1",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "ТО №2",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "ТО №3",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Прочее",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(2)!,
      description: "Простой",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка положения валов",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Регулировка высоты поддона с грунтом",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Замена клише",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка количества отпечатков",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка положения анилоксового вала",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка положения формного вала",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка параллельности станины принтера",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Настройка входного и выходного барабана",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Синхронизация печей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Натяжка цепей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Регулировка толщины слоя краски",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Замена офсетного полотна",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "ТО №1",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "ТО №2",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "ТО №3",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Прочее",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(3)!,
      description: "Простой",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Настройка высоты колпачка",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Настройка затяжки колпачка",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Разборка форсунки",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Сборка форсунки",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Настройка распыления герметика",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Замена герметика и прокачка системы",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Настройка толкателя тубы",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Настройка входного и выходного барабана",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Натяжка цепей",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "ТО №1",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "ТО №2",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "ТО №3",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Прочее",
      min_rank_id: ranksMap.get(1)!,
    },
    {
      post_id: postMap.get(4)!,
      description: "Простой",
      min_rank_id: ranksMap.get(1)!,
    },
  ];

  await prisma.operation.createMany({
    data: operations.map((item, idx) => {
      return {
        ...item,
        value:
          String(postMapById.get(item.post_id)) +
          String(idx + 1).padStart(3, "0") +
          String(ranksMapById.get(item.min_rank_id)),
      };
    }),
    skipDuplicates: true,
  });

  // employees
  const employees: { name: string; barcode: string; rank_id: number }[] = [
    {
      name: "Скрипковский М.Ю.",
      barcode: "2000001416426",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Нестеров А.В.",
      barcode: "2000875313050",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Михайлюта В.В.",
      barcode: "2000875313067",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Кулагин М.В.",
      barcode: "2000875313074",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Карташов В.С.",
      barcode: "2000875313081",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Антипин Д.Б.",
      barcode: "2000874419142",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Варфоломеев С.Н.",
      barcode: "2000875313128",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Кандыба А.А.",
      barcode: "2000042277086",
      rank_id: ranksMap.get(3)!,
    },
    { name: "Клюев С.Э.", barcode: "2000875313135", rank_id: ranksMap.get(4)! },
    {
      name: "Кузнецов М.В.",
      barcode: "2000039532150",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Кулейкин А.А.",
      barcode: "2000875313142",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Михалковский А.Д.",
      barcode: "2000875313159",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Савьевский Д.А.",
      barcode: "2000875313166",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Тихонов А.А.",
      barcode: "2000875313173",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Колосков В.В.",
      barcode: "2000875313098",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Вакула А.М.",
      barcode: "2000872540411",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Залевский А.Ю.",
      barcode: "2000875313180",
      rank_id: ranksMap.get(4)!,
    },
    { name: "Ищук О.В.", barcode: "2000875313197", rank_id: ranksMap.get(4)! },
    {
      name: "Куцеволов С.Ю.",
      barcode: "2000875313203",
      rank_id: ranksMap.get(2)!,
    },
    { name: "Лотик Р.В.", barcode: "2000875313210", rank_id: ranksMap.get(3)! },
    {
      name: "Мачулко С.В.",
      barcode: "2000874419197",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Островский В.А.",
      barcode: "2000875313227",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Романов В.М.",
      barcode: "2000042301408",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Румянцев В.В.",
      barcode: "2000875313234",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Тырышкин А.А.",
      barcode: "2000875313241",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Цветков Д.В.",
      barcode: "2000875313104",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Абатуров А.Н.",
      barcode: "2000874638932",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Борисов К.С.",
      barcode: "2000039532136",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Горбунов Р.Ю.",
      barcode: "2000875313258",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Миханов А.Ю.",
      barcode: "2000875313265",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Новожилов М.А.",
      barcode: "2000040120155",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Петров М.В.",
      barcode: "2000875313272",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Пялисов А.Д.",
      barcode: "2000872911983",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Солтанов Р.Ш.",
      barcode: "2000875313289",
      rank_id: ranksMap.get(5)!,
    },
    { name: "Тямин В.В.", barcode: "2000875313296", rank_id: ranksMap.get(5)! },
    {
      name: "Халилов К.Н.",
      barcode: "2000040741916",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Слащев Д.А.",
      barcode: "2000875313111",
      rank_id: ranksMap.get(5)!,
    },
    {
      name: "Абакшинов Н.Б.",
      barcode: "2000875313302",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Белослудцев Д.М.",
      barcode: "2000875313319",
      rank_id: ranksMap.get(2)!,
    },
    { name: "Дудин И.В.", barcode: "2000875313326", rank_id: ranksMap.get(5)! },
    {
      name: "Дмитриев А.Н.",
      barcode: "2000875313333",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Коваленко Д.С.",
      barcode: "2000875313340",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Король С.М.",
      barcode: "2000875313357",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Максимов Л.Л.",
      barcode: "2000875313364",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Панарин С.В.",
      barcode: "2000875313371",
      rank_id: ranksMap.get(3)!,
    },
    {
      name: "Скляренко Э.Г.",
      barcode: "2000875313388",
      rank_id: ranksMap.get(4)!,
    },
    {
      name: "Сметанин А.А.",
      barcode: "2000875313395",
      rank_id: ranksMap.get(2)!,
    },
    {
      name: "Смирнов Д.А.",
      barcode: "2000875361778",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Ефимов А.В.",
      barcode: "2000875361822",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Савельев А.А.",
      barcode: "2000875361839",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Ольшевский Е.А.",
      barcode: "2000875366292",
      rank_id: ranksMap.get(1)!,
    },
    {
      name: "Виноградов В.И.",
      barcode: "2000875371906",
      rank_id: ranksMap.get(1)!,
    },
  ];

  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true,
  });
}
main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
