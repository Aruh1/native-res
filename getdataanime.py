import argparse
import json
import requests
from time import sleep
from pathlib import Path
from typing import List, Dict

def fetch_seasonal_anime(season: str, year: int) -> list:
    """Fetch seasonal anime from Jikan API."""
    url = f"https://api.jikan.moe/v4/seasons/{year}/{season}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")
    
    # Sleep to respect rate limiting
    sleep(1)
    
    return response.json()["data"]

def create_anime_entry(anime: dict) -> dict:
    """Create an anime entry in the required format."""
    return {
        "title": anime["title"],
        "mal_url": anime["url"],
        "resolution": "",
        "descaleable": False,
        "comparison": "",
        "notes": ""
    }

def remove_duplicates(anime_list: List[Dict]) -> List[Dict]:
    """Remove duplicate anime entries based on title."""
    seen_titles = set()
    unique_entries = []

    for anime in anime_list:
        if anime["title"] not in seen_titles:
            seen_titles.add(anime["title"])
            unique_entries.append(anime)
    
    return unique_entries

def main():
    parser = argparse.ArgumentParser(description="Fetch seasonal anime data from Jikan API")
    parser.add_argument("-s", "--season", required=True, choices=["winter", "spring", "summer", "fall"],
                      help="Season (winter, spring, summer, fall)")
    parser.add_argument("-y", "--year", required=True, type=int,
                      help="Year (e.g., 2025)")
    args = parser.parse_args()

    try:
        # Fetch data from Jikan API
        print(f"Fetching {args.season.title()} {args.year} anime...")
        anime_list = fetch_seasonal_anime(args.season.lower(), args.year)
        
        # Transform data to required format
        formatted_data = [create_anime_entry(anime) for anime in anime_list]
        
        # Remove duplicates
        unique_data = remove_duplicates(formatted_data)
        print(f"Removed {len(formatted_data) - len(unique_data)} duplicate entries")
        
        # Sort by title
        unique_data.sort(key=lambda x: x["title"])
        
        # Create data directory if it doesn't exist
        data_dir = Path("data")
        data_dir.mkdir(exist_ok=True)
        
        # Create output file
        output_file = data_dir / f"{args.season.title()}_{args.year}.json"
        
        with output_file.open("w", encoding="utf-8") as f:
            json.dump(unique_data, f, indent=2, ensure_ascii=False)
        
        print(f"Data saved to {output_file}")

    except Exception as e:
        print(f"Error: {str(e)}")
        return 1

if __name__ == "__main__":
    main()