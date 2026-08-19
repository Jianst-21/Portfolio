'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BRAND_FACES = [
  { src: '/assets/icons/react.svg',      color: '#61DAFB', name: 'React.js'    },
  { src: '/assets/icons/nodejs.svg',     color: '#22C55E', name: 'Node.js'     },
  { src: '/assets/icons/python.svg',     color: '#3776AB', name: 'Python'      },
  { src: '/assets/icons/nextjs.svg',     color: '#F5EFE6', name: 'Next.js'     },
  { src: '/assets/icons/tailwind.svg',   color: '#06B6D4', name: 'TailwindCSS' },
  { src: '/assets/icons/javascript.svg', color: '#F7DF1E', name: 'JavaScript'  },
];

const CANVAS_SIZE = 280;

/**
 * THREE.BoxGeometry face/material order: +X, -X, +Y, -Y, +Z, -Z
 * Camera at (0, 0, 4.4) → looks toward -Z → front face (+Z, mat[4]) is default visible.
 *
 * To bring each face toward camera (+Z direction):
 *  +X (React)    → rotateY(-π/2)  : right face swings to front
 *  -X (Node.js)  → rotateY(+π/2)  : left  face swings to front
 *  +Y (Python)   → rotateX(+π/2)  : top   face tilts down to front  ← CORRECTED
 *  -Y (Next.js)  → rotateX(-π/2)  : bottom face tilts up to front   ← CORRECTED
 *  +Z (Tailwind) → no rotation    : already facing camera
 *  -Z (JS)       → rotateY(±π)    : back  face flips to front
 */
const FACE_ROTATIONS = [
  { x:  0,             y: -Math.PI / 2 }, // 0 React
  { x:  0,             y:  Math.PI / 2 }, // 1 Node.js
  { x:  Math.PI / 2,   y:  0           }, // 2 Python   ← +π/2, not -π/2
  { x: -Math.PI / 2,   y:  0           }, // 3 Next.js  ← -π/2, not +π/2
  { x:  0,             y:  0           }, // 4 Tailwind
  { x:  0,             y:  Math.PI     }, // 5 JavaScript
];

