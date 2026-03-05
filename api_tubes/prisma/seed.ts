import { Specification } from "./../generated/prisma/index.d";
import { PrismaClient } from "../generated/prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

async function main() {
  //conveyors
  const conveyor1 = await prisma.conveyor.upsert({
    where: { name: "201" },
    update: {},
    create: {
      name: "201",
    },
  });
  console.log(conveyor1);

  const conveyor2 = await prisma.conveyor.upsert({
    where: { name: "202" },
    update: {},
    create: {
      name: "202",
    },
  });
  console.log(conveyor2);

  const rank1 = await prisma.rank.create({
    data: {
      val: 1,
      description: "1-й разряд",
    },
  });
  const rank2 = await prisma.rank.create({
    data: {
      val: 2,
      description: "2-й разряд",
    },
  });
  const rank3 = await prisma.rank.create({
    data: {
      val: 3,
      description: "3-й разряд",
    },
  });
  const rank4 = await prisma.rank.create({
    data: {
      val: 4,
      description: "4-й разряд",
    },
  });
  const rank5 = await prisma.rank.create({
    data: {
      val: 5,
      description: "5-й разряд",
    },
  });

  // employees

  const employees: { name: string; barcode: string; rank_id: number }[] = [
    {
      name: "Скрипковский М.Ю.",
      barcode: "2000001416426",
      rank_id: rank1.id,
    },
    { name: "Нестеров А.В.", barcode: "2000875313050", rank_id: rank5.id },
    { name: "Михайлюта В.В.", barcode: "2000875313067", rank_id: rank5.id },
    { name: "Кулагин М.В.", barcode: "2000875313074", rank_id: rank5.id },
    { name: "Карташов В.С.", barcode: "2000875313081", rank_id: rank5.id },
    { name: "Антипин Д.Б.", barcode: "2000874419142", rank_id: rank5.id },
    { name: "Варфоломеев С.Н.", barcode: "2000875313128", rank_id: rank3.id },
    { name: "Кандыба А.А.", barcode: "2000042277086", rank_id: rank3.id },
    { name: "Клюев С.Э.", barcode: "2000875313135", rank_id: rank4.id },
    { name: "Кузнецов М.В.", barcode: "2000039532150", rank_id: rank5.id },
    { name: "Кулейкин А.А.", barcode: "2000875313142", rank_id: rank4.id },
    { name: "Михалковский А.Д.", barcode: "2000875313159", rank_id: rank3.id },
    { name: "Савьевский Д.А.", barcode: "2000875313166", rank_id: rank4.id },
    { name: "Тихонов А.А.", barcode: "2000875313173", rank_id: rank5.id },
    { name: "Колосков В.В.", barcode: "2000875313098", rank_id: rank5.id },
    { name: "Вакула А.М.", barcode: "2000872540411", rank_id: rank3.id },
    { name: "Залевский А.Ю.", barcode: "2000875313180", rank_id: rank4.id },
    { name: "Ищук О.В.", barcode: "2000875313197", rank_id: rank4.id },
    { name: "Куцеволов С.Ю.", barcode: "2000875313203", rank_id: rank2.id },
    { name: "Лотик Р.В.", barcode: "2000875313210", rank_id: rank3.id },
    { name: "Мачулко С.В.", barcode: "2000874419197", rank_id: rank5.id },
    { name: "Островский В.А.", barcode: "2000875313227", rank_id: rank5.id },
    { name: "Романов В.М.", barcode: "2000042301408", rank_id: rank4.id },
    { name: "Румянцев В.В.", barcode: "2000875313234", rank_id: rank4.id },
    { name: "Тырышкин А.А.", barcode: "2000875313241", rank_id: rank3.id },
    { name: "Цветков Д.В.", barcode: "2000875313104", rank_id: rank5.id },
    { name: "Абатуров А.Н.", barcode: "2000874638932", rank_id: rank2.id },
    { name: "Борисов К.С.", barcode: "2000039532136", rank_id: rank3.id },
    { name: "Горбунов Р.Ю.", barcode: "2000875313258", rank_id: rank5.id },
    { name: "Миханов А.Ю.", barcode: "2000875313265", rank_id: rank3.id },
    { name: "Новожилов М.А.", barcode: "2000040120155", rank_id: rank3.id },
    { name: "Петров М.В.", barcode: "2000875313272", rank_id: rank2.id },
    { name: "Пялисов А.Д.", barcode: "2000872911983", rank_id: rank2.id },
    { name: "Солтанов Р.Ш.", barcode: "2000875313289", rank_id: rank5.id },
    { name: "Тямин В.В.", barcode: "2000875313296", rank_id: rank5.id },
    { name: "Халилов К.Н.", barcode: "2000040741916", rank_id: rank4.id },
    { name: "Слащев Д.А.", barcode: "2000875313111", rank_id: rank5.id },
    { name: "Абакшинов Н.Б.", barcode: "2000875313302", rank_id: rank4.id },
    { name: "Белослудцев Д.М.", barcode: "2000875313319", rank_id: rank2.id },
    { name: "Дудин И.В.", barcode: "2000875313326", rank_id: rank5.id },
    { name: "Дмитриев А.Н.", barcode: "2000875313333", rank_id: rank1.id },
    { name: "Коваленко Д.С.", barcode: "2000875313340", rank_id: rank2.id },
    { name: "Король С.М.", barcode: "2000875313357", rank_id: rank3.id },
    { name: "Максимов Л.Л.", barcode: "2000875313364", rank_id: rank2.id },
    { name: "Панарин С.В.", barcode: "2000875313371", rank_id: rank3.id },
    { name: "Скляренко Э.Г.", barcode: "2000875313388", rank_id: rank4.id },
    { name: "Сметанин А.А.", barcode: "2000875313395", rank_id: rank2.id },
  ];

  // // raw materials
  // const materials: { code: string; name: string; post_number: number }[] = [
  //   {
  //     code: "063754",
  //     name: "Бушон РК 214F, белый (LOVE, CELEBRITY)",
  //     post_number: 4,
  //   },
  //   { code: "069579", name: "Бушон РК 214F, черный (ESSEX)", post_number: 4 },
  //   {
  //     code: "070321",
  //     name: "Бушон РК 214F цвет 9-108, серый (LOOKS)",
  //     post_number: 4,
  //   },
  //   {
  //     code: "063755",
  //     name: "Бушон РК делюкс-28, черный (DL, SILVER)",
  //     post_number: 4,
  //   },
  //   {
  //     code: "063756",
  //     name: "Бушон РК делюкс-35, черный (PRINCE)",
  //     post_number: 4,
  //   },
  //   {
  //     code: "068813",
  //     name: "Рондоль D28*L129 АЛЮМАР (27,7*3,4 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "068866",
  //     name: "Рондоль D28*L129 ИНКОМПРО (27,7*3,8 мм) ориентированная",
  //     post_number: 1,
  //   },
  //   {
  //     code: "069527",
  //     name: "Рондоль D28*L129 NEUMAN (27,7*3,8 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "069528",
  //     name: "Рондоль D28*L149 NEUMAN (27,7*4,2 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "068811",
  //     name: "Рондоль D35*L160 АЛЮМАР (34,75*3,6 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "068868",
  //     name: "Рондоль D35*L160 ИНКОМПРО(34,7*3,8 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "069529",
  //     name: "Рондоль D35*L160 NEUMAN (34,7*4,2 мм)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "068972",
  //     name: "Внутренний лак бежевый VPL NOVACAN T-IL300",
  //     post_number: 2,
  //   },
  //   {
  //     code: "069530",
  //     name: "Внутренний лак бежевый METLAC 716401",
  //     post_number: 2,
  //   },
  //   {
  //     code: "069531",
  //     name: "Внутренний лак золотистый METALL DECOR SJ-3701785",
  //     post_number: 2,
  //   },
  //   {
  //     code: "068817",
  //     name: "Растворитель для внутреннего лака  VPL NOVACAN V200",
  //     post_number: 2,
  //   },
  //   {
  //     code: "069532",
  //     name: "Растворитель для внутреннего лака METLAC 766015",
  //     post_number: 2,
  //   },
  //   {
  //     code: "069533",
  //     name: "Растворитель для внутреннего лака METALL DECOR RS-1",
  //     post_number: 2,
  //   },
  //   {
  //     code: "068815",
  //     name: "Внешний белый грунт VPL NOVACAN T-W 100/1",
  //     post_number: 3,
  //   },
  //   {
  //     code: "069534",
  //     name: "Внешний белый грунт METALL DECOR CC-4215",
  //     post_number: 3,
  //   },
  //   {
  //     code: "068816",
  //     name: "Внешний прозрачный грунт VPL NOVACAN C-EOE 160",
  //     post_number: 3,
  //   },
  //   {
  //     code: "069535",
  //     name: "Внешний прозрачный грунт METALL DECOR CC-4010",
  //     post_number: 3,
  //   },
  //   {
  //     code: "069537",
  //     name: "Растворитель для внешнего грунта METALL DECOR BS-277",
  //     post_number: 3,
  //   },
  //   {
  //     code: "068971",
  //     name: "Латексная паста-герметик VPL NOVACAN T-D 125",
  //     post_number: 4,
  //   },
  //   {
  //     code: "071056",
  //     name: "Латексная паста-герметик ЛПУ-3М ВВ",
  //     post_number: 4,
  //   },
  //   { code: "071076", name: "Дисперсия акриловая Акрэмос 306", post_number: 4 },
  //   { code: "067792", name: "Cтеарат цинка", post_number: 1 },
  //   {
  //     code: "069538",
  //     name: "Арахинат цинка (ZINKARACHINAT SW)",
  //     post_number: 1,
  //   },
  //   {
  //     code: "068818",
  //     name: "Краска Белая TV-900 Opaque white	",
  //     post_number: 3,
  //   },
  //   {
  //     code: "068822",
  //     name: "Краска Голубая TV-Pantone 5117 Process Cyan C",
  //     post_number: 3,
  //   },
  //   { code: "071055", name: "Краска Золотая TV-Pantone 876C", post_number: 3 },
  //   {
  //     code: "069336",
  //     name: "Краска Оливково-серая TV-Pantone 8003C	",
  //     post_number: 3,
  //   },
  //   { code: "071240", name: "Краска TV-3110 Orange 021C", post_number: 3 },
  //   {
  //     code: "068819",
  //     name: "Краска Серая TV-Pantone Cool Gray 7C",
  //     post_number: 3,
  //   },
  //   { code: "071241", name: "Краска TV-Pantone 10394C", post_number: 3 },
  //   { code: "071054", name: "Краска Синяя TV-Pantone 2387C", post_number: 3 },
  //   { code: "069193", name: "Краска Синия TV-Pantone 2758C", post_number: 3 },
  //   { code: "068823", name: "Краска Синяя TV-Pantone 302C", post_number: 3 },
  //   { code: "068820", name: "Краска Синяя TV-Pantone 7684C", post_number: 3 },
  //   {
  //     code: "070177",
  //     name: "Краска Тёмно-серая TV-Pantone 8604C",
  //     post_number: 3,
  //   },
  //   { code: "068821", name: "Краска Черная TV-9075 Black C", post_number: 3 },
  //   {
  //     code: "056448",
  //     name: "Пигмент Colorstream T10-02 Arctic Fire",
  //     post_number: 3,
  //   },
  // ];

  for (let index = 0; index < employees.length; index++) {
    await prisma.employee.create({
      data: employees[index],
    });
  }

  // for (let index = 0; index < materials.length; index++) {
  //   await prisma.material.create({
  //     data: materials[index],
  //   });
  // }




  const ext_operations: string[] = [
    "Замена пуансона",
    "Настройка вылета носика",
    "Замена матрицы и внутреннего формирователя",
    "Позиционирование матрицы",
    "Настройка датчика наличия тубы",
    "Настройка толкателя туб",
    "Настройка длины отреза",
    "Настройка высоты резца",
    "Настройка накатных роликов",
    "Замена полировочной щетки",
    "Настройка входного и выходного барабана",
    "Синхронизация печей",
    "Натяжка цепей",
    "ТО №1",
    "ТО №2",
    "ТО №3",
    "Прочее",
    "Простой",

  ];

  for (let i = 0; i < ext_operations.length; i++) {
    await prisma.extrusionOperation.create({
      data: {
        value: "1" + String(i + 1).padStart(2, "0") + "1",
        description: ext_operations[i],
        min_rank: 1,
      },
    });
  }

  const vrn_operations: string[] = [
    "Настройка вдува",
    "Настройка впрыска",
    "Настройка положения форсунок",
    "Настройка давления впрыска",
    "Настройка входного и выходного барабана",
    "Синхронизация печей",
    "Натяжка цепей",
    "Замена лака и прокачка системы",
    "ТО №1",
    "ТО №2",
    "ТО №3",
    "Прочее",
    "Простой",
  ];

  for (let i = 0; i < vrn_operations.length; i++) {
    await prisma.varnishOperation.create({
      data: {
        value: "2" + String(i + 1).padStart(2, "0") + "1",
        description: vrn_operations[i],
        min_rank: 1,
      },
    });
  }

  const offset_operations: string[] = [
    "Настройка положения валов",
    "Регулировка высоты поддона с грунтом",
    "Замена клише",
    "Настройка количества отпечатков",
    "Настройка положения анилоксового вала",
    "Настройка положения формного вала",
    "Настройка параллельности станины принтера",
    "Настройка входного и выходного барабана",
    "Синхронизация печей",
    "Натяжка цепей",
    "Регулировка толщины слоя краски",
    "Замена офсетного полотна",
    "ТО №1",
    "ТО №2",
    "ТО №3",
    "Прочее",
    "Простой",
  ];

  for (let i = 0; i < offset_operations.length; i++) {
    await prisma.offsetOperation.create({
      data: {
        value: "3" + String(i + 1).padStart(2, "0") + "1",
        description: offset_operations[i],
        min_rank: 1,
      },
    });
  }
  const sealant_operations: string[] = [
    "Настройка высоты колпачка",
    "Настройка затяжки колпачка",
    "Разборка форсунки",
    "Сборка форсунки",
    "Настройка распыления герметика",
    "Замена герметика и прокачка системы",
    "Настройка толкателя тубы",
    "Настройка входного и выходного барабана",
    "Натяжка цепей",
    "ТО №1",
    "ТО №2",
    "ТО №3",
    "Прочее",
    "Простой",
  ];

  for (let i = 0; i < sealant_operations.length; i++) {
    await prisma.sealantOperation.create({
      data: {
        value: "4" + String(i + 1).padStart(2, "0") + "1",
        description: sealant_operations[i],
        min_rank: 1,
      },
    });
  }

}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
