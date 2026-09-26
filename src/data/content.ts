// Мастера, отзывы, акции, вопросы, галерея. Все факты — со страницы сервиса на Zoon (сентябрь 2026)
// и из брифа. Ничего не придумано: если данных нет, блок либо скрыт, либо помечен в комментарии.

export type Master = {
  id: string
  name: string
  fullName: string
  role: string // должность — как в профиле мастера на Zoon
  years: number
  photo: string // портрет для карточки (ключ в images.json)
  portrait: string // крупный портрет для окна мастера
  portraitPosition?: string // куда смотреть при кадрировании портрета
  rating: string
  ratingNote: string
  about: string // «О специалисте» из профиля на Zoon
  skills: string[] // «Специализация» из профиля на Zoon
  facts: string[] // «Опыт и достижения»
  training: string[] // по фото сертификатов в профиле
  review?: { author: string; date: string; text: string }
  works: string[] // фото работ из профиля (ключи images.json)
  zoon: string
  service: string // пункт в форме записи
}

// Всё — из личных профилей мастеров на Zoon (сентябрь 2026): должность, стаж, описание,
// специализация, оценки, фото работ. Обучение — по фото сертификатов в профиле.
export const masters: Master[] = [
  {
    id: "pershin",
    name: "Валерий Першин",
    fullName: "Валерий Валентинович Першин",
    role: "Автожестянщик",
    years: 44,
    photo: "master-pershin",
    portrait: "master-pershin-full",
    portraitPosition: "50% 30%",
    rating: "5,0",
    ratingNote: "2 оценки на Zoon",
    about:
      "Восстановит даже те детали, которые в других автосервисах предложат поменять. Рихтует без шпатлёвки или с минимальным её количеством.",
    skills: [],
    facts: ["Автожестянщик с 1982 года"],
    training: [],
    works: ["work-pershin-1", "work-pershin-2", "work-pershin-3", "work-pershin-4", "work-pershin-5"],
    zoon: "https://zoon.ru/msk/p-remont/valerij_valentinovich_pershin/",
    service: "Кузов и покраска",
  },
  {
    id: "chervyakov",
    name: "Геннадий Червяков",
    fullName: "Геннадий Червяков",
    role: "Мастер-приёмщик кузовного цеха",
    years: 24,
    photo: "master-chervyakov",
    portrait: "master-chervyakov-full",
    portraitPosition: "30% 50%",
    rating: "5,0",
    ratingNote: "2 оценки на Zoon",
    about:
      "Вежливо ответит на ваши вопросы по кузовному ремонту и рассчитает стоимость работ — предварительную по фото и окончательную при осмотре автомобиля в техцентре.",
    skills: ["Кузовной ремонт", "Покраска кузова"],
    facts: [],
    training: [
      "DuPont Refinish Training Center, Refinish Course — июнь 2009",
      "DuPont Refinish Training Center, Color Match — июнь 2009",
      "Практический курс технологии окраски материалами Lechler — сентябрь 2010",
      "DuPont Refinish Training Center, Local Repainting Course — май 2011",
    ],
    works: ["work-chervyakov-1", "work-chervyakov-2", "work-chervyakov-3", "work-chervyakov-4", "work-chervyakov-5"],
    zoon: "https://zoon.ru/msk/p-remont/gennadij_chervyakov/",
    service: "Кузов и покраска",
  },
  {
    id: "dubravin",
    name: "Александр Дубравин",
    fullName: "Александр Дубравин",
    role: "Автомаляр",
    years: 16,
    photo: "master-dubravin",
    portrait: "master-dubravin-full",
    portraitPosition: "68% 50%",
    rating: "5,0",
    ratingNote: "2 оценки на Zoon",
    about:
      "Благодаря собственному подбору краски попадаем в цвет и даём гарантию 1 год на работы. Качество покраски дилерское, а цены приемлемые. Материалы и расходники флагманские: DuPont, Glasurit, Standox, Carsystem, 3M.",
    skills: ["Подбор автокраски", "Покраска кузова", "Покраска бампера", "Покраска капота", "Покраска дверей", "Покраска багажника"],
    facts: [],
    training: [],
    works: ["work-dubravin-1", "work-dubravin-2", "work-dubravin-3", "work-dubravin-4", "work-dubravin-5"],
    zoon: "https://zoon.ru/msk/p-remont/aleksandr_dubravin/",
    service: "Кузов и покраска",
  },
  {
    id: "umnov",
    name: "Алексей Умнов",
    fullName: "Алексей Умнов",
    role: "Автомаляр, автослесарь",
    years: 14,
    photo: "master-umnov",
    portrait: "master-umnov-full",
    portraitPosition: "74% 30%",
    rating: "5,0",
    ratingNote: "2 оценки на Zoon",
    about:
      "Благодаря собственному подбору краски попадаем в цвет и даём гарантию 1 год на работы. Качество покраски дилерское, а цены приемлемые. Материалы и расходники флагманские: DuPont, Glasurit, Standox, Carsystem, 3M.",
    skills: ["Оклейка полиуретаном", "Оклейка авто", "Покраска авто", "Покраска бампера", "Покраска капота", "Покраска краскопультом"],
    facts: [],
    training: [],
    works: ["work-umnov-1", "work-umnov-2", "work-umnov-3", "work-umnov-4", "work-umnov-5", "work-umnov-6"],
    zoon: "https://zoon.ru/msk/p-remont/aleksej_umnov/",
    service: "Кузов и покраска",
  },
  {
    id: "aralushkin",
    name: "Антон Аралушкин",
    fullName: "Антон Аралушкин",
    role: "Мастер-приёмщик слесарного цеха",
    years: 14,
    photo: "master-aralushkin",
    portrait: "master-aralushkin-full",
    portraitPosition: "50% 35%",
    rating: "5,0",
    ratingNote: "1 отзыв и 3 оценки на Zoon",
    about:
      "Рассчитает стоимость слесарного ремонта, подберёт запчасти по VIN и предложит 2–3 варианта по цене. В ходе диагностики и ремонта держит в курсе и присылает фото- и видеоотчёт в WhatsApp.",
    skills: [],
    facts: ["Работает в компании 10 лет"],
    training: [],
    review: {
      author: "Игорь П.",
      date: "23 августа 2022",
      text: "Сервис и профессионализм — ключевые слова этого автопредприятия.",
    },
    works: ["work-aralushkin-1", "work-aralushkin-2", "work-aralushkin-3", "work-aralushkin-4", "work-aralushkin-5"],
    zoon: "https://zoon.ru/msk/p-other/anton_aralushkin/",
    service: "Диагностика",
  },
  {
    id: "zhabotinsky",
    name: "Антон Жаботинский",
    fullName: "Антон Жаботинский",
    role: "Автоарматурщик",
    years: 11,
    photo: "master-zhabotinsky",
    portrait: "master-zhabotinsky-full",
    portraitPosition: "40% 50%",
    rating: "5,0",
    ratingNote: "2 оценки на Zoon",
    about: "Бережно разберёт автомобиль для подготовки к работам и так же аккуратно соберёт обратно.",
    skills: [],
    facts: [],
    training: [],
    works: ["work-zhabotinsky-1", "work-zhabotinsky-2"],
    zoon: "https://zoon.ru/msk/p-remont/anton_zhabotinskij/",
    service: "Кузов и покраска",
  },
]

