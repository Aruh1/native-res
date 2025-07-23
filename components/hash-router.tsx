"use client";

import { useEffect } from "react";

export function HashRouter({ onHashChange }: { onHashChange: (hash: string) => void }) {
    useEffect(() => {
        // Handle initial hash
        const hash = window.location.hash.slice(1);
        if (hash) {
            const season = hash
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            onHashChange(season);
        }

        // Handle hash changes
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            const season = hash
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            onHashChange(season);
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [onHashChange]);

    return null;
}
