# GeoThreat MVP

## Overview

GeoThreat MVP is a demonstration framework for assessing and monitoring geopolitical threat levels across countries. This MVP includes a full-stack Next.js application with TypeScript, Prisma ORM, and a comprehensive data model.

**⚠️ IMPORTANT: All geopolitical scores in this application are SYNTHETIC DEMONSTRATION DATA for MVP testing purposes only.**

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- SQLite3 (usually pre-installed)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   The default SQLite configuration should work for local development.

3. **Set up the database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with demonstration data

## Project Structure

```
geothreat-mvp/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/                # API routes
│   │   ├── countries/          # Countries pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   ├── lib/                    # Utility functions and Prisma client
│   └── types/                  # TypeScript types
├── prisma/
│   ├── schema.prisma           # Prisma schema definition
│   └── seed.js                 # Database seed script
├── __tests__/                  # Test files
└── [config files]
```

## Database Schema

### Country
- `id` - Unique identifier
- `code` - ISO country code (e.g., 'US', 'RU')
- `name` - Country name
- `region` - Geographic region
- `threatAssessments` - Related threat assessments

### ThreatAssessment
- `id` - Unique identifier
- `countryId` - Foreign key to Country
- `threatLevel` - Numerical threat level (0-10)
- `score` - Normalized score (0-1)
- `metrics` - Related threat metrics
- `notes` - Assessment notes

### Metric
- `id` - Unique identifier
- `threatAssessmentId` - Foreign key to ThreatAssessment
- `category` - Metric category (e.g., 'Military Capability')
- `value` - Numerical value (0-10)
- `description` - Metric description
- `isDemo` - Flag indicating demonstration data

## API Endpoints

### Health Check
- `GET /api/health` - Application health status

### Countries
- `GET /api/countries` - List all countries with threat assessments
- `GET /api/countries/[code]` - Get specific country details

## Application Features

1. **Dashboard** - Overview of all countries and their threat levels
2. **Countries List** - Browse all countries in the database
3. **Country Details** - View detailed threat assessment and metrics
4. **API Routes** - RESTful API for programmatic access
5. **Type Safety** - Full TypeScript implementation
6. **Testing** - Jest and React Testing Library setup
7. **Linting** - ESLint configuration for code quality

## Demo Data

The database is seeded with demonstration threat assessments for:
- Russia (RU)
- China (CN)
- Iran (IR)
- North Korea (NK)
- United States (US)

All geopolitical scores are **synthetic and for demonstration purposes only**.

## Next Steps for MVP Enhancement

1. **Authentication** - Add user authentication and authorization
2. **Real Data Integration** - Replace demonstration data with verified sources
3. **Enhanced Analytics** - Add trend analysis and historical tracking
4. **Map Visualization** - Integrate geographic threat mapping
5. **Export Functionality** - Add PDF/CSV export features
6. **Performance Optimization** - Implement caching and pagination
7. **Deployment** - Deploy to production environment (Vercel, AWS, etc.)

## Development Notes

- The application uses SQLite for local development (easily switchable to PostgreSQL)
- All demonstration data is clearly marked with warnings
- The codebase is fully typed with TypeScript
- ESLint is configured to enforce code quality standards

## Testing

```bash
npm run test              # Run tests once
npm run test:watch       # Run tests in watch mode
```

## Troubleshooting

### Database connection errors
- Ensure `.env.local` has correct `DATABASE_URL`
- Run `npm run prisma:migrate` to initialize schema

### Port already in use
- Change port: `npm run dev -- -p 3001`

### TypeScript errors
- Run `npm run type-check` to verify types
- Ensure all dependencies are installed: `npm install`

## License

MIT
