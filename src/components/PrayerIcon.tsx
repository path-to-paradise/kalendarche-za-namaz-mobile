import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export type PrayerIconName =
    | 'fajr'
    | 'sunrise'
    | 'sun'
    | 'sunset'
    | 'isha'
    | 'duha'
    | 'tehajjud';

type Props = {
    name: PrayerIconName;
    color: string;
    size?: number;
};

// Ported directly from the web app's inline SVG path data (app.js
// PRAYER_ICONS) so the iconography matches exactly.
export function PrayerIcon({ name, color, size = 18 }: Props) {
    const common = {
        stroke: color,
        strokeWidth: 1.7,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        fill: 'none' as const
    };

    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            {name === 'fajr' && (
                <>
                    <Path
                        {...common}
                        d="M17.5 14.6A7 7 0 1 1 9 6a5.7 5.7 0 0 0 8.5 8.6Z"
                    />
                    <Path {...common} d="M19 3v2.4M17.8 4.2h2.4" />
                </>
            )}
            {name === 'sunrise' && (
                <>
                    <Path {...common} d="M3 17h18M8 17a4 4 0 0 1 8 0" />
                    <Path {...common} d="M12 3v3.4" />
                    <Path
                        {...common}
                        strokeWidth={1.5}
                        d="M9.5 8.4 12 6l2.5 2.4"
                    />
                </>
            )}
            {name === 'sun' && (
                <>
                    <Circle cx={12} cy={12} r={4} {...common} />
                    <Path
                        {...common}
                        d="M12 2.8v2.2M12 19v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.8 12h2.2M19 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
                    />
                </>
            )}
            {name === 'sunset' && (
                <>
                    <Path {...common} d="M3 17h18M8 17a4 4 0 0 1 8 0" />
                    <Path {...common} d="M12 3v3.4" />
                    <Path
                        {...common}
                        strokeWidth={1.5}
                        d="M9.5 5 12 7.4 14.5 5"
                    />
                </>
            )}
            {name === 'isha' && (
                <Path
                    {...common}
                    d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
                />
            )}
            {name === 'duha' && (
                <>
                    <Circle cx={12} cy={14} r={3.6} {...common} />
                    <Path
                        {...common}
                        d="M12 6v2M6.5 9.5l1.4 1.4M17.5 9.5l-1.4 1.4M3.5 17h17"
                    />
                </>
            )}
            {name === 'tehajjud' && (
                <>
                    <Path
                        {...common}
                        d="M16.5 14.3A6.6 6.6 0 1 1 9 4.3a5.4 5.4 0 0 0 7.5 10Z"
                    />
                    <Path
                        {...common}
                        d="M19 3v2.2M17.9 4.1h2.2M6 15.5v1.8M5.1 16.4h1.8"
                    />
                </>
            )}
        </Svg>
    );
}
