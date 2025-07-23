import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimeData } from "@/types/anime";
import ReactMarkdown from 'react-markdown';

interface AnimeTableProps {
    animeList: AnimeData[];
}

export function AnimeTable({ animeList }: AnimeTableProps) {
    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted border-b">
                            <th className="text-left p-4 font-medium">Title</th>
                            <th className="text-left p-4 font-medium">Resolution/Kernel</th>
                            <th className="text-left p-4 font-medium w-24">Descaleable(?)</th>
                            <th className="text-left p-4 font-medium w-28">Comparison</th>
                            <th className="text-left p-4 font-medium">Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animeList.map((anime, idx) => (
                            <tr
                                key={`${anime.title}-${idx}`}
                                className={cn(
                                    "border-b transition-colors hover:bg-muted/50",
                                    idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-muted/50"
                                )}
                            >
                                <td className="p-4">
                                    <Link href={anime.mal_url} target="_blank" className="text-primary hover:underline">
                                        {anime.title}
                                    </Link>
                                </td>
                                <td className="p-4 font-mono">{anime.resolution}</td>
                                <td className="p-4">
                                    <span
                                        className={cn(
                                            "px-2 py-1 rounded-full text-xs font-medium",
                                            anime.descaleable
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                        )}
                                    >
                                        {anime.descaleable ? "Iya" : "Tidak"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {anime.comparison && (
                                        <Link
                                            href={anime.comparison}
                                            target="_blank"
                                            className="text-primary hover:underline"
                                        >
                                            View
                                        </Link>
                                    )}
                                </td>
                                <td className="p-4 text-muted-foreground prose dark:prose-invert max-w-none prose-sm">
                                    <ReactMarkdown>{anime.notes}</ReactMarkdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}