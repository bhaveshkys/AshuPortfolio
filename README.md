# Ashutosh Portfolio

A portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Sanity CMS**.

---

## 🏗️ Architecture & How the Project Gets Data

This portfolio uses a hybrid approach: **Sanity CMS as the content source** with built-in **static fallback data**. If Sanity credentials are missing or the API request fails, the application gracefully renders local fallback data without breaking.

### 1. Embedded Sanity Studio
* Sanity Studio is embedded directly into the Next.js application at route [`/studio`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/studio).
* Studio configuration lives in [`sanity.config.ts`](file:///Users/bhaveshsharma/code/AshuPortfolio/sanity.config.ts) and is loaded via [`StudioClient.tsx`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/studio/[[...tool]]/StudioClient.tsx).

### 2. Sanity Client Initialization
* Configured in [`src/sanity/client.ts`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/sanity/client.ts) using `next-sanity`.
* Checks for project credentials in [`src/sanity/env.ts`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/sanity/env.ts):
  * `NEXT_PUBLIC_SANITY_PROJECT_ID`
  * `NEXT_PUBLIC_SANITY_DATASET`
  * `NEXT_PUBLIC_SANITY_API_VERSION`
* If these environment variables are absent, `client` evaluates to `null`.

### 3. GROQ Queries & Data Flow
All GROQ queries are centralized in [`src/sanity/queries.ts`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/sanity/queries.ts):
* `HOME_PAGE_QUERY` (`*[_type == "homePage"][0]`)
* `TREATMENTS_PAGE_QUERY` (`*[_type == "treatmentsPage"][0]`)
* `ABOUT_ME_PAGE_QUERY` (`*[_type == "aboutMePage"][0]`)
* `AI_WORKS_PAGE_QUERY` (`*[_type == "aiWorksPage"][0]`)
* `NON_TREATMENTS_PAGE_QUERY` (`*[_type == "nonTreatmentsPage"][0]`)

### 4. Fetching & Fallback Mechanism
* **Server Components:** Pages are Next.js async Server Components (e.g. [`src/app/page.tsx`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/page.tsx), [`src/app/ai-works/page.tsx`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/ai-works/page.tsx), [`src/app/treatments/page.tsx`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/treatments/page.tsx)).
* **Normalization & Fallbacks:** Each route has a data helper (like [`src/app/_home/data.ts`](file:///Users/bhaveshsharma/code/AshuPortfolio/src/app/_home/data.ts)) which calls `client.fetch()`. If `client` is null or the fetch fails, it merges or returns hardcoded fallback values from local `fallback.ts` files.
* **ISR (Incremental Static Regeneration):** The homepage sets `export const revalidate = 60;`, revalidating every 60 seconds.

---

## ⚙️ Environment Variables

Create or update a `.env.local` file in the root of the project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-06-01

# Optional: preview / read token for draft or private data
SANITY_API_READ_TOKEN=your_sanity_read_token
```

> **Note:** If no `.env.local` file is provided, the website will run using the embedded fallback portfolio content.

---

## 🚀 Installation & Running

### Prerequisites
* **Node.js**: v18.18.0 or newer (v20+ recommended)
* **Package manager**: `npm`, `yarn`, `pnpm`, or `bun`

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio website.

### 3. Open Sanity Studio to Edit Content

With the development server running, open:

👉 **[http://localhost:3000/studio](http://localhost:3000/studio)**

Sign in to your Sanity account (Google, GitHub, or Email) to add, modify, or publish content for:
* **Home Page**: Hero texts, collage images, showcase widgets, SEO metadata.
* **About Me**: Bio, video, heading, and description.
* **AI Works**: Prompt text, AI responses, project video & media links.
* **Treatments**: Project works, client names, cover & hover media.
* **Non-Treatments**: Non-treatment portfolio projects and media assets.

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js dev server on `http://localhost:3000` |
| `npm run build` | Builds the production bundle |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint checks |
