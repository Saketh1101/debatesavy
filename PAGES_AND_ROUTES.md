# DebateIQ - Application Pages & Routes Index

## 🌐 Frontend Pages

### Public Pages (No Authentication Required)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing page with hero, features, and CTA |
| `/auth/login` | `app/auth/login/page.tsx` | User login form |
| `/auth/register` | `app/auth/register/page.tsx` | User registration form |

### Protected Pages (Authentication Required)

| Route | File | Purpose |
|-------|------|---------|
| `/dashboard` | `app/dashboard/page.tsx` | User dashboard with debate overview |
| `/leaderboard` | `app/leaderboard/page.tsx` | Global leaderboard rankings |
| `/profile` | `app/profile/page.tsx` | User profile and account settings |
| `/debates/[debateId]` | `app/debates/[debateId]/page.tsx` | Individual debate interface *(placeholder)* |
| `/debates/create` | `app/debates/create/page.tsx` | Create new debate *(to be built)* |
| `/debates/join` | `app/debates/join/page.tsx` | Join existing debate *(to be built)* |

---

## 🔌 API Routes

### Authentication Endpoints

```
POST /api/auth/register
├── Request: { email, password, name }
├── Response: { user: { id, email, name }, token }
└── File: app/api/auth/register/route.ts

POST /api/auth/login
├── Request: { email, password }
├── Response: { user: { id, email, name, rating }, token }
└── File: app/api/auth/login/route.ts
```

### Debate Management

```
GET /api/debates
├── Auth Required: Yes
├── Response: Debate[]
└── File: app/api/debates/route.ts

POST /api/debates
├── Auth Required: Yes
├── Request: { title, topic, isPublic }
├── Response: Debate
└── File: app/api/debates/route.ts

GET /api/debates/[debateId]
├── Auth Required: Yes
├── Response: Debate (with participants and arguments)
└── File: app/api/debates/[debateId]/route.ts

PATCH /api/debates/[debateId]
├── Auth Required: Yes
├── Request: { status }
├── Response: Updated Debate
└── File: app/api/debates/[debateId]/route.ts
```

### Argument Submission

```
POST /api/arguments
├── Auth Required: Yes
├── Request: { debateId, content }
├── Response: Argument
└── File: app/api/arguments/route.ts
```

---

## 🧩 UI Components

### Reusable Components

| Component | File | Purpose |
|-----------|------|---------|
| `<Header>` | `app/components/Header.tsx` | Top navigation header |
| `<Navigation>` | `app/components/Navigation.tsx` | Navigation menu links |
| `<Button>` | `app/components/Button.tsx` | Reusable button (3 variants, 3 sizes) |

### Component Variants

**Button Component**
```tsx
// Variants: primary, secondary, outline
// Sizes: sm, md, lg

<Button variant="primary" size="lg">Start Debating</Button>
<Button variant="secondary" size="md">Join Debate</Button>
<Button variant="outline" size="sm">Learn More</Button>
```

---

## 📚 Utility Libraries

### Authentication (`lib/auth/jwt.ts`)
```typescript
// Token generation
generateToken(userId: string, email: string): string

// Token verification
verifyToken(token: string): { userId, email } | null

// Password hashing
hashPassword(password: string): Promise<string>

// Password verification
verifyPassword(password: string, hashedPassword: string): Promise<boolean>

// Extract token from header
extractTokenFromHeader(header: string): string | null
```

### Middleware (`lib/auth/middleware.ts`)
```typescript
// Protect routes
withAuth(request, handler): Promise<NextResponse>
```

### Database (`lib/prisma.ts`)
```typescript
// Prisma client singleton
export const prisma: PrismaClient
```

---

## 🗄️ Database Models

