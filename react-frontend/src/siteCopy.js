export const LANGUAGE_OPTIONS = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "kk", label: "KK" },
];

export const text = (en, ru, kk) => ({ en, ru, kk });

export function pick(value, language) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "en" in value &&
    "ru" in value
  ) {
    return value[language] || value["en"];
  }

  return value;
}

export const animeAtlasCopy = {
  en: {
    nav: {
      locations: "Locations",
      byAnime: "By Anime",
      cosplay: "Cosplay",
      places: "Places to Go",
    },
    hero: {
      tag: "Real Japan · Anime Pilgrimage · 2025 Guide",
      desc: "Every frame was shot somewhere real. We found the places - from misty Ghibli forests to the neon streets of JJK. Plus: where to cosplay in 2025-2026.",
      explore: "Explore Locations",
      conventions: "Conventions",
      animeStat: "Anime",
      locationStat: "Locations",
      eventStat: "Events",
    },
    irl: {
      kicker: "Real Pilgrimage Spots",
      titleTop: "ANIME FRAMES",
      titleBottom: "MEET REALITY",
      sub: "Iconic locations where your favorite scenes were born - side by side with the real world.",
    },
    fans: {
      kicker: "Pilgrimage by Anime",
      title: "CHOOSE YOUR ANIME",
      sub: "Select your favorite series and get the ultimate real-world map.",
    },
    cosplay: {
      kicker: "Cosplay · Conventions · 2025-2026",
      titleTop: "WHERE & WHEN",
      titleBottom: "TO COSPLAY",
      intro: "Cosplay culture in Japan comes alive at major conventions like Comic Market and dedicated festivals across Tokyo and beyond. Tokyo Big Sight in Odaiba is still the most iconic venue, where huge crowds gather to celebrate anime, manga, and creativity.",
      dates: "Dates for the 2025-2026 season",
    },
    cta: {
      label: "Anime tourism · Tokyo",
      titleTop: "PLACES FOR",
      titleBottom: "FANS",
      sub: "8 must-visit spots in Japan - from Akihabara to Tamashii Nations. A full guide to otaku locations.",
      button: "Open Guide",
    },
    footer: {
      sub: "The ultimate pilgrimage guide · 2025-2026",
      note: "made for fans worldwide",
    },
    labels: {
      animeFrame: "Anime Frame",
      realLife: "Real Life",
    },
  },
  ru: {
    nav: {
      locations: "Локации",
      byAnime: "По аниме",
      cosplay: "Косплей",
      places: "Места для фанатов",
    },
    hero: {
      tag: "Настоящая Япония · Аниме-паломничество · Гид 2025",
      desc: "Каждый кадр аниме снят с реального места. Мы собрали локации - от туманных лесов Ghibli до неоновых улиц JJK. Плюс: где косплеить в 2025-2026.",
      explore: "Смотреть локации",
      conventions: "Конвенты",
      animeStat: "Аниме",
      locationStat: "Локации",
      eventStat: "События",
    },
    irl: {
      kicker: "Реальные места паломничества",
      titleTop: "КАДРЫ ИЗ АНИМЕ",
      titleBottom: "ВСТРЕЧАЮТСЯ С РЕАЛЬНОСТЬЮ",
      sub: "Знаковые места, где родились любимые сцены - рядом с их реальными прототипами.",
    },
    fans: {
      kicker: "Паломничество по аниме",
      title: "ВЫБЕРИТЕ СВОЕ АНИМЕ",
      sub: "Выберите любимый тайтл и получите карту реальных локаций.",
    },
    cosplay: {
      kicker: "Косплей · Конвенты · 2025-2026",
      titleTop: "ГДЕ И КОГДА",
      titleBottom: "КОСПЛЕИТЬ",
      intro: "Косплей-культура в Японии особенно ярко раскрывается на крупных событиях вроде Comic Market и тематических фестивалях по всему Токио. Самая культовая площадка - Tokyo Big Sight в Одайбе, где огромные толпы собираются ради аниме, манги и творчества.",
      dates: "Даты сезона 2025-2026",
    },
    cta: {
      label: "Аниме-туризм · Токио",
      titleTop: "МЕСТА ДЛЯ",
      titleBottom: "ФАНАТОВ",
      sub: "8 обязательных точек в Японии - от Акихабары до Tamashii Nations. Полный гид по отаку-локациям.",
      button: "Открыть гид",
    },
    footer: {
      sub: "Полный гид по аниме-паломничеству · 2025-2026",
      note: "сделано для фанатов по всему миру",
    },
    labels: {
      animeFrame: "Кадр из аниме",
      realLife: "Реальное место",
    },
  },
  kk: {
    nav: {
      locations: "Локациялар",
      byAnime: "Аниме бойынша",
      cosplay: "Косплей",
      places: "Жанкүйерлер орындары",
    },
    hero: {
      tag: "Нағыз Жапония · Аниме-қажылық · 2025 Гид",
      desc: "Әрбір кадр нақты орында түсірілген. Біз оларды таптық - Ghibli ормандарынан JJK неон көшелеріне дейін. Сонымен қатар: 2025-2026 жылдары қайда косплей жасау керек.",
      explore: "Локацияларды көру",
      conventions: "Конвенттер",
      animeStat: "Аниме",
      locationStat: "Локациялар",
      eventStat: "Оқиғалар",
    },
    irl: {
      kicker: "Нағыз қажылық орындары",
      titleTop: "АНИМЕ КАДРЛАРЫ",
      titleBottom: "ШЫНАЙЫЛЫҚПЕН КЕЗДЕСЕДІ",
      sub: "Сүйікті көріністеріңіз пайда болған тарихи орындар - олардың нақты прототиптерімен қатар.",
    },
    fans: {
      kicker: "Аниме бойынша қажылық",
      title: "ӨЗ АНИМЕҢІЗДІ ТАҢДАҢЫЗ",
      sub: "Сүйікті тайтлыңызды таңдап, нақты локациялардың картасын алыңыз.",
    },
    cosplay: {
      kicker: "Косплей · Конвенттер · 2025-2026",
      titleTop: "ҚАЙДА ЖӘНЕ ҚАШАН",
      titleBottom: "КОСПЛЕЙ ЖАСАУ КЕРЕК",
      intro: "Жапониядағы косплей мәдениеті Comic Market сияқты ірі оқиғаларда және Токиодағы арнайы фестивальдерде өте керемет көрінеді. Одайбадағы Tokyo Big Sight ең танымал алаң болып қала береді.",
      dates: "2025-2026 маусымның күндері",
    },
    cta: {
      label: "Аниме-туризм · Токио",
      titleTop: "ЖАНКҮЙЕРЛЕРГЕ",
      titleBottom: "АРНАЛҒАН ОРЫНДАР",
      sub: "Жапонияда міндетті түрде бару керек 8 нүкте. Отаку-локацияларға толық гид.",
      button: "Гидті ашу",
    },
    footer: {
      sub: "Аниме-қажылық бойынша толық гид · 2025-2026",
      note: "бүкіл әлемдегі жанкүйерлер үшін",
    },
    labels: {
      animeFrame: "Аниме кадры",
      realLife: "Нақты орын",
    },
  }
};