export const totalExperience = masters.reduce((sum, m) => sum + m.years, 0)

export type Review = {
  author: string
  date: string
  topic: string
  text: string
}

// Дословные фрагменты подтверждённых отзывов с Zoon. Пропуски в тексте отмечены «…».
export const reviews: Review[] = [
  {
    author: "Дмитрий",
    date: "20 августа 2026",
    topic: "Обслуживание",
    text: "Я сотрудничаю с этим автосервисом уже около 10-ти лет, за всё это время нареканий не было ни разу. … Я просто оставляю машину и уезжаю, на следующий день приезжаю и забираю — всё готово.",
  },
  {
    author: "Лариса",
    date: "20 августа 2026",
    topic: "Диагностика и ремонт",
    text: "Особенно порадовало, что изначально озвученная цена в ходе работ не изменилась — всё, что было запланировано, то и сделали.",
  },
  {
    author: "Ирина",
    date: "7 мая 2026",
    topic: "Амортизаторы",
    text: "Мне заменили передние и задние амортизаторы за 4—5 часов, в тот же день всё было готово. … Мастер Андрей, которого я знаю почти 10 лет, как всегда сделал всё отлично, он профессионал своего дела.",
  },
  {
    author: "Константин Григорьев",
    date: "25 февраля 2026",
    topic: "Тормозная система",
    text: "…Сделали всё очень хорошо, не навязывали лишнего. Например, вместо замены тормозного цилиндра целиком использовали ремнабор с новыми резинками, ремонт обошёлся дешевле.",
  },
  {
    author: "Филипп",
    date: "13 августа 2026",
    topic: "ТО и ходовая",
    text: "Я обслуживаю здесь 2 машины уже около 5 лет. … Мастера работают очень оперативно: несмотря на большой объем работы, всё успели сделать буквально за полдня.",
  },
  {
    author: "Сергей",
    date: "12 февраля 2026",
    topic: "ТО",
    text: "Прежде всего мне нравятся лояльные цены и то, как быстро выполняют работы. … В зоне ожидания комфортно — там можно выпить кофе и посмотреть телевизор.",
  },
  {
    author: "Егор",
    date: "11 февраля 2026",
    topic: "Замена аккумулятора",
    text: "Цены меня полностью устраивают: они рыночные, без попыток «навариться» на клиентах. … Здесь же всё прозрачно, без скрытых платежей.",
  },
  {
    author: "Владислав",
    date: "16 марта 2026",
    topic: "ТО и ABS",
    text: "Приехал на ТО, мне выявили проблему с ABS-системой, которую оперативно устранили: менеджер сам съездил, купил нужную деталь и заменил её, благодаря чему я смог отправиться в запланированную поездку.",
  },
]

