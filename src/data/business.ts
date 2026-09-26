// Единый источник фактов о сервисе. Файл без импортов: его читает и vite.config.ts,
// чтобы собрать JSON-LD для поисковиков из тех же данных, что видит посетитель.

export const business = {
  name: "Богема Механикс",
  fullName: "Автосервис «Богема Механикс»",
  // Подтверждено страницей сервиса на Zoon («Автосервис открыт с 1996 года»).
  since: 1996,
  clients: "7000+",
  brandsCount: "40+",
  // Рейтинг на Zoon: 4,9 по 3177 оценкам, 648 отзывов (сентябрь 2026).
  rating: "4,9",
  ratingValue: 4.9,
  ratingCount: 3177,
  reviewsCount: 648,

  phone: {
    display: "8 (926) 416-84-22",
    href: "tel:+79264168422",
    e164: "+79264168422",
  },
  whatsapp: "https://wa.me/79264168422",

  address: {
    street: "ул. Каховка, 30",
    city: "Москва",
    postalCode: "117246",
    district: "ЮЗАО, район Черёмушки",
    note: "закрытая охраняемая территория, въезд через шлагбаум",
    full: "Москва, ул. Каховка, 30",
  },
  metro: [
    { name: "Зюзино", distance: "0,8 км" },
    { name: "Новые Черёмушки", distance: "20 минут пешком" },
  ],
  geo: { lat: 55.6611, lon: 37.562333 },
  // Со страницы Zoon: как заехать на территорию. На Zoon ориентир — АЗС «Лукойл»,
  // на Яндекс Картах на этом месте сейчас Teboil, поэтому бренд АЗС не называем.
  directions:
    "С улицы Каховка поверните направо сразу после АЗС и подъезжайте к шлагбауму. Охране скажите «Богема Механикс», подъезжайте к посту № 1 и заходите на приёмку.",

  hours: {
    open: 9 * 60, // минуты от полуночи по Москве
    close: 21 * 60,
    label: "Ежедневно 9:00–21:00",
    short: "9:00–21:00",
  },
  carWashHours: [
    { days: "Пн–Пт", time: "8:00–22:00" },
    { days: "Сб–Вс", time: "9:00–21:00" },
  ],

  links: {
    zoon: "https://zoon.ru/msk/autoservice/avtoservis_bogema_mehaniks_na_ulitse_kahovka/",
    zoonReviews: "https://zoon.ru/msk/autoservice/avtoservis_bogema_mehaniks_na_ulitse_kahovka/reviews/",
    route: "https://yandex.ru/maps/?rtext=~55.661100%2C37.562333&rtt=auto",
    yandexMap: "https://yandex.ru/maps/?pt=37.562333,55.661100&z=17&l=map",
  },

  brands: [
    "ВАЗ",
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Toyota",
    "Volkswagen",
    "Mazda",
    "Hyundai",
    "Kia",
    "Chevrolet",
    "Ford",
  ],
} as const

export const nav = [
  { id: "about", label: "О сервисе" },
  { id: "services", label: "Услуги и цены" },
  { id: "masters", label: "Мастера" },
  { id: "works", label: "Работы" },
  { id: "reviews", label: "Отзывы" },
  { id: "offers", label: "Акции" },
  { id: "faq", label: "Вопросы" },
  { id: "contacts", label: "Контакты" },
] as const