export const animeAtlasTips = [
  {
    icon: "fa-bullseye",
    title: text("Pick your character wisely", "Выбирайте персонажа с умом", "Кейіпкерді ақылмен таңдаңыз"),
    text: text(
      "Start with iconic but comfortable cosplays - Tanjiro or Naruto are always recognized.",
      "Начинайте с узнаваемых и удобных образов - Тандзиро или Наруто всегда легко считываются.",
      "Танымал әрі ыңғайлы образдардан бастаңыз - Танджиро немесе Наруто әрдайым танылады."
    ),
  },
  {
    icon: "fa-scissors",
    title: text("Order 3 months ahead", "Заказывайте за 3 месяца", "3 ай бұрын тапсырыс беріңіз"),
    text: text(
      "Quality costumes take 4-8 weeks; budget $100-250 for good craftsmanship.",
      "На хороший костюм уходит 4-8 недель; закладывайте бюджет около 100-250 долларов.",
      "Жақсы костюмге 4-8 апта кетеді; бюджетті шамамен 100-250 доллар етіп жоспарлаңыз."
    ),
  },
  {
    icon: "fa-camera",
    title: text("Golden hour photography", "Съемка в золотой час", "Алтын сағаттағы түсірілім"),
    text: text(
      "Shoot early morning or in dedicated photo zones. Pre-book with con photographers.",
      "Лучше снимать утром или в специальных фотозонах. Фотографов на конвенте лучше бронировать заранее.",
      "Таңертең немесе арнайы фотоаймақтарда түсірген дұрыс. Фотографтарды алдын ала брондаңыз."
    ),
  },
  {
    icon: "fa-map",
    title: text("Combine with pilgrimage", "Совмещайте с паломничеством", "Қажылықпен біріктіріңіз"),
    text: text(
      "AnimeJapan + Asakusa, Comiket + Odaiba. Plan both con and real locations.",
      "AnimeJapan + Асакуса, Comiket + Одайба. Планируйте и конвент, и реальные локации вместе.",
      "AnimeJapan + Асакуса, Comiket + Одайба. Конвент пен нақты локацияларды бірге жоспарлаңыз."
    ),
  },
];

