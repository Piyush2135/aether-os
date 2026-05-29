# Aether OS

Aether OS is a futuristic desktop-inspired AI operating system interface built with Next.js, TypeScript, and Gemini AI.

The project explores the idea of an adaptive neural operating environment where users can interact with draggable applications, system-style interfaces, and an integrated AI assistant called **Aether Neural Core**.

Unlike a traditional chatbot UI, Aether OS focuses on creating an immersive operating-system-like experience with modular windows, intelligent interactions, and a cinematic but practical AI layer.

---

# Preview

## Features

* Futuristic desktop-style operating system UI
* Draggable and layered application windows
* Dynamic window focus and z-index management
* Minimize / restore / maximize window behavior
* Integrated Gemini-powered AI assistant
* Adaptive Neural Core personality system
* Responsive and immersive interface design
* Streaming AI response architecture
* Modern full-stack Next.js architecture
* Secure environment-based API handling

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* TailwindCSS

## AI & Backend

* Gemini API
* Next.js API Routes
* Server-side AI request handling

## Architecture

* App Router architecture
* Modular component system
* Custom window manager
* AI routing layer
* Environment-secured configuration

---

# Project Structure

```bash
app/
 ├── api/
 │    └── gemini/
 │         └── route.ts

components/
 ├── apps/
 ├── Window.tsx
 ├── WindowLayer.tsx
 ├── Dock.tsx
 └── useWindowManager.ts

lib/
 └── gemini.ts
```

---

# Core Systems

## Window Manager

A custom desktop-style window management system supporting:

* dynamic window instances
* focus tracking
* z-index ordering
* minimize / restore workflows
* maximize handling

---

## Aether Neural Core

Aether Neural Core is an adaptive AI assistant integrated directly into the operating environment.

The system is designed to:

* assist with development tasks
* help debug problems
* explain technical concepts
* simulate an intelligent operating system layer
* maintain a futuristic but restrained personality

The AI architecture prioritizes:

1. utility
2. contextual awareness
3. adaptive tone
4. immersive interaction

---

# AI System Philosophy

Aether OS intentionally avoids becoming a generic chatbot clone.

The project experiments with:

* AI-assisted operating environments
* contextual interaction systems
* adaptive AI personalities
* immersive engineering workflows
* futuristic UX concepts

The focus is not only aesthetics, but also practical interaction design.

---

# Challenges Faced

Some of the key engineering challenges during development included:

* stabilizing Gemini API integration
* handling AI streaming reliability
* managing React window synchronization
* reducing repetitive AI personality behavior
* balancing cinematic UX with practical usability
* designing scalable component architecture

---

# Getting Started

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd aether-os
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-1.5-flash
```

---

## 4. Run the development server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# Future Roadmap

Planned future improvements include:

* persistent memory system
* voice interaction
* multi-model AI routing
* local AI fallback support
* plugin ecosystem
* advanced task orchestration
* AI workflow automation
* filesystem-aware interactions

---

# Development Notes

This project was developed as an exploration into modern AI-assisted operating system experiences and interactive AI environments.

The implementation combines:

* custom frontend engineering
* AI-assisted development workflows
* prompt engineering
* iterative architecture refinement
* modern full-stack web technologies

---

# Screenshots



## Desktop Interface

![Desktop UI](./screenshots/desktop-ui.png)

## Neural Core

![Neural Core](./screenshots/neural-core.png)

## Window Management System

![Window System](./screenshots/window-system.png)

* desktop interface
* Neural Core
* window system
* multitasking environment

---

# License

MIT License

---

# Author

Piyush
IIT Roorkee — Mechanical Engineering

Exploring:

* AI systems
* futuristic interfaces
* machine learning
* intelligent workflow environments
