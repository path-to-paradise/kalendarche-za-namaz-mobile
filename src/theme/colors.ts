export type ColorThemeKey =
    | 'green'
    | 'blue'
    | 'teal'
    | 'purple'
    | 'amber'
    | 'rose'
    | 'indigo'
    | 'sky'
    | 'orange'
    | 'pink';

export const COLOR_THEMES: Record<
    ColorThemeKey,
    { primary: string; primaryDark: string }
> = {
    green: { primary: '#2e8b57', primaryDark: '#1f6b41' },
    blue: { primary: '#2563eb', primaryDark: '#1d4ed8' },
    teal: { primary: '#0d9488', primaryDark: '#0f766e' },
    purple: { primary: '#7c3aed', primaryDark: '#6d28d9' },
    amber: { primary: '#d97706', primaryDark: '#b45309' },
    rose: { primary: '#e11d48', primaryDark: '#be123c' },
    indigo: { primary: '#4f46e5', primaryDark: '#4338ca' },
    sky: { primary: '#0284c7', primaryDark: '#0369a1' },
    orange: { primary: '#ea580c', primaryDark: '#c2410c' },
    pink: { primary: '#db2777', primaryDark: '#be185d' }
};

export const COLOR_THEME_ORDER: ColorThemeKey[] = [
    'green',
    'blue',
    'teal',
    'purple',
    'amber',
    'rose',
    'indigo',
    'sky',
    'orange',
    'pink'
];

export type SurfacePalette = {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    muted: string;
    border: string;
};

export const LIGHT_SURFACE: SurfacePalette = {
    background: '#f2f4f3',
    surface: '#ffffff',
    surfaceAlt: '#f5f7f5',
    text: '#1a1f1c',
    muted: '#6b7280',
    border: '#e3e7e3'
};

export const DARK_SURFACE: SurfacePalette = {
    background: '#0c100e',
    surface: '#161e1a',
    surfaceAlt: '#232d28',
    text: '#f2f5f2',
    muted: '#94a49d',
    border: '#313d37'
};

export type ResolvedTheme = SurfacePalette & {
    primary: string;
    primaryDark: string;
    isDark: boolean;
};
