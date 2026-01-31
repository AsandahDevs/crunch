# Crunch - Movie Discovery App

A React + TypeScript + Vite application for discovering and searching movies using the TMDB API.

## Features

- 🎬 Browse popular movies
- 🔍 Search for movies by title
- ❤️ Mark favorite movies
- 📦 Dockerized for easy deployment
- 🔄 Hot reload development with Docker Compose Watch
- 🌍 Multi-environment support (dev, staging, production)

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Container**: Docker & Docker Compose
- **Linting**: ESLint
- **API**: TMDB (The Movie Database)

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- TMDB API Key (get it [here](https://www.themoviedb.org/settings/api))

### Local Development Setup

1. **Clone the repository**
```bash
git clone <your-repo>
cd crunch
```

2. **Copy environment template**
```bash
cp .env.example .env
```

3. **Add your TMDB API Key**
```bash
# Edit .env and add your key
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. **Install dependencies**
```bash
npm install
```

5. **Start development server**
```bash
npm run dev
```

Or with **Docker**:
```bash
docker compose watch
```

The app will be available at `http://localhost:5173`

## Docker Development

### Using Docker Compose Watch (Hot Reload)

This watches for file changes and automatically syncs them to the container:

```bash
docker compose watch
```

File changes will be reflected instantly without rebuilding.

### Environment-Specific Development

**Development** (default):
```bash
docker compose watch
```

**Staging**:
```bash
docker compose --env-file .env.staging watch
```

**Production build**:
```bash
docker compose run crunch-ui npm run build:production
```

## Available Scripts

```bash
# Development
npm run dev                 # Start Vite dev server
npm run dev:staging        # Start dev server in staging mode
npm run dev:production     # Start dev server in production mode

# Building
npm run build              # Build for production
npm run build:staging      # Build for staging
npm run build:production   # Build for production

# Other
npm run lint               # Run ESLint
npm run preview            # Preview production build
```

## Environment Configuration

### Local Development (`.env`)
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APP_ENV=development
```

### Staging (`.env.staging`)
```env
VITE_TMDB_API_KEY=your_staging_api_key_here
VITE_APP_ENV=staging
```

### Production (`.env.production`)
```env
VITE_TMDB_API_KEY=your_production_api_key_here
VITE_APP_ENV=production
```

**⚠️ IMPORTANT**: Never commit `.env` files! They are gitignored for security.

## Secrets & Security

### Local Development
- Environment variables stored in `.env` files (gitignored)
- Each developer should have their own API key
- Shared via secure channels (password manager, etc.)

### CI/CD Pipelines
- Use platform-specific secrets (GitHub Secrets, GitLab CI/CD Variables, etc.)
- Automatically injected during build/deploy

### Production Deployment

#### Option 1: Cloud Platform (Recommended)
For Vercel, Netlify, Railway, Render, etc.:
1. Go to project settings → Environment Variables
2. Add `VITE_TMDB_API_KEY` and `VITE_APP_ENV`
3. Deploy

#### Option 2: Docker Secrets
```bash
echo "your-api-key" | docker secret create tmdb_api_key -
docker stack deploy -c docker-compose.yml crunch
```

#### Option 3: AWS Secrets Manager
```bash
aws secretsmanager create-secret \
  --name crunch/tmdb-api-key \
  --secret-string "your-api-key"
```

#### Option 4: HashiCorp Vault
```bash
vault kv put secret/crunch/tmdb api_key="your-api-key"
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   └── MovieCard.tsx   # Movie card component
├── pages/              # Page components
│   └── Home.tsx        # Home page with search
├── services/           # API and utility services
│   └── api.ts          # TMDB API client
├── css/                # Stylesheets
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## API

This app uses the [TMDB API](https://developer.themoviedb.org/docs) for movie data.

### Available Endpoints

- **Get Popular Movies**: `/movie/popular`
- **Search Movies**: `/search/movie`

Get your free API key at: https://www.themoviedb.org/settings/api

## Docker Configuration

### Development Dockerfile (`Dockerfile.dev`)
- Uses Node 20 Alpine
- Includes development dependencies
- Runs Vite dev server with hot reload

### Production Dockerfile (`Dockerfile`)
- Multi-stage build
- Optimized for size
- Serves built app with http-server

### Docker Compose Services

**crunch-ui** (Development)
- Runs on port 5173
- Includes file watching with hot reload
- Mounts node_modules to avoid reinstalls

**crunch-prod** (Production)
- Runs on port 3000
- Uses Docker secrets for API key
- Available via `--profile prod`

## ESLint Configuration

The project uses ESLint with React-specific rules. To enable stricter type checking:

```js
// eslint.config.js
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
  },
])
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m 'Add my feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Open a Pull Request

## Security Best Practices

✅ **DO:**
- Use `.env.example` files as templates
- Store secrets in environment variables or secrets manager
- Use different API keys for each environment
- Rotate API keys periodically
- Audit secret access

❌ **DON'T:**
- Commit `.env` files to Git
- Share API keys in plain text
- Use the same key across all environments
- Store secrets in code or comments
- Pass secrets as command-line arguments

## Troubleshooting

### Docker won't display the container
- Rebuild the image: `docker compose build --no-cache`
- Clear Docker system: `docker system prune -f -a`

### Hot reload not working
- Ensure watch mode is running: `docker compose watch`
- Check file changes are synced to `/app/src`

### API key not loading
- Verify `.env` file exists and is in the project root
- Check `VITE_TMDB_API_KEY` is set
- Review browser console for environment variable logs

## License

MIT

## Support

For issues or questions:
1. Check [SETUP.md](SETUP.md) for detailed setup instructions
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guidelines
3. Open an issue on GitHub
