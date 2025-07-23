import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { SeasonData } from "@/types/anime";

export async function GET() {
    try {
        const dataDirectory = path.join(process.cwd(), "data");
        const fileNames = await fs.readdir(dataDirectory);
        const jsonFiles = fileNames.filter(file => file.endsWith(".json"));

        const allData: SeasonData = {};

        for (const fileName of jsonFiles) {
            const filePath = path.join(dataDirectory, fileName);
            const fileContent = await fs.readFile(filePath, "utf8");
            const seasonName = fileName.replace(".json", "").replace(/_/g, " ");
            allData[seasonName] = JSON.parse(fileContent);
        }

        return NextResponse.json(allData);
    } catch (error) {
        console.error("[API Error]:", error);
        return NextResponse.json({ error: "Failed to fetch season data" }, { status: 500 });
    }
}
