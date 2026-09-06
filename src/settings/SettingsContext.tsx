import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    COLOR_THEMES,
    DARK_SURFACE,
    LIGHT_SURFACE,
    ResolvedTheme,
    ColorThemeKey
} from '../theme/colors';
import { STRINGS, Strings, Language } from '../i18n/strings';
import {
    PRAYER_NAME_STYLES,
    PrayerNameStyleKey,
    PrayerNames
} from '../i18n/prayerNames';
import { DEFAULT_CITY } from '../data/cityNames';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEYS = {
    themeMode: 'themeMode',
    colorTheme: 'colorTheme',
    prayerNameStyle: 'prayerNameStyle',
    language: 'appLanguage',
    selectedCity: 'selectedCity'
} as const;

type SettingsContextValue = {
    isLoaded: boolean;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    colorTheme: ColorThemeKey;
    setColorTheme: (theme: ColorThemeKey) => void;
    prayerNameStyle: PrayerNameStyleKey;
    setPrayerNameStyle: (style: PrayerNameStyleKey) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    theme: ResolvedTheme;
    strings: Strings;
    prayerNames: PrayerNames;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const systemColorScheme = useColorScheme();

    const [isLoaded, setIsLoaded] = useState(false);
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
    const [colorTheme, setColorThemeState] = useState<ColorThemeKey>('green');
    const [prayerNameStyle, setPrayerNameStyleState] =
        useState<PrayerNameStyleKey>('default');
    const [language, setLanguageState] = useState<Language>('bg');
    const [selectedCity, setSelectedCityState] = useState<string>(DEFAULT_CITY);

    useEffect(() => {
        (async () => {
            try {
                const entries = await AsyncStorage.multiGet(
                    Object.values(STORAGE_KEYS)
                );
                const values = Object.fromEntries(entries);

                if (values[STORAGE_KEYS.themeMode]) {
                    setThemeModeState(values[STORAGE_KEYS.themeMode] as ThemeMode);
                }
                if (values[STORAGE_KEYS.colorTheme]) {
                    setColorThemeState(
                        values[STORAGE_KEYS.colorTheme] as ColorThemeKey
                    );
                }
                if (values[STORAGE_KEYS.prayerNameStyle]) {
                    setPrayerNameStyleState(
                        values[STORAGE_KEYS.prayerNameStyle] as PrayerNameStyleKey
                    );
                }
                if (values[STORAGE_KEYS.language]) {
                    setLanguageState(values[STORAGE_KEYS.language] as Language);
                }
                if (values[STORAGE_KEYS.selectedCity]) {
                    setSelectedCityState(values[STORAGE_KEYS.selectedCity] as string);
                }
            } finally {
                setIsLoaded(true);
            }
        })();
    }, []);

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        AsyncStorage.setItem(STORAGE_KEYS.themeMode, mode);
    };

    const setColorTheme = (colorThemeKey: ColorThemeKey) => {
        setColorThemeState(colorThemeKey);
        AsyncStorage.setItem(STORAGE_KEYS.colorTheme, colorThemeKey);
    };

    const setPrayerNameStyle = (style: PrayerNameStyleKey) => {
        setPrayerNameStyleState(style);
        AsyncStorage.setItem(STORAGE_KEYS.prayerNameStyle, style);
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        AsyncStorage.setItem(STORAGE_KEYS.language, lang);
    };

    const setSelectedCity = (city: string) => {
        setSelectedCityState(city);
        AsyncStorage.setItem(STORAGE_KEYS.selectedCity, city);
    };

    const theme = useMemo<ResolvedTheme>(() => {
        const isDark =
            themeMode === 'system'
                ? systemColorScheme === 'dark'
                : themeMode === 'dark';
        const surface = isDark ? DARK_SURFACE : LIGHT_SURFACE;
        const { primary, primaryDark } = COLOR_THEMES[colorTheme];

        return { ...surface, primary, primaryDark, isDark };
    }, [themeMode, systemColorScheme, colorTheme]);

    const strings = STRINGS[language];
    const prayerNames = PRAYER_NAME_STYLES[language][prayerNameStyle];

    const value: SettingsContextValue = {
        isLoaded,
        themeMode,
        setThemeMode,
        colorTheme,
        setColorTheme,
        prayerNameStyle,
        setPrayerNameStyle,
        language,
        setLanguage,
        selectedCity,
        setSelectedCity,
        theme,
        strings,
        prayerNames
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings(): SettingsContextValue {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
