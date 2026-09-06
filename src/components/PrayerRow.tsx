import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import { PrayerIcon, PrayerIconName } from './PrayerIcon';
import type { ResolvedTheme } from '../theme/colors';

type Props = {
    name: string;
    iconName: PrayerIconName;
    startTime?: string;
    endTime?: string;
    variant?: 'default' | 'voluntary' | 'jumah';
    isCurrent?: boolean;
    showNowBadge?: boolean;
    nowLabel: string;
    theme: ResolvedTheme;
};

function ArrowIcon({ color }: { color: string }) {
    return (
        <Svg width={10} height={10} viewBox="0 0 24 24">
            <Path
                d="M5 12h14M13 6l6 6-6 6"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
}

export function PrayerRow({
    name,
    iconName,
    startTime,
    endTime,
    variant = 'default',
    isCurrent = false,
    showNowBadge = false,
    nowLabel,
    theme
}: Props) {
    const isJumah = variant === 'jumah';
    const isVoluntary = variant === 'voluntary';
    const isNowVisible = showNowBadge && isCurrent;
    const hasRange = !!endTime && !!startTime?.includes(':');

    const textColor = isJumah ? '#fff' : theme.text;
    const iconColor = isJumah
        ? '#fff'
        : isVoluntary
        ? theme.muted
        : theme.primary;
    const iconBadgeBg = isJumah
        ? 'rgba(255,255,255,0.2)'
        : isVoluntary
        ? theme.surfaceAlt
        : `${theme.primary}1f`;

    const rowStyle = [
        styles.row,
        {
            backgroundColor: isVoluntary ? 'transparent' : theme.surfaceAlt,
            borderWidth: isVoluntary ? 1 : 0,
            borderColor: theme.border,
            borderStyle: isVoluntary ? ('dashed' as const) : ('solid' as const)
        },
        isCurrent && !isJumah && { borderWidth: 2, borderColor: theme.primary }
    ];

    const content = (
        <>
            {isNowVisible && (
                <View
                    style={[
                        styles.nowBadge,
                        {
                            backgroundColor: isJumah ? '#fff' : theme.primary
                        }
                    ]}
                >
                    <Text
                        style={[
                            styles.nowBadgeText,
                            { color: isJumah ? theme.primaryDark : '#fff' }
                        ]}
                    >
                        {nowLabel.toUpperCase()}
                    </Text>
                </View>
            )}
            <View style={styles.left}>
                <View style={[styles.iconBadge, { backgroundColor: iconBadgeBg }]}>
                    <PrayerIcon name={iconName} color={iconColor} size={16} />
                </View>
                <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
                    {name}
                </Text>
            </View>
            <View style={styles.right}>
                <Text style={[styles.time, { color: textColor }]} numberOfLines={1}>
                    {startTime ?? '—'}
                </Text>
                {hasRange && (
                    <View
                        style={[
                            styles.timeEndPill,
                            {
                                backgroundColor: isJumah
                                    ? 'rgba(255,255,255,0.22)'
                                    : `${theme.primary}1f`
                            }
                        ]}
                    >
                        <ArrowIcon color={isJumah ? '#fff' : theme.primaryDark} />
                        <Text
                            style={[
                                styles.timeEndText,
                                { color: isJumah ? '#fff' : theme.primaryDark }
                            ]}
                        >
                            {endTime}
                        </Text>
                    </View>
                )}
            </View>
        </>
    );

    if (isJumah) {
        return (
            <View style={styles.rowWrapper}>
                <LinearGradient
                    colors={[theme.primary, theme.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        styles.row,
                        isCurrent && styles.jumahCurrentRing
                    ]}
                >
                    {content}
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={styles.rowWrapper}>
            <View style={rowStyle}>{content}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    rowWrapper: {
        position: 'relative'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 14,
        paddingVertical: 7,
        paddingHorizontal: 14,
        gap: 10
    },
    jumahCurrentRing: {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.9)'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        flexShrink: 1
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    iconBadge: {
        width: 26,
        height: 26,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 15,
        fontWeight: '500',
        flexShrink: 1
    },
    time: {
        fontSize: 18,
        fontWeight: '700',
        fontVariant: ['tabular-nums']
    },
    timeEndPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginLeft: 6,
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 999
    },
    timeEndText: {
        fontSize: 11,
        fontWeight: '700'
    },
    nowBadge: {
        position: 'absolute',
        top: -9,
        left: 12,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 999,
        zIndex: 1
    },
    nowBadgeText: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.4
    }
});
