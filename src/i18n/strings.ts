export type Language = 'bg' | 'en';

export type Strings = {
    appTitle: string;
    settingsTitle: string;
    themeLabel: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    colorLabel: string;
    colorGreen: string;
    colorBlue: string;
    colorTeal: string;
    colorPurple: string;
    colorAmber: string;
    colorRose: string;
    colorIndigo: string;
    colorSky: string;
    colorOrange: string;
    colorPink: string;
    prayerNamesLabel: string;
    styleDefault: string;
    styleArabic: string;
    styleDescriptive: string;
    languageLabel: string;
    cityPickerTitle: string;
    todayButton: string;
    close: string;
    dayToday: string;
    dayYesterday: string;
    dayTomorrow: string;
    nowBadge: string;
    eidDay1: string;
    eidDay2: string;
    ramadanStart: string;
    ramadanDay: (n: number) => string;
    ramadanLastDayPrefix: string;
    dateLocale: string;
};

export const STRINGS: Record<Language, Strings> = {
    bg: {
        appTitle: 'Времето за намаз',
        settingsTitle: 'Настройки',
        themeLabel: 'Тема',
        themeLight: 'Светла',
        themeDark: 'Тъмна',
        themeSystem: 'Системна',
        colorLabel: 'Цвят',
        colorGreen: 'Зелен',
        colorBlue: 'Син',
        colorTeal: 'Тюркоазен',
        colorPurple: 'Лилав',
        colorAmber: 'Кехлибарен',
        colorRose: 'Розов',
        colorIndigo: 'Индиго',
        colorSky: 'Небесносин',
        colorOrange: 'Оранжев',
        colorPink: 'Розово-лилав',
        prayerNamesLabel: 'Имена на молитвите',
        styleDefault: 'По подразбиране',
        styleArabic: 'Арабски',
        styleDescriptive: 'Описателен',
        languageLabel: 'Език',
        cityPickerTitle: 'Изберете град',
        todayButton: 'Върни се към днес',
        close: 'Затвори',
        dayToday: 'Днес',
        dayYesterday: 'Вчера',
        dayTomorrow: 'Утре',
        nowBadge: 'сега',
        eidDay1: 'Рамазан Байрам',
        eidDay2: 'Втори ден на Рамазан Байрам',
        ramadanStart: 'Начало на Рамазан',
        ramadanDay: (n) => `${n}-и ден от Рамазан`,
        ramadanLastDayPrefix: 'Последен ден от Рамазан · ',
        dateLocale: 'bg'
    },
    en: {
        appTitle: 'Prayer Times',
        settingsTitle: 'Settings',
        themeLabel: 'Theme',
        themeLight: 'Light',
        themeDark: 'Dark',
        themeSystem: 'System',
        colorLabel: 'Color',
        colorGreen: 'Green',
        colorBlue: 'Blue',
        colorTeal: 'Teal',
        colorPurple: 'Purple',
        colorAmber: 'Amber',
        colorRose: 'Rose',
        colorIndigo: 'Indigo',
        colorSky: 'Sky',
        colorOrange: 'Orange',
        colorPink: 'Pink',
        prayerNamesLabel: 'Prayer names',
        styleDefault: 'Default',
        styleArabic: 'Arabic',
        styleDescriptive: 'Descriptive',
        languageLabel: 'Language',
        cityPickerTitle: 'Choose a city',
        todayButton: 'Back to today',
        close: 'Close',
        dayToday: 'Today',
        dayYesterday: 'Yesterday',
        dayTomorrow: 'Tomorrow',
        nowBadge: 'now',
        eidDay1: 'Eid al-Fitr',
        eidDay2: 'Second day of Eid al-Fitr',
        ramadanStart: 'Start of Ramadan',
        ramadanDay: (n) => `Day ${n} of Ramadan`,
        ramadanLastDayPrefix: 'Last day of Ramadan · ',
        dateLocale: 'en-GB'
    }
};