export type Offer = {
  title: string
  text: string
  price?: string
  until: string // ISO-дата, включительно. После неё карточка скрывается сама.
  photo: string
  service: string // пункт в форме записи
}

// Акции со страницы Zoon. Прошедшие по дате скрываются автоматически.
export const offers: Offer[] = [
  {
    title: "Диагностика в подарок к шиномонтажу",
    text: "Приезжайте на сезонную замену колёс — комплексную диагностику автомобиля сделаем бесплатно.",
    until: "2026-12-31",
    photo: "balancer",
    service: "Шиномонтаж",
  },
  {
    title: "Компьютерная диагностика",
    text: "Проверка электронных систем автомобиля по специальной цене. После диагностики — рекомендации мастера по ремонту.",
    price: "2 000 ₽",
    until: "2027-12-31",
    photo: "diagnostics",
    service: "Диагностика",
  },
  {
    title: "5% на первый ремонт",
    text: "При первом визите — скидка 5% на замену и ремонт агрегатов, кузовной ремонт и автоэлектрику.",
    until: "2026-12-31",
    photo: "radiator",
    service: "Другое",
  },
  {
    title: "Ремонт вмятин без покраски",
    text: "Вмятины убираем без перекраса — заводское покрытие сохраняется.",
    price: "от 2 500 ₽",
    until: "2026-10-02",
    photo: "paint-prep",
    service: "Кузов и покраска",
  },
]

export function activeOffers(now: Date) {
  const today = now.toISOString().slice(0, 10)
  return offers.filter((o) => o.until >= today)
}

export type Faq = { q: string; a: string }

