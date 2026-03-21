# 🎨 VibeCode Editor: Vibe Code With Intelligence

VibeCode Editor is a modern, high-performance, and intelligent web-based code editor designed to elevate your development workflow. Built with a focus on speed, intelligence, and a seamless "vibe," it combines the power of Monaco Editor with AI-driven insights and a full-featured in-browser runtime.

---

## 🚀 Features

### 💻 Intelligent Playground
Experience a full-featured code editor in your browser.
- **Monaco Editor Integration**: The core of VS Code, right in your browser.
- **In-Browser Runtime**: Powered by **WebContainers**, allowing you to run Node.js, install packages, and execute code without a local setup.
- **Dynamic File Explorer**: Easily manage your project structure, create folders, and navigate through files.
- **Real-time Synchronization**: Your progress is automatically saved to your dashboard.

### 🤖 AI Assistant (Enhanced)
Your personal co-pilot for coding, debugging, and review.
- **Context-Aware Chat**: Ask questions about your code directly in the sidebar.
- **Multi-Model Support**: Choose between different AI models (like GPT-OSS or CodeLlama) to suit your needs.
- **Smart suggestions**: Get code reviews, optimizations, and error fixes with a single click.
- **LaTeX & Markdown support**: Beautifully rendered math and documentation within the chat.

### 🛠️ Developer Tools
- **Integrated Terminal**: A full xterm-compatible terminal to interact with your WebContainer environment.
- **Project Dashboard**: Manage multiple projects, star your favorites, and track your recent work.
- **Robust Authentication**: Secure login and project state management using NextAuth.

---

## 📸 Screenshots

| Dashboard | AI Chat | Code Editor (Playground) |
| :---: | :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/600x400?text=Dashboard+Screenshot) | ![AI Chat Placeholder](https://via.placeholder.com/600x400?text=AI+Chat+Screenshot) | ![Playground Placeholder](https://via.placeholder.com/600x400?text=Playground+Screenshot) |


---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) via `@monaco-editor/react`
- **Runtime**: [@webcontainer/api](https://webcontainers.io/) for in-browser Node.js execution
- **Database**: [Prisma](https://www.prisma.io/) + PostgreSQL/MySQL
- **Auth**: [NextAuth.js (Auth.js)](https://authjs.dev/)
- **UI & Styling**: [TailwindCSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/) + Radix UI
- **Terminal**: [xterm.js](https://xtermjs.org/)

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- Local Ollama instance (for AI features)
- PostgreSQL or MySQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubham45264/Vibe-Code-Editor.git
   cd Vibe-Code-Editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file and add your credentials:
   ```env
   DATABASE_URL="..."
   AUTH_SECRET="..."
   GITHUB_ID="..."
   GITHUB_SECRET="..."
   # Add other necessary auth/db providers
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to start vibing with your code!

---

## 🔮 Future Scope

We are constantly evolving! Here’s what we’re working on next:

- [ ] **Monacopilot Integration**: Standardizing AI inline suggestions using Monacopilot.
- [ ] **Advanced Prompt Engineering**: Refining system prompts for more accurate and context-aware code suggestions.
- [ ] **Native Theme Support**: Customizing the editor's look and feel with a dedicated theme switcher.
- [ ] **GitHub Repo Integration**: Direct sync and management of GitHub repositories within the workspace.
- [ ] **Expanded Model Suite**: Seamless support for a wider array of local and cloud-based AI models.
- [ ] **UI/UX Polish**: Ongoing enhancements to make the interface even more premium and intuitive.

---

Built with ❤️ by [Shubham Jamdar](https://github.com/Shubham45264)
