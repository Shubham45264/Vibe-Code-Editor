# 🚀 VibeCode Editor Deployment Guide

This guide covers the deployment of the Vibe Code Editor, split into backend (Database & AI) and frontend (Next.js App) sections.

---

## 🏗️ Phase 1: Backend Deployment (Infrastructure)

### 1. Database Setup (MongoDB)
Since your project uses Prisma with the `mongodb` provider, you need a hosted MongoDB instance.

- **Option A: MongoDB Atlas (Recommended)**
  - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  - Create a database user and whitelist `0.0.0.0/0` (or specific IPs) for network access.
  - Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/vibecode?retryWrites=true&w=majority`).
  - **Important**: Your `DATABASE_URL` must include the database name in the path.

### 2. AI Hosting (Ollama)
Your AI chat features run on Ollama. In production, you have two choices:

- **Option A: Self-Hosted on a VPS (DigitalOcean/Linode/AWS)**
  - Install Ollama on your server: `curl -fsSL https://ollama.com/install.sh`
  - Run the models: `ollama run gpt-oss`
  - Expose port `11434` and update your `NEXT_PUBLIC_AI_URL` (if added) or keep it internal to the server.
- **Option B: Replace with Cloud AI**
  - Modify `app/api/chat/route.ts` to use OpenAI, Anthropic, or Groq for easier cloud deployment without managing servers.

---

## 🌐 Phase 2: Frontend & API Deployment (Vercel & Render)

Both **Vercel** and **Render** can host your Next.js application, including the API routes. 

### 1. Preparing the Project
- Ensure your `next.config.ts` includes the WebContainer headers (already done ✅).
- Ensure all environment variables are correctly mapped.

---

### 🅰️ Deploying on Vercel (Recommended for Next.js)

1. **Connect GitHub**:
   - Go to [Vercel](https://vercel.com) and click **Add New > Project**.
   - Select your `Vibe-Code-Editor` repository.
2. **Config Environment Variables**:
   In the Vercel dashboard, add:
   - `DATABASE_URL`: Your MongoDB Atlas string.
   - `AUTH_SECRET`: Random string (e.g., `openssl rand -base64 32`).
   - `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET`: From your GitHub App.
   - `NEXT_PUBLIC_APP_URL`: Your Vercel URL.
3. **Build and Deploy**:
   - Click **Deploy**. Vercel will automatically detect Next.js and build it.
   - **Pro Tip**: Update your GitHub OAuth callback to `https://your-app.vercel.app/api/auth/callback/github`.

---

### 🅱️ Deploying on Render

1. **New Web Service**:
   - Sign in to [Render](https://render.com).
   - Click **New > Web Service** and connect your GitHub repo.
2. **Configuration**:
   - **Runtime**: `Node`.
   - **Build Command**: `npm install; npx prisma generate; npm run build`
   - **Start Command**: `npm run start`
3. **Environment Variables**:
   Click **Advanced > Add Environment Variable** and enter the same variables as above.
4. **Networking**:
   - Render automatically handles SSL and port mapping.
5. **Initial Deploy**:
   - Render will build the project and serve it. Note that the "Free" tier will put the service to sleep after inactivity.

---

## 🛠️ Post-Deployment Checklist
- [ ] Run `npx prisma db push` to ensure your production database matches the schema.
- [ ] Update your GitHub OAuth callback URL to your production domain.
- [ ] Test the Playground's WebContainer features (ensures headers are working).
- [ ] Verify AI Chat connectivity to your external Ollama server (or cloud provider).

---

Built with Vibe. Happy Coding! 🎨