export const placesPageCopy = {
  en: {
    pageLabel: "Places to Go",
    backButton: "Anime Atlas",
    heroTag: "Anime Tourism · Tokyo · 2025-2026",
    heroTitleTop: "PLACES FOR",
    heroTitleBottom: "FANS",
    heroDesc: "8 must-visit spots in Japan for every otaku - from Akihabara to Bandai's official showcase hall.",
    heroBack: "Back to Atlas",
    heroScroll: "To Places",
    statLocations: "Locations",
    statDistricts: "Districts",
    statMerch: "Merch",
    sectionKicker: "8 spots · Tokyo and beyond",
    sectionTitle: "ALL LOCATIONS",
    sectionSub: "Each stop includes context, useful tips, and the reason it deserves a place on your anime route.",
    backCtaLabel: "Seen all the spots? Keep exploring",
    backCtaTitle: "RETURN TO ANIME ATLAS",
    backCtaText: "Anime pilgrimage locations, cosplay conventions for 2025-2026, and frame-by-frame comparisons are waiting on the main page.",
    footerSub: "Guide to fan destinations · 2025-2026",
    footerNote: "for otaku worldwide",
  },
  ru: {
    pageLabel: "Места для фанатов",
    backButton: "Anime Atlas",
    heroTag: "Аниме-туризм · Токио · 2025-2026",
    heroTitleTop: "МЕСТА ДЛЯ",
    heroTitleBottom: "ФАНАТОВ",
    heroDesc: "8 обязательных точек в Японии для каждого отаку - от Акихабары до официального выставочного зала Bandai.",
    heroBack: "Назад к Atlas",
    heroScroll: "К местам",
    statLocations: "Локации",
    statDistricts: "Районы",
    statMerch: "Мерч",
    sectionKicker: "8 мест · Токио и окрестности",
    sectionTitle: "ВСЕ ЛОКАЦИИ",
    sectionSub: "Для каждой точки есть контекст, полезные советы и объяснение, почему ее стоит добавить в аниме-маршрут.",
    backCtaLabel: "Изучили все места? Идем дальше",
    backCtaTitle: "ВЕРНУТЬСЯ В ANIME ATLAS",
    backCtaText: "На главной странице вас ждут реальные локации из аниме, косплей-конвенты 2025-2026 и сравнения кадров с реальностью.",
    footerSub: "Гид по местам для фанатов · 2025-2026",
    footerNote: "для отаку по всему миру",
  },
  kk: {
    pageLabel: "Жанкүйерлерге арналған орындар",
    backButton: "Anime Atlas",
    heroTag: "Аниме-туризм · Токио · 2025-2026",
    heroTitleTop: "ЖАНКҮЙЕРЛЕРГЕ",
    heroTitleBottom: "АРНАЛҒАН ОРЫНДАР",
    heroDesc: "Әрбір отаку үшін Жапонияда міндетті түрде бару керек 8 нүкте - Акихабарадан Bandai ресми көрме залына дейін.",
    heroBack: "Atlas-қа қайту",
    heroScroll: "Орындарға өту",
    statLocations: "Локациялар",
    statDistricts: "Аудандар",
    statMerch: "Мерч",
    sectionKicker: "8 орын · Токио және айналасы",
    sectionTitle: "БАРЛЫҚ ЛОКАЦИЯЛАР",
    sectionSub: "Әрбір орын үшін контекст, пайдалы кеңестер және оны аниме маршрутына не үшін қосу керектігі туралы түсініктеме бар.",
    backCtaLabel: "Барлық орындарды қарап шықтыңыз ба? Одан әрі жалғастырайық",
    backCtaTitle: "ANIME ATLAS-ҚА ҚАЙТУ",
    backCtaText: "Басты бетте сізді нақты аниме локациялары, 2025-2026 жылдардағы косплей конвенциялары және кадрлардың шындықпен үндесуі күтеді.",
    footerSub: "Жанкүйерлер орындары гидті · 2025-2026",
    footerNote: "бүкіл әлемдегі отаку үшін",
  }
};

