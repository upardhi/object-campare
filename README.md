# object-campare

Vite + React + TypeScript starter with [framer-motion](https://motion.dev/).

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |

## Stack

- Vite 8
- React 19
- TypeScript 6
- framer-motion 14

## framer-motion

`src/App.tsx` is a working reference for the pieces you are most likely to
reach for:

- **Entrance animation** — `initial` / `animate` / `transition` on `motion.header`
- **Shared layout** — a `layoutId` pill that slides between tabs
- **Gestures** — `whileHover`, `whileTap`, and `drag` with `dragConstraints`
- **Enter / exit** — `AnimatePresence` with `mode="popLayout"` over a list
- **Accessibility** — `useReducedMotion` collapses durations when the OS asks
  for reduced motion

Note that framer-motion is now published as `motion` upstream; `framer-motion`
remains a maintained alias, so `import { motion } from 'framer-motion'` keeps
working.
