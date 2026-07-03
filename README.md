<div align="center">
  <img src="https://i.imgur.com/Kz3ZpD2.png" alt="OpenEd Banner" width="100%" />

  <h1>OpenEd 🎓</h1>
  <p><strong>The open-source, educator-first platform for interactive, frontier model evaluation courses.</strong></p>

  <p>
    <a href="https://integ-web.github.io/OpenEd/"><img src="https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react" alt="React 18" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF.svg?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Supabase-Ready-3ECF8E.svg?style=for-the-badge&logo=supabase" alt="Supabase Ready" />
  </p>
</div>

<br />

OpenEd is a free AI-native learning platform where courses are source-mapped, tutor-assisted, practice-driven, artifact-based, and proof-producing. It is designed to run completely offline via \`localStorage\` or seamlessly scale to a global cloud backend using Supabase.

---

## 🏗️ Architecture & Data Flow

Our **BYOK (Bring Your Own Key)** architecture guarantees that LLM inference keys never touch a centralized server. All AI completions are proxied directly from the client's browser to the inference provider (OpenAI, Anthropic, Gemini, OpenRouter), maintaining absolute security.

\`\`\`mermaid
graph TD
    subgraph Client [Browser Application]
        UI[React UI Components]
        Store[BYOK Store<br/>localStorage]
        Repo[Data Repositories]
    end

    subgraph Course Engine
        Hydrate[Static Hydration Engine]
        Data[TypeScript Course Data<br/>Phases, Lessons, Quizzes]
    end

    subgraph External LLM Providers
        OAI[OpenAI]
        Anth[Anthropic]
        Gem[Gemini]
        OR[OpenRouter]
    end

    subgraph Persistence Layer
        Local[Local Storage Fallback]
        Supabase[(Supabase PostgreSQL)]
    end

    UI <--> Repo
    UI <--> Store
    Store -.->|API Request| OAI
    Store -.->|API Request| Anth
    Store -.->|API Request| Gem
    Store -.->|API Request| OR

    Repo <--> Local
    Repo <-->|Optional Sync| Supabase
    Hydrate --> Data --> UI
\`\`\`

---

## 🌟 Core Modules

| Module | Description | Technical Implementation |
| :--- | :--- | :--- |
| **Educator Studio** | No-code visual editor for curriculum creation. | Nested tab-driven React forms mutating local Zustand stores. |
| **Proof Engine** | Evaluates student artifacts against strict rubrics. | Dual-tier submission system allowing grading overrides. |
| **BYOK Tutor** | Grounded AI coaching linked to course content. | Context-aware prompt injection wrapped in an async LLM fetch layer. |
| **Hydration Engine** | Parses raw markdown into structured datasets. | Custom node pipeline \`scripts/hydrate.js\` converting to static arrays. |

---

## 🚀 Getting Started

To spin up OpenEd locally, follow these straightforward steps:

### Prerequisites
Make sure you have Node.js (v22.x recommended) and npm installed.

### 1. Installation

Clone the repository and install the Vite ecosystem dependencies.

\`\`\`bash
git clone https://github.com/integ-web/OpenEd.git
cd OpenEd
npm install
\`\`\`

### 2. Local Development

Run the frontend server. OpenEd operates perfectly in a decentralized, local-storage-only mode right out of the box.

\`\`\`bash
npm run dev
\`\`\`

### 3. Deploying the Backend (Optional)

If you wish to utilize multi-tenant auth and cloud storage, push the database schema to your Supabase project:

\`\`\`bash
npx supabase link --project-ref <your-project-id>
npx supabase db push
\`\`\`

---

## 📝 Commands

<details>
<summary><strong>View all available npm scripts</strong></summary>

- \`npm run dev\` - Starts the local development server.
- \`npm run build\` - Compiles TypeScript and builds the Vite production bundle.
- \`npm run hydrate\` - Parses the \`Course_Content_Source_Compendium.md\` and maps it into \`src/data\` TypeScript constants.
- \`npm run deploy\` - Builds the source and publishes the \`dist/\` folder to the \`gh-pages\` branch.

</details>

---

<div align="center">
  <p>Built with ❤️ by the OpenEd Community</p>
</div>
