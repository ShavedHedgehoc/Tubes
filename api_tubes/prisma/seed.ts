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

  const maintenances: { value: string, description: string, post_id: number, min_rank_id: number }[] = [
    {
      value: "1011",
      description: "ТО №1 (Пост 1)",
      post_id: postMap.get(1)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "1021",
      description: "ТО №2 (Пост 1)",
      post_id: postMap.get(1)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "2031",
      description: "ТО №1 (Пост 2)",
      post_id: postMap.get(2)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "2041",
      description: "ТО №2 (Пост 2)",
      post_id: postMap.get(2)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "3051",
      description: "ТО №1 (Пост 3)",
      post_id: postMap.get(3)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "3061",
      description: "ТО №2 (Пост 3)",
      post_id: postMap.get(3)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "4071",
      description: "ТО №1 (Пост 4)",
      post_id: postMap.get(4)!,
      min_rank_id: ranksMap.get(1)!,
    },
    {
      value: "4081",
      description: "ТО №2 (Пост 4)",
      post_id: postMap.get(4)!,
      min_rank_id: ranksMap.get(1)!,
    },

  ]

  await prisma.maintenance.createMany({
    data: maintenances,
    skipDuplicates: true,
  });

  const allMaintenances = await prisma.maintenance.findMany();
  const MaintenancesMap = new Map(allMaintenances.map((m) => [m.value, m.id]));

  const maintenanceTasks: { maintenance_id: number, title: string, order: number }[] = [
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Протирка мандрел, штока пуансона и съемника туб.",
      order: 1
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Проверка затяжки пуансона и штока пуансона.",
      order: 2
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Проверка узла подачи рондолей(жесткость подачи, состояние и положение пятака).",
      order: 3
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Протяжка крепежа наконечников мандрел. ",
      order: 4
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Визуальный осмотр состояния приводных ремней.",
      order: 5
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Очистка и смазка опорных пятаков мандрел.",
      order: 6
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Очистка и смазка направляющих триммера.",
      order: 7
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Проверка состояния тормозных колодок.",
      order: 8
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Очистка и визуальный осмотр направляющих и подшипников пресса.",
      order: 9
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Осмотр масляного фильтра на прессе, очистка при необходимости.",
      order: 10
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Осмотр состояния натяжителей цепей печи отжига, при обнаружение рывков и биений пружины, проверить чистоту звездочек внутри печи.",
      order: 11
    },
    {
      maintenance_id: MaintenancesMap.get("1011")!,
      title: "Очистка приемного барабана триммера.",
      order: 1
    },

    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Промывка масляного фильтра на маслоприемнике пресса.",
      order: 1,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Протяжка основания цангового патрона на прессе.",
      order: 2,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Смазка цепного привода перемещателя тубы и привода конвейера пресса. ",
      order: 3,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Проверка редуктора со вскрытием инспекционного люка на триммере.",
      order: 4,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Очистка масляной ванны в зоне коленорычажного механизма.",
      order: 5,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Протирка спиц аккумулятора, входного и выходного конвейера печи.",
      order: 6,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Очистка сетки фильтра вакуумного насоса.",
      order: 7,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Очистка печи отжига (звездочки, люльки, зольник).",
      order: 8,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Очистка ножей и посадочных мест, проверка крепления и износа режущих элементов, регулировка положения ножей при необходимости.",
      order: 9,
    },
    {
      maintenance_id: MaintenancesMap.get("1021")!,
      title: "Продувка внутренних каналов приемного барабана триммера",
      order: 10,
    },

    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Очистка транспортировочных ячеек (стаканов).",
      order: 1,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Визуальный осмотр состояния приводных ремней.",
      order: 2,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Протирка распылителей форсунок (внешняя часть, без разборки и снятия).",
      order: 3,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Проверка распыления форсунок.",
      order: 4,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Очистка защитных фартуков и каплесъемника.",
      order: 5,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Очистка и визуальный осмотр направляющей и подшипников каретки.",
      order: 6,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Осмотр состояния натяжителей цепей печи полимеризации.",
      order: 7,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Протирка входного и выходного конвейера печи и лаковой машины.",
      order: 8,
    },
    {
      maintenance_id: MaintenancesMap.get("2031")!,
      title: "Протирка датчиков тубы.",
      order: 9,
    },

    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка и смазка кареток перемещения форсунок.",
      order: 1
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Промывка форсунок с полной разборкой, контроль распыления сопла.",
      order: 2
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка отстойника под каплесъемником.",
      order: 3
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка фильтра вакуумного насоса.",
      order: 4
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка печи полимеризации (звездочки, люльки, зольник).",
      order: 5
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Проверка трубок подачи лака, при необходимости замена.",
      order: 6
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Протирка спиц аккумулятора, входного и выходного конвейера печи, выходного барабана.",
      order: 7
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка защитных стекол и ограждений.",
      order: 8
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка каплесъемника и замена при необходимости.",
      order: 9
    },
    {
      maintenance_id: MaintenancesMap.get("2041")!,
      title: "Очистка поддона и сеток под вытяжным двигателем.",
      order: 10
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Протирка мандрел на печатной и грунтовальной машине.",
      order: 1,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Визуальный осмотр состояния приводных ремней.",
      order: 2,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Проверка затяжки стопоров на фиксирующих гайках рамы и затяжки рамы.",
      order: 3,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Проверка и по необходимости натяжка цепи.",
      order: 4,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Проверка затяжки стопоров на регулировке формного вала.",
      order: 5,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Замывка офсетного полотна и клише.",
      order: 6,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Проверка прижимных валов, визуальный контроль передачи краски.",
      order: 7,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Подкачка смазки на направляющие рамы принтера.",
      order: 8,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "Очистка внешних загрязнений печатной и грунтовальной машины.",
      order: 9,
    },
    {
      maintenance_id: MaintenancesMap.get("3051")!,
      title: "	Протирка датчиков тубы.",
      order: 10,
    },

    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Долив смазки в систему подачи смазки направляющих рельс рамы принтера.",
      order: 1
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Промывка валов офсетной и грунтовальной машины.",
      order: 2
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Очистка фильтра вакуумного насоса.",
      order: 3
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Очистка печи полимеризации (звездочки, спицы, зольник).",
      order: 4
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Проверка состояния ракельного ножа, очистка.",
      order: 5
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Протирка выходного конвейера печи.",
      order: 6
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Смазка направляющих штоков съемника тубы.",
      order: 7
    },
    {
      maintenance_id: MaintenancesMap.get("3061")!,
      title: "Замена офсетного полотна при необходимости.",
      order: 8
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Протирка мандрел на  укупорочной машине.",
      order: 1
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Визуальный осмотр состояния приводных ремней.",
      order: 2
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Проверка затяжки стопоров.",
      order: 3
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Проверка и по необходимости смазка  и натяжка цепей.",
      order: 4
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Проверка прижимных валов тубы к мандреле.",
      order: 5
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Осмотр пневмосистемы.",
      order: 6
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Промывка форсунок и защитных кожухов форсунки, емкости с герметиком.",
      order: 7
    },
    {
      maintenance_id: MaintenancesMap.get("4071")!,
      title: "Уборка зоны подачи колпачков, зажимов колпачков.",
      order: 8
    },

    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Промывка форсунок с полной разборкой, контроль распыления сопла.",
      order: 1
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Очистка фильтра вакуумного насоса.",
      order: 2
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Очистка конвейера подачи колпачков.",
      order: 3
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Проверка трубок подачи герметика, при необходимости замена.",
      order: 4
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Протирка спиц аккумулятора, входного и выходного барабана.",
      order: 5
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Смазка направляющих сдвига упаковочной машины.",
      order: 6
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Очистка узлов ориентации и подачи колпачков.",
      order: 7
    },
    {
      maintenance_id: MaintenancesMap.get("4081")!,
      title: "Проверка работы толкателей тубы.",
      order: 8
    },
  ]

  await prisma.maintenanceTask.createMany({
    data: maintenanceTasks,
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
