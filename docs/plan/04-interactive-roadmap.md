# Interactive Experience Roadmap (post-launch)

v1 ships dependency-free interactions (SPEC §5). These heavier experiences land later as lazy Astro islands (`client:visible`), each on its own page or section so no global performance cost is paid.

| Experience | Approach | Notes |
|---|---|---|
| Photogrammetry / 3D model viewer | `<model-viewer>` web component, lazy island | GLB models of coral colonies; poster image fallback; `camera-controls`, `ar` optional |
| Reef digital-twin scene | Three.js island, code-split | Static render fallback image; interaction budget: pause offscreen |
| Interactive story maps | MapLibre GL JS island + scrollytelling (IntersectionObserver chapters) | Self-hosted style JSON; raster/vector tiles from research data; static map image fallback |
| Before/after satellite time series | Extend `CompareSlider` to N-step time scrubber | Data from Landsat/Sentinel exports |
| Publication network / data-art | SVG + d3-force (only d3 modules needed) | Prerender layout at build time where possible |
| Animated methods diagrams | Hand-authored SVG + CSS/SMIL-free animation | Keep in MDX via components |

Rules for every addition: reduced-motion static fallback, keyboard path, lazy load, measure Lighthouse before/after, no global bundle growth.
