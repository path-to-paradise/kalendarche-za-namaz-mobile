export type DayPrayerTimes = {
    down: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
};

export type PrayerTimeTable = Record<string, Record<string, DayPrayerTimes>>;

// Metro requires static paths, so every city file is required explicitly
// here instead of built from a dynamic city list.
export const TIME_TABLES: Record<string, PrayerTimeTable> = {
    aytos: require('./aytos-time.json'),
    balchik: require('./balchik-time.json'),
    blagoevgrad: require('./blagoevgrad-time.json'),
    burgas: require('./burgas-time.json'),
    byala: require('./byala-time.json'),
    varna: require('./varna-time.json'),
    velikipreslav: require('./velikipreslav-time.json'),
    velikotarnovo: require('./velikotarnovo-time.json'),
    velingrad: require('./velingrad-time.json'),
    gornaoryahovitsa: require('./gornaoryahovitsa-time.json'),
    gotzedelchev: require('./gotzedelchev-time.json'),
    dobrich: require('./dobrich-time.json'),
    isperih: require('./isperih-time.json'),
    kavarna: require('./kavarna-time.json'),
    kaolinovo: require('./kaolinovo-time.json'),
    karlovo: require('./karlovo-time.json'),
    karnobat: require('./karnobat-time.json'),
    kneja: require('./kneja-time.json'),
    kotel: require('./kotel-time.json'),
    krumovgrad: require('./krumovgrad-time.json'),
    kubrat: require('./kubrat-time.json'),
    kardjali: require('./kardjali-time.json'),
    lovech: require('./lovech-time.json'),
    madan: require('./madan-time.json'),
    montana: require('./montana-time.json'),
    nikipol: require('./nikipol-time.json'),
    novazagora: require('./novazagora-time.json'),
    novipazar: require('./novipazar-time.json'),
    pazardzhik: require('./pazardzhik-time.json'),
    pleven: require('./pleven-time.json'),
    plovdiv: require('./plovdiv-time.json'),
    provadiya: require('./provadiya-time.json'),
    razgrad: require('./razgrad-time.json'),
    ruse: require('./ruse-time.json'),
    svistov: require('./svistov-time.json'),
    silistra: require('./silistra-time.json'),
    sitovo: require('./sitovo-time.json'),
    sliven: require('./sliven-time.json'),
    smolyan: require('./smolyan-time.json'),
    sofia: require('./sofia-time.json'),
    starazagora: require('./starazagora-time.json'),
    tvarditza: require('./tvarditza-time.json'),
    targoviste: require('./targoviste-time.json'),
    harmanli: require('./harmanli-time.json'),
    haskovo: require('./haskovo-time.json'),
    shumen: require('./shumen-time.json'),
    yakoruda: require('./yakoruda-time.json'),
    yambol: require('./yambol-time.json')
};
