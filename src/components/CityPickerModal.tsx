import React from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { useSettings } from '../settings/SettingsContext';
import { CITIES } from '../data/cityNames';

type Props = {
    visible: boolean;
    onClose: () => void;
};

export function CityPickerModal({ visible, onClose }: Props) {
    const { theme, strings, language, selectedCity, setSelectedCity } =
        useSettings();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable
                    style={[styles.sheet, { backgroundColor: theme.surface }]}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: theme.text }]}>
                            {strings.cityPickerTitle}
                        </Text>
                        <Pressable onPress={onClose} hitSlop={10}>
                            <Text style={[styles.close, { color: theme.muted }]}>
                                ✕
                            </Text>
                        </Pressable>
                    </View>
                    <FlatList
                        data={CITIES}
                        keyExtractor={(item) => item.value}
                        style={styles.list}
                        renderItem={({ item }) => {
                            const isSelected = item.value === selectedCity;
                            return (
                                <Pressable
                                    style={[
                                        styles.row,
                                        {
                                            backgroundColor: isSelected
                                                ? `${theme.primary}1f`
                                                : 'transparent'
                                        }
                                    ]}
                                    onPress={() => {
                                        setSelectedCity(item.value);
                                        onClose();
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.rowText,
                                            {
                                                color: isSelected
                                                    ? theme.primaryDark
                                                    : theme.text,
                                                fontWeight: isSelected ? '700' : '400'
                                            }
                                        ]}
                                    >
                                        {language === 'en' ? item.en : item.bg}
                                    </Text>
                                </Pressable>
                            );
                        }}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    sheet: {
        maxHeight: '75%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 16,
        paddingBottom: 24
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 8
    },
    title: {
        fontSize: 17,
        fontWeight: '700'
    },
    close: {
        fontSize: 20
    },
    list: {
        paddingHorizontal: 10
    },
    row: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12
    },
    rowText: {
        fontSize: 16
    }
});
