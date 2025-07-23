# Anime Native Resolution Database

A web application that tracks and documents native resolutions of anime series. Built with Next.js and TypeScript.

## Features

- 🎯 Season-based organization
- 🔍 Easy-to-use interface
- 📱 Responsive design
- 🔗 Direct links to specific seasons
- 📊 Detailed resolution information
- 🎨 Clean and modern UI with shadcn/ui

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Aruh1/native-res.git
cd native-res
```

2. Install dependencies:

```
npm install
# or
yarn install
```

3. Run the development server:

```
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser.

### Project Structure

```
native-res/
├── app/                # Next.js app directory
├── components/         # React components
├── data/              # JSON data files for seasons
├── lib/               # Utility functions
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

### Usage

- Navigate between seasons using the tab interface
- Direct season access via URL hash (e.g., /#summer-2025)
- View detailed resolution information for each anime
- Check descaleability status and comparison links

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