### User Model
```prisma
model User {
  id: String @id
  email: String @unique
  name: String
  password: String?
  image: String?
  rating: Int @default(1200)
  debates: Debate[]
  arguments: Argument[]
  ratingHistory: RatingHistory[]
  sessions: Session[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Debate Model
```prisma
model Debate {
  id: String @id
  title: String
  topic: String
  status: String // pending, active, completed
  participants: User[]
  arguments: Argument[]
  analysis: DebateAnalysis?
  isPublic: Boolean
  maxParticipants: Int
  roomCode: String?
  createdAt: DateTime
  startedAt: DateTime?
  endedAt: DateTime?
}
```

### Argument Model
```prisma
model Argument {
  id: String @id
  debateId: String
  userId: String
  content: String
  analysis: ArgumentAnalysis?
  timestamp: DateTime
}
```

### ArgumentAnalysis Model
```prisma
model ArgumentAnalysis {
  id: String @id
  argumentId: String @unique
  argumentStrength: Float // 0-100
  relevance: Float // 0-100
  evidenceUsage: Float // 0-100
  logicalConsistency: Float // 0-100
  engagement: Float // 0-100
  overallScore: Float // 0-100
  feedback: String?
  createdAt: DateTime
}
```

### RatingHistory Model
```prisma
model RatingHistory {
  id: String @id
  userId: String
  previousRating: Int
  newRating: Int
  change: Int
  reason: String // debate_win, debate_loss, debate_performance
  debateId: String?
  createdAt: DateTime
}
```

### DebateAnalysis Model
```prisma
model DebateAnalysis {
  id: String @id
  debateId: String @unique
  participantScores: Json // { userId: score }
  winner: String? // NULL (no winner concept)
  summary: String?
  insights: String?
  createdAt: DateTime
}
```

---

## 📋 Landing Page Sections

### Hero Section
- Headline: "Debate Smarter"
- Subheading with value proposition
- Benefits list (✓ checkmarks)
- CTA buttons (Start Debating, Learn More)
- Right panel with rating display mock

### Features Section
- **Debate**: Create/join rooms
- **AI Analysis**: Real-time feedback
- **Rating System**: ELO-based progression

### CTA Section
- Headline: "Ready to Improve Your Debate Skills?"
- Description
- Button: "Create Your Account"

### Footer
- Copyright

---

## 🎨 Design System

### Color Palette
- **Background**: `bg-slate-950` (dark)
- **Secondary**: `bg-slate-900`, `bg-slate-800`
- **Accent**: `bg-blue-500`, `text-blue-400`
- **Borders**: `border-slate-700`
- **Text**: `text-white`, `text-slate-300`, `text-slate-400`

### Typography
- **Headings**: Bold, `text-3xl` to `text-6xl`
- **Body**: Regular, `text-base` to `text-lg`
- **Labels**: Medium, `text-sm`

### Spacing
- Consistent padding and margins
- Max-width container: `max-w-7xl`
- Gap standards: `gap-4`, `gap-6`, `gap-8`, `gap-12`

### Components
- Rounded: `rounded-lg`, `rounded-xl`
- Borders: `border border-slate-700`
- Shadows: Gradient overlays instead of box-shadows

---

## 🚀 Page User Flows

### User Registration Flow
1. Visit `/` (landing)
2. Click "Get Started" → `/auth/register`
3. Fill form (name, email, password)
4. Submit → Create account & generate token
5. Redirect to `/dashboard`

### User Login Flow
1. Visit `/` (landing)
2. Click "Sign In" → `/auth/login`
3. Enter credentials
4. Submit → Verify & generate token
5. Redirect to `/dashboard`

### Debate Creation Flow
1. From `/dashboard`, click "Create New Debate"
2. Fill debate details (title, topic)
3. Create debate room
4. Share room code or link
5. Invite participants
6. Start debate → `/debates/[debateId]`

### Debate Participation Flow
1. View debate room → `/debates/[debateId]`
2. See other participants
3. Submit arguments in text field
4. See real-time updates
5. Debate ends (auto or manual)
6. View analytics

---

## 📊 State Management

### Client-Side (Ready for Zustand)
- User authentication state
- Current debate state
- Leaderboard data
- Notification state

### Server-Side (Prisma)
- User data
- Debate data
- Arguments
- Ratings and history

---

## 🔄 Data Flow

```
User Registration
└─ POST /api/auth/register
   └─ Hash password (bcryptjs)
   └─ Create user in DB
   └─ Generate JWT token
   └─ Return user + token

User Login
└─ POST /api/auth/login
   └─ Verify credentials
   └─ Generate JWT token
   └─ Return user + token

Create Debate
└─ POST /api/debates (Auth required)
   └─ Create debate in DB
   └─ Add user as participant
   └─ Generate room code
   └─ Return debate

Submit Argument
└─ POST /api/arguments (Auth required)
   └─ Create argument in DB
   └─ Link to debate
   └─ (Later) Send to OpenAI for analysis
   └─ Return argument with analysis

Update Debate Status
└─ PATCH /api/debates/[id] (Auth required)
   └─ Update status (pending → active → completed)
   └─ (Later) Trigger AI analysis
   └─ (Later) Calculate rating changes
   └─ Return updated debate
```

---

## ⚠️ Pages to Build Next

1. `/debates/create` - Debate creation form
2. `/debates/join` - Join debate room (search/discover)
3. `/debates/[debateId]` - Live debate interface
4. `/debates/[debateId]/analytics` - Post-debate analysis
5. Additional auth pages (password reset, profile edit)

---

## 📝 Testing Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Navigate to dashboard
- [ ] View leaderboard
- [ ] Access profile
- [ ] Logout
- [ ] Protected routes redirect to login
- [ ] API endpoints return correct data
- [ ] Database stores data correctly

---

This index covers all existing pages, routes, and components. Ready to build more! 🎯
