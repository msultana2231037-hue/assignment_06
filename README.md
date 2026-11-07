# FitLog — Workout Library & Daily Planner

FitLog is a modern, responsive workout management web application built with **Next.js** and **Tailwind CSS**.

The application allows users to browse a workout library, view workout details, add workouts to their daily plan, save workouts for later, and track completed workouts.

---

## 🚀 Live Features

- 🏋️ Browse workout library
- 🔍 View detailed workout information
- ➕ Add workouts to today's plan
- 💾 Save workouts for later
- ✅ Mark workouts as completed
- 🗑️ Remove workouts from the plan
- 📊 View workout statistics
- 🔢 Maximum 5 workouts in today's plan
- 🔔 Toast notifications
- 💽 Data persistence using Local Storage
- 📱 Fully responsive design
- 🌙 Dark gym-focused UI
- 🔃 Sort workouts by:
  - Duration
  - Calories
  - Rating
- ⚡ Loading state while fetching workouts
- ❌ Error state when API request fails
- 📄 Custom 404 page

---

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Next.js Image
- Next.js App Router

### Data & Storage

- REST API
- Browser Local Storage

### Development Tools

- VS Code
- Git
- GitHub
- npm

---

## 📂 Project Structure

```text
fitlog/
│
├── src/app
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WorkoutCard.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   │
│   ├── context/
│   │   └── FitlogContext.tsx
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   ├── my-plan/
│   │   └── page.tsx
│   │
│   ├── workouts/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── types/
│   │   └── workout.ts
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
│
├── public/
│   ├── banner.png
│   └── ...
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md

