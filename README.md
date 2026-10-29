# Ashrith H N — Interactive 3D Developer Portfolio

> **Live Site:** [ashrithhn.vercel.app](https://ashrithhn.vercel.app/)  
> **Author:** Ashrith H N — CSE Graduate & Tech Enthusiast (B.E. in CSE, VTU · CGPA 8.86) · CodeNimbus Solutions Front-End Intern · Target AWS Solutions Architect.

A full 3D interactive portfolio built with **React, Three.js, React Three Fiber, GSAP ScrollTrigger, Lenis Smooth Scroll, and Draco 3D Decoders**.

---

## 🎮 3D Features & Capabilities

- **Interactive 3D Character & Desk Scene**:
  - Fully rigged 3D character working at a developer workstation with multi-monitor setup.
  - **Dynamic Head & Bone Tracking**: The character's head (`spine006`) tracks the visitor's cursor across the screen in real-time.
  - **GSAP ScrollTrigger Camera Choreography**:
    - **Hero (`/`)**: Front-facing 3D character workstation with interactive floating intro text.
    - **About**: Camera zooms and pivots laterally (`z: 22, y: 0.7`) to frame personal details and metrics.
    - **What I Do**: Extreme camera zoom into the workstation (`z: 75, y: 8.4`) as the monitor screen powers on and flickers real-time emissive lighting onto the character.
    - **Career & Work**: Camera shifts to lateral profile tracking the character working while project showcase cards scroll horizontally.
- **Interactive 3D Tech Stack**: Inverted pyramid with official devicons.
- **Decrypted 3D Model**: Includes the 1.5MB rigged `character.glb` model with Draco compression and HDR environment reflection map (`char_enviorment.hdr`).
- **Interactive Chess Mini-App (`/play`)**: Built-in chess engine powered by `chess.js` and Stockfish.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **3D & Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`, DracoLoader, RGBELoader
- **Animation & Physics**: GSAP, ScrollTrigger, Lenis Smooth Scroll, `@react-three/rapier`
- **Styling**: Modern CSS Modules, Custom Cursor, Responsive Design

---

## 🚀 Running Locally

1. **Development Server**:
   ```bash
   npm run dev
   ```
2. **Production Build**:
   ```bash
   npm run build
   ```
3. **Local Preview**:
   ```bash
   npm run preview
   ```

---

## 🌐 GitHub Pages Deployment

The repository is pre-configured to deploy automatically:
- **Direct Root Serving**: Root `index.html` and `assets/` are pre-compiled and ready for instant deployment via GitHub Pages.
- **Automated Workflow**: `.github/workflows/deploy.yml` automatically builds and deploys on every push to `main`.
