export type CityInfo = {
    value: string;
    bg: string;
    en: string;
};

// Order matches the original web app's city picker. English spellings
// follow Bulgaria's official (Streamlined System) transliteration, the
// same one used on road signs and in passports.
export const CITIES: CityInfo[] = [
    { value: 'aytos', bg: 'Айтос', en: 'Aytos' },
    { value: 'balchik', bg: 'Балчик', en: 'Balchik' },
    { value: 'blagoevgrad', bg: 'Благоевград', en: 'Blagoevgrad' },
    { value: 'burgas', bg: 'Бургас', en: 'Burgas' },
    { value: 'byala', bg: 'Бяла', en: 'Byala' },
    { value: 'varna', bg: 'Варна', en: 'Varna' },
    { value: 'velikipreslav', bg: 'Велики Преслав', en: 'Veliki Preslav' },
    { value: 'velikotarnovo', bg: 'Велико Търново', en: 'Veliko Tarnovo' },
    { value: 'velingrad', bg: 'Велинград', en: 'Velingrad' },
    { value: 'gornaoryahovitsa', bg: 'Горна Оряховица', en: 'Gorna Oryahovitsa' },
    { value: 'gotzedelchev', bg: 'Гоце Делчев', en: 'Gotse Delchev' },
    { value: 'dobrich', bg: 'Добрич', en: 'Dobrich' },
    { value: 'isperih', bg: 'Исперих', en: 'Isperih' },
    { value: 'kavarna', bg: 'Каварна', en: 'Kavarna' },
    { value: 'kaolinovo', bg: 'Каолиново', en: 'Kaolinovo' },
    { value: 'karlovo', bg: 'Карлово', en: 'Karlovo' },
    { value: 'karnobat', bg: 'Карнобат', en: 'Karnobat' },
    { value: 'kneja', bg: 'Кнежа', en: 'Knezha' },
    { value: 'kotel', bg: 'Котел', en: 'Kotel' },
    { value: 'krumovgrad', bg: 'Крумовград', en: 'Krumovgrad' },
    { value: 'kubrat', bg: 'Кубрат', en: 'Kubrat' },
    { value: 'kardjali', bg: 'Кърджали', en: 'Kardzhali' },
    { value: 'lovech', bg: 'Ловеч', en: 'Lovech' },
    { value: 'madan', bg: 'Мадан', en: 'Madan' },
    { value: 'montana', bg: 'Монтана', en: 'Montana' },
    { value: 'nikipol', bg: 'Никопол', en: 'Nikopol' },
    { value: 'novazagora', bg: 'Нова Загора', en: 'Nova Zagora' },
    { value: 'novipazar', bg: 'Нови пазар', en: 'Novi Pazar' },
    { value: 'pazardzhik', bg: 'Пазарджик', en: 'Pazardzhik' },
    { value: 'pleven', bg: 'Плевен', en: 'Pleven' },
    { value: 'plovdiv', bg: 'Пловдив', en: 'Plovdiv' },
    { value: 'provadiya', bg: 'Провадия', en: 'Provadia' },
    { value: 'razgrad', bg: 'Разград', en: 'Razgrad' },
    { value: 'ruse', bg: 'Русе', en: 'Ruse' },
    { value: 'svistov', bg: 'Свищов', en: 'Svishtov' },
    { value: 'silistra', bg: 'Силистра', en: 'Silistra' },
    { value: 'sitovo', bg: 'Ситово', en: 'Sitovo' },
    { value: 'sliven', bg: 'Сливен', en: 'Sliven' },
    { value: 'smolyan', bg: 'Смолян', en: 'Smolyan' },
    { value: 'sofia', bg: 'София', en: 'Sofia' },
    { value: 'starazagora', bg: 'Стара Загора', en: 'Stara Zagora' },
    { value: 'tvarditza', bg: 'Твърдица', en: 'Tvarditsa' },
    { value: 'targoviste', bg: 'Търговище', en: 'Targovishte' },
    { value: 'harmanli', bg: 'Харманли', en: 'Harmanli' },
    { value: 'haskovo', bg: 'Хасково', en: 'Haskovo' },
    { value: 'shumen', bg: 'Шумен', en: 'Shumen' },
    { value: 'yakoruda', bg: 'Якоруда', en: 'Yakoruda' },
    { value: 'yambol', bg: 'Ямбол', en: 'Yambol' }
];

export const DEFAULT_CITY = 'sofia';
