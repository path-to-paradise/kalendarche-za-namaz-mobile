import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SettingsProvider, useSettings } from './src/settings/SettingsContext';
import { Header } from './src/components/Header';
import { DayCarousel, DayCarouselHandle } from './src/components/DayCarousel';
import { CityPickerModal } from './src/components/CityPickerModal';
import { SettingsModal } from './src/components/SettingsModal';
import { TIME_TABLES } from './src/data/timeTable';

function Main() {
    const { isLoaded, theme, selectedCity } = useSettings();
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const [isCityPickerOpen, setCityPickerOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const carouselRef = useRef<DayCarouselHandle>(null);

    if (!isLoaded) {
        return (
            <View style={[styles.loading, { backgroundColor: theme.background }]}>
                <ActivityIndicator color={theme.primary} size="large" />
            </View>
        );
    }

    const cityTable = TIME_TABLES[selectedCity] ?? TIME_TABLES.sofia;

    return (
        <View style={[styles.app, { backgroundColor: theme.background }]}>
            <StatusBar style={theme.isDark ? 'light' : 'dark'} />
            <Header
                onOpenSettings={() => setSettingsOpen(true)}
                onOpenCityPicker={() => setCityPickerOpen(true)}
                showTodayButton={offset !== 0}
                onPressToday={() => carouselRef.current?.goToToday()}
            />
            <DayCarousel
                ref={carouselRef}
                cityTable={cityTable}
                onOffsetChange={setOffset}
            />
            <CityPickerModal
                visible={isCityPickerOpen}
                onClose={() => setCityPickerOpen(false)}
            />
            <SettingsModal
                visible={isSettingsOpen}
                onClose={() => setSettingsOpen(false)}
            />
        </View>
    );
}

export default function App() {
    return (
        <SafeAreaProvider>
            <SettingsProvider>
                <Main />
            </SettingsProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