export const places = [
  {
    id: 1,
    badge: text("OTAKU MECCA", "ОТАКУ МЕККА", "ОТАКУ МЕККАСЫ"),
    badgeClass: "",
    district: text("Chiyoda, Tokyo", "Тиёда, Токио", "Чиёда, Токио"),
    name: text("Akihabara", "Акихабара", "Акихабара"),
    nameJp: "秋葉原 · Akihabara",
    desc: text(
      "The famous Electric Town and a global capital of anime culture. Multi-floor shops with figures, manga, cosplay gear, and merch all cluster here.",
      "Знаменитый Электрический город и мировая столица аниме-культуры. Здесь собраны многоэтажные магазины с фигурками, мангой, косплей-товарами.",
      "Атақты Электр қаласы және аниме мәдениетінің әлемдік астанасы. Мұнда фигуркалар, манга, косплей тауарлары бар көпқабатты дүкендер жиналған."
    ),
    tags: text(["Figures", "Manga", "Cosplay"], ["Фигурки", "Манга", "Косплей"], ["Фигуркалар", "Манга", "Косплей"]),
    tip: text("Weekdays are best.", "Лучшее время - будни.", "Ең жақсы уақыт - жұмыс күндері."),
    img: "https://simify.com/cdn/shop/articles/Akihabara-Electric-Town_d9063282-1d87-4abc-a9bb-546947123d27.jpg?v=1768900243&width=1100",
  },
  {
    id: 2,
    badge: text("MUST-SEE", "ОБЯЗАТЕЛЬНО", "МІНДЕТТІ"),
    badgeClass: "gold",
    district: text("Mitaka, Tokyo", "Митака, Токио", "Митака, Токио"),
    name: text("Ghibli Museum", "Музей Ghibli", "Ghibli мұражайы"),
    nameJp: "三鷹の森ジブリ美術館",
    desc: text(
      "Hayao Miyazaki's dream museum with Ghibli-inspired interiors.",
      "Музей мечты Хаяо Миядзаки с интерьерами в стиле Ghibli.",
      "Хаяо Миядзакидің армандаған мұражайы, Ghibli стиліндегі интерьерлермен."
    ),
    tags: text(["Miyazaki", "Exclusive"], ["Миядзаки", "Эксклюзив"], ["Миядзаки", "Эксклюзив"]),
    tip: text("Buy tickets online early.", "Покупайте билеты онлайн заранее.", "Билеттерді алдын ала онлайн сатып алыңыз."),
    img: "https://www.japan-guide.com/g23/3041_01.jpg",
  },
  {
    id: 3,
    badge: text("OTOME ROAD", "OTOME ROAD", "OTOME ROAD"),
    badgeClass: "ice",
    district: text("Toshima, Tokyo", "Тосима, Токио", "Тошима, Токио"),
    name: text("Ikebukuro", "Икебукуро", "Икебукуро"),
    nameJp: "池袋 · Ikebukuro",
    desc: text(
      "Otome Road is the go-to district for anime and manga aimed at women.",
      "Otome Road - главный район для аниме и манги с женской аудиторией.",
      "Otome Road - әйелдер аудиториясына арналған аниме мен манганың басты ауданы."
    ),
    tags: text(["Shojo", "BL", "Animate"], ["Сёдзё", "BL", "Animate"], ["Сёдзё", "BL", "Animate"]),
    tip: text("Pokemon Center Mega Tokyo is inside Sunshine City.", "Pokemon Center Mega Tokyo находится в Sunshine City.", "Pokemon Center Mega Tokyo Sunshine City ішінде орналасқан."),
    img: "https://resources.matcha-jp.com/resize/720x2000/2024/01/19-162824.webp",
  },
  {
    id: 4,
    badge: text("COLLECTOR'S PICK", "ДЛЯ КОЛЛЕКЦИОНЕРОВ", "КОЛЛЕКЦИОНЕРЛЕР ҮШІН"),
    badgeClass: "",
    district: text("Nakano, Tokyo", "Накано, Токио", "Накано, Токио"),
    name: text("Nakano Broadway", "Nakano Broadway", "Nakano Broadway"),
    nameJp: "中野ブロードウェイ",
    desc: text(
      "A legendary shopping complex for collectors: rare figures, vintage manga.",
      "Легендарный торговый комплекс для коллекционеров: редкие фигурки, винтажная манга.",
      "Коллекционерлерге арналған аңызға айналған сауда кешені: сирек фигуркалар, винтажды манга."
    ),
    tags: text(["Collectibles", "Vintage"], ["Коллекционное", "Винтаж"], ["Коллекциялық", "Винтаж"]),
    tip: text("Plan extra time here.", "Закладывайте больше времени.", "Мұнда көбірек уақыт жоспарлаңыз."),
    img: "https://www.japan-guide.com/g18/3069_01.jpg",
  },
  {
    id: 5,
    badge: text("MINIATURES", "МИНИАТЮРЫ", "МИНИАТЮРАЛАР"),
    badgeClass: "ice",
    district: text("Ariake, Tokyo", "Ариаке, Токио", "Ариаке, Токио"),
    name: text("Small Worlds Tokyo", "Small Worlds Tokyo", "Small Worlds Tokyo"),
    nameJp: "スモールワールズTOKYO",
    desc: text(
      "A miniature theme park with impressive Sailor Moon and Evangelion zones.",
      "Тематический парк миниатюр с впечатляющими зонами по Sailor Moon и Evangelion.",
      "Sailor Moon және Evangelion аймақтары бар әсерлі миниатюралық тақырыптық саябақ."
    ),
    tags: text(["Evangelion", "Sailor Moon"], ["Евангелион", "Сейлор Мун"], ["Евангелион", "Сейлор Мун"]),
    tip: text("Check availability for custom figures.", "Заранее проверьте доступность услуги для своих фигурок.", "Жеке фигуркаңыз үшін қолжетімділікті алдын ала тексеріңіз."),
    img: "https://www.tokyo-park.net/wp-content/uploads/Small-Worlds-Tokyo-66-2.jpeg",
  },
  {
    id: 6,
    badge: text("YOUR NAME", "ТВОЕ ИМЯ", "СЕНІҢ ЕСІМІҢ"),
    badgeClass: "",
    district: text("Shinjuku, Tokyo", "Синдзюку, Токио", "Шинджуку, Токио"),
    name: text("Suga Shrine Stairs", "Лестница Суга", "Суга баспалдағы"),
    nameJp: "須賀神社 · Sugawara Jinja",
    desc: text(
      "The most photographed anime pilgrimage location in Tokyo. From Your Name.",
      "Самая фотографируемая аниме-локация в Токио. Из Твоего имени.",
      "Токиодағы ең көп суретке түсірілетін аниме локациясы. Сенің есімің анимесінен."
    ),
    tags: text(["Pilgrimage", "Shinkai"], ["Паломничество", "Синкай"], ["Қажылық", "Синкай"]),
    tip: text("Come early in the morning.", "Приходите ранним утром.", "Таңертең ерте келіңіз."),
    img: "https://offloadmedia.feverup.com/secrettokyo.com/wp-content/uploads/2023/02/07225107/Suga-Shrine-Otokozaka.jpg",
  },
  {
    id: 7,
    badge: text("POKEMON", "ПОКЕМОН", "ПОКЕМОН"),
    badgeClass: "gold",
    district: text("Ikebukuro, Tokyo", "Икебукуро, Токио", "Икебукуро, Токио"),
    name: text("Pokemon Center Mega", "Pokemon Center Mega", "Pokemon Center Mega"),
    nameJp: "ポケモンセンターメガトウキョー",
    desc: text(
      "One of the biggest Pokemon stores in the world with exclusive merch.",
      "Один из крупнейших магазинов Pokemon в мире с эксклюзивным мерчем.",
      "Эксклюзивті мерчі бар әлемдегі ең үлкен Pokemon дүкендерінің бірі."
    ),
    tags: text(["Pokemon", "Merch", "Exclusive"], ["Покемон", "Мерч", "Эксклюзив"], ["Покемон", "Мерч", "Эксклюзив"]),
    tip: text("Arrive early on release days.", "В дни релизов приходите пораньше.", "Релиз күндері ертерек келіңіз."),
    img: "https://deeristravelling.com/wp-content/uploads/2020/05/pokemon-centers-stores-tokyo-14.jpg",
  },
  {
    id: 8,
    badge: text("FIGURES", "ФИГУРКИ", "ФИГУРКАЛАР"),
    badgeClass: "",
    district: text("Akihabara, Tokyo", "Акихабара, Токио", "Акихабара, Токио"),
    name: text("Tamashii Nations", "Tamashii Nations", "Tamashii Nations"),
    nameJp: "魂ネイションズ東京",
    desc: text(
      "Bandai Spirits' official showcase hall with prototype figures.",
      "Официальный выставочный зал Bandai Spirits с прототипами фигурок.",
      "Bandai Spirits-тің фигурка прототиптері бар ресми көрме залы."
    ),
    tags: text(["S.H.Figuarts", "Showcase"], ["S.H.Figuarts", "Экспозиция"], ["S.H.Figuarts", "Көрме"]),
    tip: text("Check the event displays carefully.", "Внимательно смотрите витрины и временные стенды.", "Уақытша стендтерді мұқият қараңыз."),
    img: "https://visit-chiyoda.tokyo/app/upload/images/TAMASHII-NATIONS01_710.jpg",
  },
];

