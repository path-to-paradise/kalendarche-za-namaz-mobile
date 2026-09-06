import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { useSettings, ThemeMode } from '../settings/SettingsContext';
import { COLOR_THEME_ORDER, ColorThemeKey, COLOR_THEMES } from '../theme/colors';
import type { PrayerNameStyleKey } from '../i18n/prayerNames';
import type { Language } from '../i18n/strings';

type Props = {
    visible: boolean;
    onClose: () => void;
};

const COLOR_LABEL_KEYS: Record<ColorThemeKey, string> = {
    green: 'colorGreen',
    blue: 'colorBlue',
    teal: 'colorTeal',
    purple: 'colorPurple',
    amber: 'colorAmber',
    rose: 'colorRose',
    indigo: 'colorIndigo',
    sky: 'colorSky',
    orange: 'colorOrange',
    pink: 'colorPink'
};

export function SettingsModal({ visible, onClose }: Props) {
    const {
        theme,
        strings,
        themeMode,
        setThemeMode,
        colorTheme,
        setColorTheme,
        prayerNameStyle,
        setPrayerNameStyle,
        language,
        setLanguage
    } = useSettings();

    const ToggleGroup = <T extends string>({
        options,
        value,
        onChange,
        labels
    }: {
        options: T[];
        value: T;
        onChange: (v: T) => void;
        labels: Record<T, string>;
    }) => (
        <View style={styles.toggleGroup}>
            {options.map((option) => {
                const isActive = option === value;
                return (
                    <Pressable
                        key={option}
                        onPress={() => onChange(option)}
                        style={[
                            styles.toggleOption,
                            {
                                backgroundColor: isActive
                                    ? theme.primary
                                    : theme.surfaceAlt,
                                borderColor: isActive ? theme.primary : theme.border
                            }
                        ]}
                    >
                        <Text
                            style={[
                                styles.toggleOptionText,
                                { color: isActive ? '#fff' : theme.text }
                            ]}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            minimumFontScale={0.75}
                        >
                            {labels[option]}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable
                    style={[styles.card, { backgroundColor: theme.surface }]}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, { color: theme.text }]}>
                            {strings.settingsTitle}
                        </Text>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <Text style={[styles.close, { color: theme.muted }]}>
                                ✕
                            </Text>
                        </Pressable>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
                            {strings.themeLabel}
                        </Text>
                        <ToggleGroup<ThemeMode>
                            options={['light', 'dark', 'system']}
                            value={themeMode}
                            onChange={setThemeMode}
                            labels={{
                                light: strings.themeLight,
                                dark: strings.themeDark,
                                system: strings.themeSystem
                            }}
                        />

                        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
                            {strings.colorLabel}
                        </Text>
                        <View style={styles.swatchRow}>
                            {COLOR_THEME_ORDER.map((key) => {
                                const isActive = key === colorTheme;
                                return (
                                    <Pressable
                                        key={key}
                                        onPress={() => setColorTheme(key)}
                                        style={[
                                            styles.swatch,
                                            {
                                                backgroundColor: COLOR_THEMES[key].primary
                                            },
                                            isActive && [
                                                styles.swatchActive,
                                                { borderColor: theme.surface }
                                            ]
                                        ]}
                                    >
                                        {isActive && (
                                            <View
                                                style={[
                                                    styles.swatchRing,
                                                    { borderColor: COLOR_THEMES[key].primary }
                                                ]}
                                            />
                                        )}
                                    </Pressable>
                                );
                            })}
                        </View>

                        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
                            {strings.prayerNamesLabel}
                        </Text>
                        <ToggleGroup<PrayerNameStyleKey>
                            options={['default', 'arabic', 'descriptive']}
                            value={prayerNameStyle}
                            onChange={setPrayerNameStyle}
                            labels={{
                                default: strings.styleDefault,
                                arabic: strings.styleArabic,
                                descriptive: strings.styleDescriptive
                            }}
                        />

                        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
                            {strings.languageLabel}
                        </Text>
                        <ToggleGroup<Language>
                            options={['bg', 'en']}
                            value={language}
                            onChange={setLanguage}
                            labels={{ bg: 'Български', en: 'English' }}
                        />
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    card: {
        width: '100%',
        maxWidth: 360,
        maxHeight: '80%',
        borderRadius: 24,
        padding: 24
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    title: {
        fontSize: 17,
        fontWeight: '700'
    },
    close: {
        fontSize: 20
    },
    sectionLabel: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    toggleGroup: {
        flexDirection: 'row',
        gap: 6
    },
    toggleOption: {
        flex: 1,
        paddingVertical: 9,
        paddingHorizontal: 6,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center'
    },
    toggleOptionText: {
        fontSize: 13,
        fontWeight: '600'
    },
    swatchRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    swatch: {
        width: 34,
        height: 34,
        borderRadius: 17
    },
    swatchActive: {
        borderWidth: 2
    },
    swatchRing: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: 21,
        borderWidth: 2
    }
});
