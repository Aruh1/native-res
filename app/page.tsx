"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimeTable } from "@/components/anime-table";
import { getData, sortSeasons, getDefaultSeason, SeasonData } from "@/types/anime";
import { HashRouter } from "@/components/hash-router";
import { useState, useEffect } from "react";

export default function Home() {
    const [activeTab, setActiveTab] = useState<string>("");
    const [data, setData] = useState<SeasonData>({});
    const [sortedSeasons, setSortedSeasons] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await getData();
                const sorted = sortSeasons(Object.keys(fetchedData));
                setData(fetchedData);
                setSortedSeasons(sorted);

                // Set initial active tab from URL hash if present
                const hash = window.location.hash.slice(1);
                if (hash) {
                    const season = hash
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");
                    setActiveTab(season);
                } else {
                    // Set default season and update URL
                    const defaultSeason = getDefaultSeason();
                    const formattedSeason = defaultSeason.toLowerCase().replace(/\s+/g, "-");
                    window.location.hash = formattedSeason;
                    setActiveTab(defaultSeason);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    if (sortedSeasons.length === 0) {
        return (
            <div className="container mx-auto py-10">
                <h1 className="text-4xl font-bold mb-8">Anime Native Resolution Database</h1>
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Anime Native Resolution Database</h1>

            <HashRouter onHashChange={setActiveTab} />

            <Tabs
                value={activeTab || sortedSeasons[0]}
                className="space-y-4"
                onValueChange={value => {
                    const formattedSeason = value.toLowerCase().replace(/\s+/g, "-");
                    window.location.hash = formattedSeason;
                    setActiveTab(value);
                }}
            >
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {sortedSeasons.map(season => (
                        <TabsTrigger key={season} value={season} className="whitespace-nowrap">
                            {season}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {sortedSeasons.map(season => (
                    <TabsContent key={season} value={season}>
                        <AnimeTable animeList={data[season] || []} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