export const irlCards = [
  {
    from: text("Studio Ghibli · Princess Mononoke", "Studio Ghibli · Принцесса Мононоке", "Studio Ghibli · Мононоке ханшайым"),
    name: text("Yakushima — Forest of Spirits", "Якусима — Лес духов", "Якушима — Рухтар орманы"),
    jp: "屋久島 · Kagoshima",
    loc: text("Yakushima Island, UNESCO Heritage", "Остров Якусима, Наследие ЮНЕСКО", "Якушима аралы, ЮНЕСКО мұрасы"),
    text: text(
      "Ancient cedar & moss-covered trails that inspired the Spirit Forest. Miyazaki spent weeks here sketching.",
      "Древние кедры и покрытые мхом тропы, вдохновившие Лес Духов. Миядзаки провел здесь недели за зарисовками.",
      "Рухтар орманына шабыт берген ежелгі балқарағайлар мен мүк басқан соқпақтар. Миядзаки мұнда бірнеше апта бойы суреттер салды."
    ),
    tags: text(["UNESCO site", "Shiratani Unsuikyo", "3hr hike"], ["Наследие ЮНЕСКО", "Сиратани Унсуйке", "Поход 3ч"], ["ЮНЕСКО мұрасы", "Ширатани Унсуйке", "3 сағаттық жорық"]),
    animeImg: "https://thefilmstage.com/wp-content/uploads/2020/04/princess-mononoke-symphonic-suite-vinyl-1.jpg",
    realImg: "https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-09/yakushima-guide_9.jpg",
  },
  {
    from: text("Makoto Shinkai · Your Name", "Макото Синкай · Твое Имя", "Макото Синкай · Сенің есімің"),
    name: text("Suga Shrine Stairs", "Лестница Суга", "Суга баспалдағы"),
    jp: "須賀神社 · Shinjuku",
    loc: text("Suga Shrine, Tokyo", "Храм Суга, Токио", "Суга ғибадатханасы, Токио"),
    text: text(
      "The legendary staircase where Taki and Mitsuha finally meet. The most photographed anime pilgrimage spot.",
      "Легендарная лестница, где Таки и Мицуха наконец встречаются. Самое фотографируемое место аниме-паломничества.",
      "Таки мен Мицуха ақыры кездесетін аңызға айналған баспалдақ. Аниме-қажылықтың ең көп суретке түсірілетін орны."
    ),
    tags: text(["Suga Shrine", "Shinjuku", "Iconic Scene"], ["Храм Суга", "Синдзюку", "Культовая сцена"], ["Суга ғибадатханасы", "Шинджуку", "Атақты көрініс"]),
    animeImg: "https://www.film.ru/sites/default/files/images/your-name3.jpg",
    realImg: "https://offloadmedia.feverup.com/secrettokyo.com/wp-content/uploads/2023/02/07225107/Suga-Shrine-Otokozaka.jpg",
  },
  {
    from: text("Makoto Shinkai · Weathering With You", "Макото Синкай · Дитя погоды", "Макото Синкай · Ауа райының баласы"),
    name: text("Tokyo Teleport Station", "Станция Tokyo Teleport", "Tokyo Teleport станциясы"),
    jp: "天気の子 · Tokyo",
    loc: text("Tokyo, Japan", "Токио, Япония", "Токио, Жапония"),
    text: text(
      "The iconic teleport station featured in Weathering With You.",
      "Знаковая станция телепортации из 'Дитя погоды'.",
      "'Ауа райының баласы' фильміндегі әйгілі телепортация станциясы."
    ),
    tags: text(["Tokyo Teleport Station", "Weathering With You"], ["Tokyo Teleport Station", "Дитя погоды"], ["Tokyo Teleport станциясы", "Ауа райының баласы"]),
    animeImg: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixvJrcOsGTJh2DhyNUEL_vzDQXU_bFJB-q6e0_8nTZP3YDaJve_z9JQz4YqGS5gRI9OPHhPTmWxhTISdS6evnQ7I0AIB3meWkpv6mRo5nGmEt2G5opy3z27ukS4Wg2zMGoRz5VgO9L68M/s1600/baitoru-00m08s.png",
    realImg: "https://tabimaniajapan.com/wp-content/uploads/2025/03/Weathering_with_You_locations_Tokyo_teleport_sta-1024x644.jpg",
  }
];

