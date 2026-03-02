# PianoSynth2 Web App

A web interface for PianoSynth2 players — log in, manage your account, and purchase in-game items.

## Features
- User authentication (login & signup) via Supabase
- In-game item purchases and account management
- Responsive and interactive UI built with Next.js and Tailwind CSS
- Toast notifications for success/error messages

## Tech Stack
- Next.js 13 (App Router)
- React + TypeScript
- Supabase (Auth & Database)
- Tailwind CSS
- Framer Motion (animations)
- React Hot Toast (UI notifications)

## Getting Started


```bash
1. Clone the repository:
git clone https://github.com/KunMihai1/pianosynth2-web.git
cd pianosynth2-web

2. Install dependencies:
npm install
# or yarn

3. Create a .env.local file in the project root with your Supabase keys:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Run the development server:

npm run dev
# or yarn dev

5. Open http://localhost:3000 in your browser.


---

## **6️. Deployment**
```markdown
## Deployment

The app can be deployed to Vercel:

1. Connect your GitHub repo to Vercel.
2. Add environment variables in Vercel settings (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY).
3. Deploy the project — Vercel handles builds automatically.


## 7. Usage
- Visit the web app
- Sign up or log in
- Buy in-game items and manage your account