export const faq: Faq[] = [
  {
    q: "Можно приехать без записи?",
    a: "Можно, но лучше позвонить заранее или оставить заявку на сайте: так мы сразу подберём время, и машину возьмут в работу без ожидания. Бывает, что свободное окно есть уже в день звонка.",
  },
  {
    q: "Вы работаете с моей маркой?",
    a: "Скорее всего, да: мы мультибрендовый сервис и обслуживаем больше 40 марок — от ВАЗ до BMW и Mercedes-Benz, включая корейские и китайские автомобили, микроавтобусы и коммерческий транспорт.",
  },
  {
    q: "Сколько ждать диагностику и сколько она стоит?",
    a: "Компьютерная диагностика стоит 2 000 ₽, комплексная — 4 500 ₽. Если ремонт делаете у нас, диагностика бесплатна. Время зависит от вида проверки — мастер-приёмщик назовёт его при записи.",
  },
  {
    q: "Сохранится ли дилерская гарантия?",
    a: "Да. У сервиса есть сертификаты Росстандарта на техобслуживание и кузовной ремонт, поэтому гарантия дилера при обслуживании у нас сохраняется.",
  },
  {
    q: "Можно привезти свои запчасти?",
    a: "Да, многие клиенты так и делают. Если удобнее, мастера сами подберут и закажут детали и расходники.",
  },
  {
    q: "Где подождать, пока ремонтируют машину?",
    a: "В зоне ожидания есть диваны, телевизор, кофе и вода. Оттуда видно, как идёт работа над вашим автомобилем.",
  },
  {
    q: "Как оплатить и какие документы я получу?",
    a: "Оплатить можно картой или наличными. После работ выдаём заказ-наряд и чек со списком всего, что сделано.",
  },
]

export type GalleryItem = {
  photo: string
  title: string
  tag: string
  span?: "wide" | "tall" | "big"
}

export const gallery: GalleryItem[] = [
  { photo: "workshop-lifts", title: "Слесарный цех", tag: "Подъёмники", span: "big" },
  { photo: "paint-booth", title: "Покрасочная камера", tag: "Кузов", span: "tall" },
  { photo: "engine-work", title: "Ремонт двигателя", tag: "Двигатель" },
  { photo: "interior-covers", title: "Салон в защитных чехлах", tag: "Аккуратность" },
  { photo: "hall", title: "Кузовной цех", tag: "Кузов", span: "wide" },
  { photo: "bodyshop-gate", title: "Въезд в кузовной цех", tag: "Территория", span: "wide" },
  { photo: "diagnostics", title: "Компьютерная диагностика", tag: "Диагностика" },
  { photo: "balancer", title: "Балансировка колёс", tag: "Шиномонтаж" },
  { photo: "lift-sandero", title: "Ходовая на подъёмнике", tag: "Ходовая" },
  { photo: "radiator", title: "Замена радиатора", tag: "Охлаждение" },
]

// Кузовной ремонт по шагам — реальные фото из цеха.
export const bodyProcess = [
  { photo: "body-damage", step: "01", title: "Дефектовка", text: "Разбираем повреждённый узел и составляем смету до начала работ." },
  { photo: "sill-repair", step: "02", title: "Рихтовка и сварка", text: "Восстанавливаем геометрию, пороги и силовые элементы кузова." },
  { photo: "paint-prep", step: "03", title: "Подготовка", text: "Шпаклёвка, грунт и маскировка всего, что не красим." },
  { photo: "paint-booth", step: "04", title: "Покраска в камере", text: "Окрашиваем в покрасочной камере и возвращаем машину клиенту." },
]

// Пары «до/после» для слайдера. Среди фото сервиса на Zoon пар одного автомобиля нет,
// поэтому массив пуст и слайдер не показывается. Добавьте пары — блок появится сам:
// { before: "ключ-фото-до", after: "ключ-фото-после", title: "Замена крыла, Kia Rio" }
export const beforeAfter: { before: string; after: string; title: string }[] = []