export const fansPanels = {
  ghibli: {
    studio: "Studio Ghibli",
    name: text("Ghibli Pilgrimage", "Паломничество Ghibli", "Ghibli қажылығы"),
    jp: "自然と魔法の世界",
    desc: text("Miyazaki's world is drawn from real Japanese landscapes.", "Мир Миядзаки срисован с реальных японских пейзажей.", "Миядзаки әлемі нақты жапон пейзаждарынан салынған."),
    img: "https://api.cagmo.ru/uploads/small_ghibli_studio_abdac729f4.webp",
    cards: [
      { img: "https://www.japan-guide.com/g23/3041_01.jpg", loc: text("Mitaka, Tokyo", "Митака, Токио", "Митака, Токио"), name: text("Ghibli Museum", "Музей Ghibli", "Ghibli мұражайы"), text: text("Enter Miyazaki's imagination. A must-see for every fan.", "Окунитесь в воображение Миядзаки. Обязательно к посещению.", "Миядзаки қиялына еніңіз. Міндетті түрде көріңіз.") },
      { img: "https://cdn.gaijinpot.com/app/uploads/sites/6/2016/06/Yakushima-lead.jpg", loc: text("Yakushima", "Якусима", "Якушима"), name: text("Mononoke Forest", "Лес Мононоке", "Мононоке орманы"), text: text("Ancient cedar & mossy trails — the spirit forest.", "Древние кедры и поросшие мхом тропы — лес духов.", "Ежелгі балқарағайлар мен мүкті соқпақтар — рухтар орманы.") },
      { img: "https://d1vqr0cheeo2qs.cloudfront.net/articles/title_images/000/039/136/medium/shutterstock_542335609_dogo_onsen-01.jpeg", loc: text("Hakone", "Хаконе", "Хаконе"), name: text("Spirited Away Onsen", "Онсен Унесенных призраками", "Рухтармен әкетілгендер онсені"), text: text("Traditional ryokan & steam bath atmosphere.", "Традиционный рекан и атмосфера паровой бани.", "Дәстүрлі рекан және бу моншасының атмосферасы.") }
    ]
  },
  yourname: {
    studio: "CoMix Wave Films",
    name: text("Your Name", "Твое Имя", "Сенің Есімің"),
    jp: "君の名は",
    desc: text("Every scene is a real photograph. Follow Taki & Mitsuha.", "Каждая сцена - реальная фотография. Следуйте за Таки и Мицухой.", "Әрбір көрініс - нақты фотосурет. Таки мен Мицуханың ізімен жүріңіз."),
    img: "https://rachelsreviews.net/wp-content/uploads/2016/11/your-name3.png",
    cards: [
      { img: "https://offloadmedia.feverup.com/secrettokyo.com/wp-content/uploads/2023/02/07225107/Suga-Shrine-Otokozaka.jpg", loc: text("Suga Shrine", "Храм Суга", "Суга ғибадатханасы"), name: text("Final Scene Stairs", "Лестница финала", "Финалдық баспалдақ"), text: text("Iconic staircase in Shinjuku.", "Знаменитая лестница в Синдзюку.", "Шинджукудегі әйгілі баспалдақ.") },
      { img: "https://www.snowmonkeyresorts.com/wp-content/uploads/2024/12/3849306_m.jpg", loc: text("Hida-Furukawa", "Хида-Фурукава", "Хида-Фурукава"), name: text("Mitsuha's Hometown", "Родной город Мицухи", "Мицуханың туған қаласы"), text: text("Cultural significance in the Hida region.", "Культурное наследие региона Хида.", "Хида аймағының мәдени мұрасы.") },
      { img: "https://www.akibagamers.it/wp-content/uploads/2020/09/labi-shinjuku-yunika-vision-01.jpg", loc: text("Shinjuku", "Синдзюку", "Шинджуку"), name: text("Taki's Tokyo Walk", "Прогулка Таки по Токио", "Такидің Токиодағы серуені"), text: text("Real city corners from the film.", "Реальные виды города из фильма.", "Фильмдегі нақты қала көріністері.") }
    ]
  },
  weathering: {
    studio: "CoMix Wave Films",
    name: text("Weathering With You", "Дитя погоды", "Ауа райының баласы"),
    jp: "天気の子",
    desc: text("Rain-soaked Tokyo & sacred shrines — Shinkai's most atmospheric work.", "Пропитанный дождем Токио и священные храмы — самая атмосферная работа Синкая.", "Жаңбырлы Токио мен қасиетті храмдар — Синкайдың ең атмосфералық жұмысы."),
    img: "https://m.media-amazon.com/images/M/MV5BMmJiYWI4ZjktMzgyZS00MjBiLThmOTYtZWJmOTUzOTFkMTFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    cards: [
      { img: "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2019/08/W2A4541-1024x600.jpg", loc: text("Shinjuku, Tokyo", "Синдзюку, Токио", "Шинджуку, Токио"), name: text("Shinjuku Streets", "Улицы Синдзюку", "Шинджуку көшелері"), text: text("Neon-lit alleys where Hodaka arrives.", "Неоновые переулки, куда прибывает Ходака.", "Ходака келетін неон аллеялары.") },
      { img: "https://jw-webmagazine.com/wp-content/uploads/2019/08/IMG_2966-2-min.jpg", loc: text("Mt. Takao", "Гора Такао", "Такао тауы"), name: text("Takao Shrine", "Храм Такао", "Такао ғибадатханасы"), text: text("The abandoned shrine above the clouds.", "Заброшенный храм над облаками.", "Бұлттар үстіндегі тастанды храм.") },
      { img: "https://img.mipon.org/wp-content/uploads/2019/09/10135848/tenki-no-ko_building-1024x768.jpg", loc: text("Yoyogi & Shibuya", "Ееги и Сибуя", "Ееги мен Сибуя"), name: text("Rooftop & Rain Scenes", "Сцены на крыше и под дождем", "Шатырдағы және жаңбыр астындағы көріністер"), text: text("Iconic locations from the trailer.", "Знаковые локации из трейлера.", "Трейлердегі әйгілі локациялар.") }
    ]
  },
  garden: {
    studio: "CoMix Wave Films",
    name: text("The Garden of Words", "Сад изящных слов", "Сөздер бағы"),
    jp: "言の葉の庭",
    desc: text("The most beautiful rain-soaked garden in anime — Shinjuku Gyoen.", "Самый красивый дождливый сад в аниме — Синдзюку Геэн.", "Анимедегі ең әдемі жаңбырлы бақ — Шинджуку Геэн."),
    img: "https://play-lh.googleusercontent.com/I2BD6dScP_Lg44iVGh3UTABPPTrikrYFA5hV6K-x3IKxTFmfZKywAVgnXxxlJU_nX7LLJw",
    cards: [
      { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bench_in_Shinjuku_Gyoen.JPG/1280px-Bench_in_Shinjuku_Gyoen.JPG", loc: text("Shinjuku Gyoen", "Синдзюку Гоэн", "Шинджуку Гоэн"), name: text("Japanese Garden Pavilion", "Павильон японского сада", "Жапон бағының павильоны"), text: text("The exact gazebo where Yukari and Takao meet.", "Та самая беседка, где встречаются Юкари и Такао.", "Юкари мен Такао кездесетін сол күрке.") },
      { img: "https://www.advantour.com/img/japan/tokyo/yoyogi-park/yoyogi-park-sky-view.jpg", loc: text("Shinjuku & Yoyogi", "Синдзюку и Ееги", "Шинджуку мен Ееги"), name: text("Rainy City Walks", "Прогулки по дождливому городу", "Жаңбырлы қалада серуендеу"), text: text("Footbridges and alleys from the film.", "Пешеходные мосты и аллеи из фильма.", "Фильмдегі жаяу жүргіншілер көпірлері мен аллеялар.") },
      { img: "https://www.japan-guide.com/g18/3009_01.jpg", loc: text("Sumida & Asakusa", "Сумида и Асакуса", "Сумида мен Асакуса"), name: text("Skyline Views", "Панорамные виды", "Панорамалық көріністер"), text: text("Panoramic scenes of Tokyo.", "Панорамные виды Токио.", "Токионың панорамалық көріністері.") }
    ]
  },
  jjk: {
    studio: "MAPPA",
    name: text("Jujutsu Kaisen", "Магическая битва", "Сиқырлы шайқас"),
    jp: "呪術廻戦",
    desc: text("Hyper-accurate Tokyo & Sendai — Shibuya incident comes alive.", "Гиперреалистичный Токио и Сендай — инцидент в Сибуе оживает.", "Ерен шынайы Токио мен Сендай - Сибуя инциденті жанданады."),
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Jujutsu_kaisen.jpg/250px-Jujutsu_kaisen.jpg",
    cards: [
      { img: "https://japantour.xyz/wp-content/uploads/2025/02/IMG_8942-1024x825.jpg", loc: text("Shibuya Crossing", "Перекресток Сибуя", "Сибуя қиылысы"), name: text("Shibuya Station", "Станция Сибуя", "Сибуя станциясы"), text: text("The iconic arc location.", "Знаковая локация из арки.", "Атаулы арканың локациясы.") },
      { img: "https://japantour.xyz/wp-content/uploads/2022/06/Screen-Shot-2022-06-16-at-12.11.24.png", loc: text("Sugamo, Tokyo", "Сугамо, Токио", "Сугамо, Токио"), name: text("Jujutsu High Streets", "Улицы Магической школы", "Магия мектебінің көшелері"), text: text("Alleys & stairs from the anime.", "Аллеи и лестницы из аниме.", "Анимедегі аллеялар мен баспалдақтар.") },
      { img: "https://thumbs.dreamstime.com/b/miyagi-japan-april-many-people-walking-ichibancho-shopping-arcade-sendai-downtown-308276447.jpg", loc: text("Sendai, Miyagi", "Сендай, Мияги", "Сендай, Мияги"), name: text("Nanami's City", "Город Нанами", "Нанами қаласы"), text: text("Ichibancho arcade & offices.", "Торговые аркады и офисы Итибанте.", "Ичибанчо сауда аркадалары мен кеңселері.") }
    ]
  }
};

