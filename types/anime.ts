export interface AnimeData {
    title: string;
    mal_url: string;
    resolution: string;
    descaleable: boolean;
    comparison: string;
    notes: string;
}

export type SeasonData = Record<string, AnimeData[]>;

export function sortSeasons(seasons: string[]): string[] {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Get current season
    const getCurrentSeason = (month: number) => {
        if (month < 3) return "Winter";
        if (month < 6) return "Spring";
        if (month < 9) return "Summer";
        return "Fall";
    };

    const currentSeason = getCurrentSeason(currentMonth);

    return seasons.sort((a, b) => {
        const [seasonA, yearA] = a.split(" ");
        const [seasonB, yearB] = b.split(" ");

        const yearDiff = parseInt(yearB) - parseInt(yearA);
        if (yearDiff !== 0) return yearDiff;

        const seasonOrder = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };
        return seasonOrder[seasonA as keyof typeof seasonOrder] - seasonOrder[seasonB as keyof typeof seasonOrder];
    });
}

export function getDefaultSeason(): string {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate next season
    let season: string;
    let year = currentYear;

    if (currentMonth < 3) {
        season = "Winter";
    } else if (currentMonth < 6) {
        season = "Spring";
    } else if (currentMonth < 9) {
        season = "Summer";
    } else {
        season = "Fall";
    }

    return `${season} ${year}`;
}

export async function getData(): Promise<SeasonData> {
    const response = await fetch("/api/seasons");
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
}
