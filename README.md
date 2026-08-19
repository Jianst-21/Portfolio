# Jinst. — Personal Developer Portfolio

Sleek, modern, and highly interactive personal developer portfolio website showcasing projects, capabilities, and work experience. Built with Next.js, React, TailwindCSS, and Three.js.

 Live Preview: [jinst-portfolio.vercel.app](https://jianst-dev.vercel.app)

---

##  Key Features

- **Interactive 3D Tech Cube**: A custom Three.js WebGL rotation stage displaying the core technology pillars (Frontend, Backend, and AI) on a 3D rotating cube.
- **Live Website Preview Modal**: Renders live website deployments directly in-app inside a responsive glassmorphic iframe wrapper with device view toggle simulations (Desktop, Tablet, Mobile).
- **Interactive Developer Terminal**: A built-in command-line console simulating inputs such as `help`, `whoami`, `skills`, `experience`, `projects`, and `contact` with customized dynamic output.
- **Dark / Light Mode**: Seamless dark and light theme toggling powered by CSS variables.
- **Custom Dynamic Favicon**: Generates a dynamic favicon icon using the Next.js `next/og` ImageResponse API.
- **Responsive Layout**: Designed with a mobile-first approach, fully optimized for all breakpoints.

---

##  Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) / WebGL Canvas Custom Stage
- **Deployment**: [Vercel](https://vercel.com/)

---

##  Project Structure

```bash
├── public/                  # Static assets (images, CV PDF, project screenshots)
└── src/
    ├── app/                 # Next.js App Router (layout, globals, dynamic icon.js)
    ├── components/
    │   ├── common/          # Reusable UI elements (SectionHeader, RevealOnScroll)
    │   ├── layout/          # Page layout structures (Navbar)
    │   ├── projects/        # Project elements (ProjectCard, FilterChips)
    │   ├── experience/      # Timeline and tab switchers
    │   └── contact/         # Contact subcomponents (Terminal console, SocialLinks)
    ├── sections/            # Core section views (Hero, About, Skills, Projects, Experience, Contact)
    └── styles/              # Custom stylesheets and themes
```

---

##  Getting Started

To run the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Jianst-21/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

##  Contact & Socials

- **Email**: [ajinotosutrisno212@gmail.com](mailto:ajinotosutrisno212@gmail.com)
- **GitHub**: [@Jianst-21](https://github.com/Jianst-21)
- **LinkedIn**: [Aji Noto Sutrisno](https://www.linkedin.com/in/aji-noto-sutrisno-180946421/)
- **Instagram**: [@jiinst_](https://www.instagram.com/jiinst_/)
- **WhatsApp**: [+62 856-0445-8507](https://wa.me/6285604458507)

---

Developed by **Aji Noto Sutrisno**.