export const conventionsData = [
  { dateClass: "", month: text("DEC", "ДЕК", "ЖЕЛ"), day: "28-30", country: text("Tokyo Big Sight", "Токио", "Токио"), flag: "#bc002d", name: "Comiket C107", city: text("Ariake, Tokyo", "Ариаке, Токио", "Ариаке, Токио"), desc: text("World's biggest doujinshi & cosplay festival. 700k+ visitors.", "Крупнейший в мире фестиваль додзинси и косплея. Более 700к посетителей.", "Әлемдегі ең үлкен додзинси және косплей фестивалі. 700 мыңнан астам келушілер."), img: "https://flitjet.wordpress.com/wp-content/uploads/2025/11/c107.jpg", tags: text(["Doujinshi", "Cosplay", "700k+"], ["Додзинси", "Косплей", "700k+"], ["Додзинси", "Косплей", "700k+"]) },
  { dateClass: "gold", month: text("JULY", "ИЮЛЬ", "ШІЛ"), day: "24-27", country: text("San Diego", "Сан-Диего", "Сан-Диего"), flag: "#3c3b6e", name: "Comic-Con International", city: text("San Diego Convention Center", "San Diego Convention Center", "San Diego Convention Center"), desc: text("Legendary masquerade, huge anime panels.", "Легендарный маскарад, огромные аниме-панели.", "Аңызға айналған маскарад, үлкен аниме панельдері."), img: "https://upload.wikimedia.org/wikipedia/en/9/97/San_Diego_Comic-Con_International_logo.svg", tags: text(["Masquerade", "Hollywood"], ["Маскарад", "Голливуд"], ["Маскарад", "Голливуд"]) },
  { dateClass: "ice", month: text("AUG", "АВГ", "ТАМ"), day: "29-31", country: text("Makuhari Messe", "Макухари", "Макухари"), flag: "#bc002d", name: "Anime Japan 2026", city: text("Chiba, Tokyo area", "Тиба, окрестности Токио", "Чиба, Токио маңы"), desc: text("Official industry expo with premieres and exclusive merch.", "Официальная индустриальная выставка с премьерами и эксклюзивным мерчем.", "Премьералар мен эксклюзивті мерчі бар ресми өнеркәсіптік көрме."), img: "https://amnibus-event.s3.amazonaws.com/wp-content/uploads/34cd99f7fb77e712df9337e064c88904.jpg", tags: text(["Industry", "Premieres"], ["Индустрия", "Премьеры"], ["Индустрия", "Премьералар"]) },
  { dateClass: "lime", month: text("JUNE", "ИЮНЬ", "МАУ"), day: "27-29", country: text("Los Angeles", "Лос-Анджелес", "Лос-Анджелес"), flag: "#3c3b6e", name: "Anime Expo 2026", city: text("LA Convention Center", "LA Convention Center", "LA Convention Center"), desc: text("North America's largest anime con, 120k+ attendees, massive cosplay parade.", "Крупнейший аниме-конвент Северной Америки, более 120к участников, масштабный парад косплея.", "Солтүстік Америкадағы ең үлкен аниме-конвент, 120 мыңнан астам қатысушылар, ауқымды косплей шеруі."), img: "https://www.laconventioncenter.com/assets/img/anime-expo-2026-main-c91ad3dea7.jpg", tags: text(["Cosplay Parade", "120k+"], ["Парад косплея", "120k+"], ["Косплей шеруі", "120k+"]) },
  { dateClass: "", month: text("MAR", "МАРТ", "НАУ"), day: "14-16", country: text("London", "Лондон", "Лондон"), flag: "#012169", name: "MCM London Comic Con", city: text("ExCeL London", "ExCeL London", "ExCeL London"), desc: text("Europe's leading anime & pop culture expo.", "Ведущая выставка аниме и поп-культуры в Европе.", "Еуропадағы жетекші аниме және поп-мәдениет көрмесі."), img: "https://www.nintendo.com/eu/media/images/08_content_images/country_support_2/uk_6/MCM_H2x1.png", tags: text(["Europe Hub", "75k"], ["Хаб Европы", "75k"], ["Еуропа хабы", "75k"]) },
  { dateClass: "ice", month: text("APR", "АПР", "СӘУ"), day: "18-20", country: text("Paris", "Париж", "Париж"), flag: "#002395", name: "Japan Expo Paris", city: text("Paris-Nord Villepinte", "Paris-Nord Villepinte", "Paris-Nord Villepinte"), desc: text("250k visitors, giant J-culture & cosplay arena.", "250к посетителей, гигантская арена J-культуры и косплея.", "250 мың келушілер, J-мәдениет және косплейдің алып аренасы."), img: "https://www.ecostylia.com/wp-content/uploads/2025/07/japan-expo-2025-featured-image-1200x900-fullscreen.jpg", tags: text(["250k", "Music"], ["250k", "Музыка"], ["250k", "Музыка"]) }
];
