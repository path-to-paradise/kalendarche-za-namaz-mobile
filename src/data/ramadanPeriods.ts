export type RamadanPeriod = {
    start: Date;
    end: Date;
    eidStart: Date;
    eidDays: number;
};

// Ramadan and Eid al-Fitr (Рамазан Байрам) dates depend on moon sighting and
// are announced by the Bulgarian Grand Mufti's office (confirmed by the
// government) shortly before each year. Add next year's entry once it is
// officially announced — until then the app simply stops showing a
// Ramadan/Eid marker past the last known year.
export const RAMADAN_PERIODS: RamadanPeriod[] = [
    {
        // Ramadan 1446 AH — official Bulgarian dates
        start: new Date(2025, 2, 1),
        end: new Date(2025, 2, 30),
        eidStart: new Date(2025, 2, 31),
        eidDays: 2
    },
    {
        // Ramadan 1447 AH — official Bulgarian dates
        start: new Date(2026, 1, 18),
        end: new Date(2026, 2, 18),
        eidStart: new Date(2026, 2, 19),
        eidDays: 2
    },
    {
        // Ramadan 1448 AH — estimated, pending official confirmation
        start: new Date(2027, 1, 8),
        end: new Date(2027, 2, 9),
        eidStart: new Date(2027, 2, 10),
        eidDays: 2
    }
];
