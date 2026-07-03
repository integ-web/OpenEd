<div align="center">
  
# OpenEd Platform
**Source-backed Learning for Frontier Model Evaluation**

[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## 📌 Overview
**OpenEd** is an advanced, source-backed learning platform. It serves as the primary runtime environment for the **Frontier Model Evaluation** certification course, designed for safety researchers, engineers, and AI practitioners.

The platform provides an integrated learning experience featuring:
- **Bring Your Own Key (BYOK) AI Coach**: An intelligent, grounded tutor that natively interfaces with OpenAI, Anthropic, Google, and Ollama APIs entirely from the client side without storing keys on any central server.
- **Video Reference Player**: Contextually-aware media playback mapped strictly to evaluated source material.
- **Capstone Studio**: A dynamic environment to build risk dashboards, benchmark packets, and executive evidence libraries.

---

## 🏗️ Architecture & Tech Stack

### Core Technologies
- **Framework:** React 18
- **Routing:** React Router v6
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Radix UI Primitives (Shadcn UI)
- **Data Persistence:** Supabase (with automatic local storage fallback for mock deployments)

### Directory Structure
```
src/
├── app/                  # App shell, routing, and global providers
├── components/           # Shared UI primitives (Shadcn)
├── data/                 # Course content, video registries, BYOK storage
├── features/             # Feature modules
│   ├── auth/             # Authentication & user management
│   ├── capstone/         # Capstone assessment and evaluation reports
│   ├── course/           # The core Learner runtime & dashboard
│   ├── educator/         # Educator Studio (Content management)
│   ├── fme/              # FME specific domain models
│   ├── portfolio/        # User portfolios and achievements
│   └── tutor/            # BYOK and AI Tutor components
└── shared/               # Shared utilities and helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/OpenEd.git
   cd OpenEd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To build the application for deployment (e.g., GitHub Pages):
```bash
npm run build
```
This command compiles TypeScript and bundles the application into the `dist` directory.

---

## 🔐 Security & BYOK Architecture
A core feature of the OpenEd platform is the **Bring Your Own Key (BYOK)** integration.
- API keys are **never** transmitted to our backend.
- Keys are securely encrypted and stored locally via `localBrowserStorage`.
- All requests to LLM providers are made client-side.

---

## 📄 License
This project is licensed under the MIT License.
