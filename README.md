# Axon Careers

A responsive marketing site for **Axon Careers** — nursing-career guidance for New Zealand & Australia. Built from the [Figma design](https://www.figma.com/design/swPmo9FgtTSiJOPHEzKJZv/AXON-Website?node-id=36-3) with React + Vite (no UI framework, hand-written CSS).

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## What's included

- **Pixel-faithful hero** matching the Figma — blue gradient over a city skyline, the नमस्ते greeting, headline, and the nurse-on-a-paper-plane artwork.
- **Sticky navbar** that turns solid on scroll, with a slide-in mobile drawer (hamburger) and backdrop.
- **Functional sections** so every nav link resolves: About, Our Services, Training (LMS), Blogs, Contact.
- **Working contact form** with client-side validation (name/email/phone/message), inline error messages, and a success state. No backend is wired up — submission is simulated in `Contact.jsx`; point `onSubmit` at your API to go live.
- **Scroll-reveal animations** via `IntersectionObserver` (`src/hooks/useReveal.js`), disabled under `prefers-reduced-motion`.
- **Fully responsive** down to small phones; breakpoints at 1024 / 860 / 560 px.

## Structure

```
src/
  components/   Navbar, Logo, Hero, About, Services, Training, Blogs, Contact, Footer
  hooks/        useReveal.js  (scroll-into-view animation)
  styles/       global.css    (design tokens, resets, buttons)
                app.css       (component + responsive styles)
  App.jsx
  main.jsx
public/assets/  bg-city.jpg, nurse-plane.png, logo-ring.svg, logo-a.svg
```

## Design tokens

Brand colours, the hero gradient, spacing, and the font stack live as CSS custom properties at the top of [`src/styles/global.css`](src/styles/global.css). Adjust them there to re-theme the whole site.