/** Normalize angle to (−π, π] so lerp always takes the short path */
function shortAngle(from, to) {
  let d = ((to - from) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
  return d;
}

export default function GlobalTechCube3D({ activeIndex = 0 }) {
  const containerRef  = useRef(null);
  const activeIdxRef  = useRef(activeIndex);
  const stageRef      = useRef(1); // 1=hero, 2=about→skills travel, 3=skills center

  useEffect(() => { activeIdxRef.current = activeIndex; }, [activeIndex]);

  const [coords, setCoords] = useState({ x: 0, y: 0, scale: 0.75, opacity: 1 });

  useEffect(() => {
    const half = CANVAS_SIZE / 2;

    /** viewport-relative center of the DOM anchor (no scrollY offset needed for position:fixed) */
    const getAnchor = () => {
      const el = document.getElementById('skills-stage-anchor');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - half, y: r.top + r.height / 2 - half };
    };

    const onScroll = () => {
      const aboutEl  = document.getElementById('tentang');
      const skillsEl = document.getElementById('kemampuan');
      const wh = window.innerHeight;
      const ww = window.innerWidth;
      const sy = window.scrollY;

      const aboutTop  = aboutEl  ? aboutEl.offsetTop  : wh;
      const skillsTop = skillsEl ? skillsEl.offsetTop : wh * 2;
      // Skills section is 300vh tall; contact starts right after
      const skillsH   = skillsEl ? skillsEl.offsetHeight : wh * 3;
      const contactTop = skillsTop + skillsH;

      // Estimated center of skills sticky stage (fallback when anchor off-screen)
      const stickyTop    = 96;          // sticky top-24
      const stickyHeight = wh - 100;    // h-[calc(100vh-100px)]
      const stageCX = ww / 2 - half;
      const stageCY = stickyTop + (stickyHeight - 130) / 2 + 30 - half;

      let x, y, scale, opacity = 1;

      if (sy < aboutTop) {
        // ── Stage 1: Hero ──────────────────────────────────────────────────────
        stageRef.current = 1;
        const t = Math.max(0, Math.min(1, sy / (aboutTop || 1)));
        // Travel along right edge, descend from top-right to mid-right
        x     = (ww - 240) + (ww - half + 60 - (ww - 240)) * t;
        y     = 80        + (wh * 0.35 - 80)                * t;
        scale = 0.75;

      } else if (sy < skillsTop) {
        // ── Stage 2: About section → keep on far-right edge, then sweep to center ──
        stageRef.current = 2;
        const t = Math.max(0, Math.min(1, (sy - aboutTop) / (skillsTop - aboutTop || 1)));

        // Keep off the card grid (far-right) for first 65%, then swoop to center
        const edgeX = ww - half + 60;   // mostly off-screen right
        const edgeY = wh * 0.35 + wh * 0.5 * Math.min(t / 0.65, 1);

        const anchor = getAnchor(); // might be null here (skills not in view yet)
        const dstX = anchor ? anchor.x : stageCX;
        const dstY = anchor ? anchor.y : stageCY;

        const swoop = Math.max(0, (t - 0.55) / 0.45); // 0→1 in the last 45% of stage 2
        x     = edgeX + (dstX - edgeX) * swoop;
        y     = edgeY + (dstY - edgeY) * swoop;
        scale = 0.75 + swoop * 0.25;

      } else if (sy < contactTop) {
        // ── Stage 3: Inside skills section — face-locked at center stage ────────
        stageRef.current = 3;
        const anchor = getAnchor();
        x     = anchor ? anchor.x : stageCX;
        y     = anchor ? anchor.y : stageCY;
        scale = 1.0;

        // Fade out gently during the last 30% of the skills section scroll
        const fadeStart = skillsTop + skillsH * 0.75;
        const fadeEnd   = contactTop - wh;
        opacity = fadeEnd > fadeStart
          ? 1 - Math.max(0, Math.min(1, (sy - fadeStart) / (fadeEnd - fadeStart)))
          : 1;

      } else {
        // ── Stage 4: Contact section — hidden ────────────────────────────────────
        stageRef.current = 3;
        const anchor = getAnchor();
        x     = anchor ? anchor.x : stageCX;
        y     = anchor ? anchor.y : stageCY;
        scale = 1.0;
        opacity = 0;
      }

      // ── Safety clamp: never let the cube appear above the navbar ──────────────
      // Navbar height ≈ 64px (py-4 = 32px top+bottom + content ~32px).
      // The cube's top edge is at y. Clamp so cube stays below navbar.
      const NAVBAR_H = 64;
      y = Math.max(NAVBAR_H, y);

      setCoords({ x, y, scale, opacity });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [activeIndex]);

  // ── Three.js ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(CANVAS_SIZE, CANVAS_SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Build one textured material per face
    const materials = BRAND_FACES.map((item) => {
      const cvs = document.createElement('canvas');
      cvs.width = cvs.height = 512;
      const ctx = cvs.getContext('2d');

      const paint = (img) => {
        ctx.fillStyle = '#15100C';
        ctx.fillRect(0, 0, 512, 512);
        ctx.strokeStyle = '#3D2B1F'; ctx.lineWidth = 26;
        ctx.strokeRect(15, 15, 482, 482);
        ctx.strokeStyle = item.color; ctx.lineWidth = 12;
        ctx.strokeRect(40, 40, 432, 432);
        if (img) {
          const ico = document.createElement('canvas');
          ico.width = ico.height = 512;
          const ic = ico.getContext('2d');
          ic.drawImage(img, 136, 136, 240, 240);
          ic.globalCompositeOperation = 'source-in';
          ic.fillStyle = item.color; ic.fillRect(0, 0, 512, 512);
          ctx.drawImage(ico, 0, 0);
        }
      };

      paint(null);
      const tex = new THREE.CanvasTexture(cvs);
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const img = new Image();
      img.src = item.src;
      img.onload = () => { paint(img); tex.needsUpdate = true; };
      return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.2, metalness: 0.65 });
    });

    const geo  = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cube = new THREE.Mesh(geo, materials);
    scene.add(cube);

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const sun = new THREE.DirectionalLight(0xe8a33d, 3.5);
    sun.position.set(4, 4, 5); scene.add(sun);
    const rim = new THREE.PointLight(0xffffff, 2, 10);
    rim.position.set(-3, -3, -2); scene.add(rim);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = performance.now() * 0.001;

      if (stageRef.current <= 2) {
        // Traveling — free auto-rotation
        cube.rotation.y += 0.009;
        cube.rotation.x += 0.005;
      } else {
        // Stage 3 — face-lock to activeIndex via smooth shortest-path lerp
        const target = FACE_ROTATIONS[activeIdxRef.current % FACE_ROTATIONS.length];
        cube.rotation.y += shortAngle(cube.rotation.y, target.y) * 0.08;
        cube.rotation.x += shortAngle(cube.rotation.x, target.x) * 0.08;
      }

      // Gentle float
      cube.position.y = Math.sin(t * 2) * 0.04;
      cube.rotation.z = Math.sin(t * 1.5) * 0.025;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      if (containerRef.current) containerRef.current.innerHTML = '';
      geo.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none will-change-transform"
      style={{
        width:           CANVAS_SIZE,
        height:          CANVAS_SIZE,
        transform:       `translate3d(${coords.x}px, ${coords.y}px, 0) scale(${coords.scale})`,
        transformOrigin: 'top left',
        opacity:         coords.opacity,
        transition:      'opacity 0.25s ease',
        zIndex:          50,
        overflow:        'visible',
      }}
    >
      <div ref={containerRef} style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }} />
    </div>
  );
}
