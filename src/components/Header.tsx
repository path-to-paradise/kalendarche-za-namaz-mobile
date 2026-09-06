import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { useSettings } from '../settings/SettingsContext';
import { CITIES } from '../data/cityNames';

type Props = {
    onOpenSettings: () => void;
    onOpenCityPicker: () => void;
    showTodayButton: boolean;
    onPressToday: () => void;
};

function GearIcon() {
    return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
            <Circle
                cx={12}
                cy={12}
                r={3}
                stroke="#fff"
                strokeWidth={2}
                fill="none"
            />
            <Path
                d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.04-1.56V3a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1.04H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04Z"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
}

export function Header({
    onOpenSettings,
    onOpenCityPicker,
    showTodayButton,
    onPressToday
}: Props) {
    const { theme, strings, language, selectedCity } = useSettings();
    const insets = useSafeAreaInsets();

    const cityInfo = CITIES.find((c) => c.value === selectedCity);
    const cityLabel = cityInfo ? (language === 'en' ? cityInfo.en : cityInfo.bg) : '';

    return (
        <LinearGradient
            colors={[theme.primary, theme.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.header, { paddingTop: insets.top + 14 }]}
        >
            <Pressable
                style={styles.settingsButton}
                onPress={onOpenSettings}
                hitSlop={10}
            >
                <GearIcon />
            </Pressable>

            <Text style={styles.title}>{strings.appTitle}</Text>

            <Pressable style={styles.cityButton} onPress={onOpenCityPicker}>
                <Text style={styles.cityButtonText}>{cityLabel}</Text>
            </Pressable>

            {showTodayButton && (
                <Pressable onPress={onPressToday} hitSlop={8}>
                    <Text style={styles.todayButtonText}>
                        {strings.todayButton}
                    </Text>
                </Pressable>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingBottom: 16,
        paddingHorizontal: 16,
        gap: 10
    },
    settingsButton: {
        position: 'absolute',
        top: 14,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)'
    },
    title: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '700'
    },
    cityButton: {
        backgroundColor: 'rgba(255,255,255,0.18)',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 999
    },
    cityButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    },
    todayButtonText: {
        color: 'rgba(255,255,255,0.85)',
        fontSize: 13,
        fontWeight: '600',
        textDecorationLine: 'underline'
    }
});
