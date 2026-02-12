# DebateIQ - AI-Powered Debate Analysis Platform

A modern SaaS web application that leverages AI to analyze and evaluate debate arguments, helping users improve their critical thinking and argumentation skills.

## Features

- **User Authentication**: Secure email/password registration and login with JWT tokens
- **Debate Rooms**: Create or join debate rooms for structured discussions
- **AI Analysis**: Real-time argument analysis covering:
  - Argument strength
  - Relevance
  - Evidence usage
  - Logical consistency
  - Engagement with opposing points
- **ELO Rating System**: Fair skill-based rating system
- **Live Debate Interface**: Split-layout for real-time participation
- **Post-Debate Analytics**: Detailed feedback and metrics
- **Leaderboard**: Global ranking system
- **Responsive Design**: Mobile-friendly

## Tech Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- PostgreSQL with Prisma ORM
- JWT Authentication with bcryptjs
- OpenAI API ready
- Zustand for state management

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Install dependencies: `npm install`
2. Set up `.env.local` with database URL and API keys
3. Run migrations: `npx prisma migrate dev --name init`
4. Start dev server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

```
app/
├── api/ (authentication, debates, arguments)
├── components/ (Header, Navigation, Button)
├── auth/ (login, register pages)
├── dashboard/
├── leaderboard/
├── profile/
└── debates/

lib/
├── auth/ (JWT, middleware)
├── utils/
└── prisma.ts

prisma/
└── schema.prisma
```

## API Endpoints

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET/POST /api/debates` - Manage debates
- `POST /api/arguments` - Submit arguments

---

**DebateIQ** - Where Logic Meets Learning
