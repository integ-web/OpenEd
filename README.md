# OpenEd v1 🎓

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://integ-web.github.io/OpenEd/)

> The open-source, educator-first platform for interactive, frontier model evaluation courses. OpenEd is a free AI-native learning platform where courses are source-mapped, tutor-assisted, practice-driven, artifact-based, and proof-producing.

![OpenEd Application Overview](https://i.imgur.com/Kz3ZpD2.png)

OpenEd is a React-based Single Page Application (SPA) built for modern learning. It supports rich course hydration, dynamic AI coaching with Bring Your Own Key (BYOK) architecture, structured artifact-based assessment, and seamless transition from local-only storage to cloud-based persistence (via Supabase).

---

## 🌟 Key Features

### 1. Educator Studio & Proof Engine
* **No-Code Editor:** Educators can create structured courses using a nested, tabbed editor interface (Basics & Outcomes, Lessons & Mappings, Preview & QA).
* **Assessment Engine:** Integrated artifact review system that enables educators to easily evaluate submissions against predefined rubrics and issue portfolio-grade proofs.

### 2. Client-First BYOK Tutor Integration
* **100% Local Keys:** True privacy for learners. API keys for OpenAI, Anthropic, Gemini, and OpenRouter are stored *strictly* in the browser's `localStorage` or `sessionStorage`.
* **Grounded AI Coaching:** Context-aware prompts ensure the AI tutor coaches the student based solely on lesson parameters and mapped academic sources, rather than generic hallucination.

### 3. Graceful Persistence Layer
* **Offline First & Cloud Ready:** Features a dual-tiered repository system. Read and write operations flawlessly fall back to `localStorage` when offline or when a backend database isn't provisioned.
* **Instant Backend Upgrade:** Hooked up to Supabase SDK natively. Pushing the Postgres schema instantly promotes the application to a cloud-synced, multi-tenant app without rewriting a single line of React.

### 4. Course Hydration Engine
* Includes robust tooling to dynamically hydrate massive Markdown curriculum compendiums directly into strongly-typed TypeScript structures (Phases, Lessons, Quizzes, Rubrics).

---

## 🏗️ Technical Architecture

### Tech Stack
- **Framework:** React 18 & Vite
- **Routing:** React Router v6
- **Styling:** Vanilla CSS & Lucide Icons
- **Persistence:** LocalStorage API + Supabase JS SDK (PostgreSQL)
- **Tooling:** TypeScript

### Project Structure

\`\`\`text
src/
├── app/          # App shell, routing, and global providers
├── data/         # Statically hydrated curriculum models
├── features/     # Feature-sliced components (Auth, Courses, Educator, Learner, Tutor)
├── lib/          # Database repositories and Supabase initialization
└── shared/       # Shared UI components and hooks
\`\`\`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x
- npm

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/integ-web/OpenEd.git
   cd OpenEd
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

### Supabase Backend Deployment (Optional)

By default, the application runs perfectly using local browser storage. If you want to enable cloud-sync, true IAM role segregation, and database persistence, deploy the backend schema:

1. **Link your project:**
   \`\`\`bash
   npx supabase link --project-ref <your-project-id>
   \`\`\`
2. **Push the schema:**
   \`\`\`bash
   npx supabase db push
   \`\`\`

---

## 📝 Scripts

- \`npm run dev\` - Starts the local development server.
- \`npm run build\` - Compiles TypeScript and builds the Vite production bundle.
- \`npm run hydrate\` - Parses the course Markdown compendium and builds the \`src/data\` TypeScript constants.

---

## 🤝 Contributing
OpenEd is driven by the community. We welcome contributions to the Educator Studio, the Assessment Engine, and the core curriculum.
