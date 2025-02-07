# DevMate

DevMate is a web application designed to help developers create and manage their windsurfrules or cursorrules files. Built with Next.js 15 and modern web technologies, it provides an intuitive interface for defining tech stacks, project requirements, and generating properly formatted rules files.

## Features

- 🎯 Define tech stack and project requirements
- 📝 Add or remove rule sections dynamically
- 🔄 Generate properly formatted rules files
- 👀 Preview changes in real-time
- 🚀 Modern, responsive UI built with Shadcn UI

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Shadcn UI + Tailwind CSS
- Supabase (Auth & Database)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ChrisLally/DevMate.git
cd DevMate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Scripts

DevMate includes several development scripts to help streamline your workflow:

### GitHub Automation

Located in `scripts/github/`:

- `commit.js` - Create conventional commits
  ```bash
  ./scripts/github/commit.js
  ```

- `pull-request.js` - Create pull requests to main branch
  ```bash
  ./scripts/github/pull-request.js
  ```

## Project Structure

```
/
├── app/              # App router & API routes
├── components/       # React components
│   ├── server/      # Server Components
│   └── client/      # Client Components
├── actions/         # Server Actions
├── services/        # External integrations
├── types/          # Type definitions
├── utils/          # Utility functions
├── config/         # Environment & constants
├── scripts/        # Development scripts
└── wiki/           # Documentation
```

For detailed documentation about the project structure and development guidelines, see the [wiki](wiki/).

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Use `./scripts/github/commit.js` to create conventional commits
4. Use `./scripts/github/pull-request.js` to create a pull request

## Learn More

- [Project Wiki](wiki/) - Development guidelines and documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.io/docs)

## License

MIT License - see LICENSE for details
