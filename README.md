# AI Note Taking App

A modern note-taking application enhanced with AI capabilities for smart organization and content generation. Access the live demo at [https://ai-note-taking-app-rouge.vercel.app](https://ai-note-taking-app-rouge.vercel.app)

## Features

- 📝 Rich text note creation and editing
- 🤖 AI-powered note sumurization
- 🔍 Full-text search across all notes using Fuse.js
- 🌙 Dark/Light theme support
- 🔐 Secure authentication via Supabase
- 📱 Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 15
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI API
- **UI Components**: 
  - Radix UI
  - Tailwind CSS
  - Lucide React Icons
- **State Management**: React Hooks
- **Search**: Fuse.js

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/akilkhatri104/ai-note-taking-app.git
cd ai-note-taking-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
- Copy `.env-sample` to `.env`
- Fill in the required environment variables:
  - Database credentials
  - Supabase keys
  - OpenAI API key
  - Base URL

4. Set up the database:
```bash
pnpm migrate
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for easy deployment on Vercel. Simply connect your GitHub repository to Vercel and configure the environment variables in your Vercel project settings.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
