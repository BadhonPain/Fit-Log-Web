
# FitLog

FitLog is a responsive workout library and session planner for building a focused gym session. Browse and compare lifts, save exercises for later, track completed sets with an integrated rest timer, and keep an at-a-glance record of today's training.

## Features

- **Workout library:** Browse exercise cards with images, muscle groups, equipment, duration, estimated calories, and rating.
- **Search, filter, and sort:** Search by exercise name, equipment, or muscle group; filter by category; sort by duration, calories, or rating.
- **Workout details:** Review descriptions, equipment, difficulty, sets, reps, stats, and step-by-step instructions.
- **Today's plan and saved lifts:** Add exercises to a daily plan or save them for later. The plan supports up to five unique lifts and shows live exercise, time, and estimated calorie totals.
- **Session progress:** Mark lifts complete, track completion progress, clear completed lifts, and copy a formatted session summary to the clipboard.
- **Gym rest timer:** Use 30-, 60-, 90-, or 120-second intervals with start, pause, reset, and set-tracking controls. The timer signals when rest ends.
- **Persistent plan:** Today's plan, completion status, and saved lifts are stored in browser `localStorage` and remain available after a reload on the same browser.
- **Responsive interface:** The workout library, detail pages, and plan adapt to mobile, tablet, and desktop screens. Live Plan and Saved counters, loading/error/empty states, action notifications, and a custom 404 page round out the experience.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/) and [DaisyUI 5](https://daisyui.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/) for action feedback
- Next.js Image and Font tooling

## Getting Started

The Next.js application is in the `fit-log-app/` directory. Install [Node.js](https://nodejs.org/) and npm, then run:

```bash
cd fit-log-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use FitLog. No environment variables are required for the current setup.

Available scripts:

```bash
npm run dev    # Start the local development server
npm run lint   # Run ESLint
npm run build  # Create a production build
npm run start  # Serve the production build locally
```

## Workout Data API

The app requests workout data from the FitLog API and uses its Next.js API routes as a fallback if the upstream service is unavailable. The fallback routes also serve a local workout dataset.

| Purpose | Endpoint |
| --- | --- |
| Workout library | `https://api.abcz.workers.dev/api/fitlog` |
| Single workout | `https://api.abcz.workers.dev/api/fitlog/:id` |
| App library fallback | `/api/fitlog` |
| App single-workout fallback | `/api/fitlog/:id` |

## Using FitLog

1. Browse the library, search or filter for a lift, and sort the results to compare exercises.
2. Open a workout to read its instructions, then add it to today's plan or save it for later.
3. Use the rest timer on the workout detail page to manage intervals and advance through sets.
4. Open **My Plan** to mark lifts complete and follow session progress. Copy a session summary or clear completed lifts when you're done.

Plan and saved data is held in the current browser's local storage; it is not synced between browsers or devices.

## Deployment

Deploy the Next.js app with a platform that supports Next.js, such as Vercel. Since the application lives in `fit-log-app/`, configure that directory as the project root when deploying from this repository. The production build can be checked locally with `npm run build`.

