# bhandarkar.me

Personal site of Pawan Bhandarkar. The hero is a live loss landscape: optimizers (Adam, SGD with momentum, RMSProp, and Lion when you drop your own) descend a WebGL point cloud, and the HUD reports their loss.

## Stack

- Next.js 16 (App Router, fully static) and React 19
- Tailwind CSS 4
- GSAP 3 (ScrollTrigger, SplitText) with Lenis smooth scrolling
- three.js for the hero
- MDX posts through `next-mdx-remote`, highlighted with Shiki

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/profile.ts` | All résumé content: roles, education, skills, projects. Keep it in sync with `public/files/Resume.pdf`. |
| `content/<slug>/content.mdx` | Blog posts. Frontmatter needs `title`, `abstract` and `publishedOn`. |
| `src/components/hero/landscape.ts` | The WebGL landscape and the optimizer simulation. |
| `src/components/sections/` | Home page sections. |
| `src/components/motion/` | Smooth scroll, cursor, magnetic hover, and declarative scroll reveals. |
| `src/app/opengraph-image.tsx` | Social preview image, rendered at build time. |

Server-rendered markup opts into scroll animations with attributes: `data-split="lines|words|chars"`, `data-fade`, `data-rule`, `data-count` and `data-scrub-words`. See `src/components/motion/Reveals.tsx`.

## Motion and accessibility

With `prefers-reduced-motion`, the site skips the preloader and smooth scrolling, renders the hero as a still frame, and shows every section in its final state.

## Short links

`/resume`, `/github` and `/linkedin` redirect (see `next.config.ts`). The résumé PDF links to them, so keep them working.
