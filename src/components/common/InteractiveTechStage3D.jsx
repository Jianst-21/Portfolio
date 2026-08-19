'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BRAND_FACES = [
  { src: '/assets/icons/react.svg',      color: '#61DAFB', name: 'React.js'    },
  { src: '/assets/icons/nodejs.svg',     color: '#339933', name: 'Node.js'     },
  { src: '/assets/icons/python.svg',     color: '#0277BD', name: 'Python'      },
  { src: '/assets/icons/nextjs.svg',     color: '#FFFFFF', name: 'Next.js'     },
  { src: '/assets/icons/tailwind.svg',   color: '#38BDF8', name: 'TailwindCSS' },
  { src: '/assets/icons/javascript.svg', color: '#F7DF1E', name: 'JavaScript'  },
];

const CANVAS_SIZE = 360;

/**
 * THREE.BoxGeometry face/material order: +X, -X, +Y, -Y, +Z, -Z
 * Camera at (0, 0, 4.2) looks toward -Z → +Z face (mat[4]) faces camera by default.
 *
 * Rotation needed to bring each face toward camera:
 *  +X React    → rotateY(-π/2)
 *  -X Node.js  → rotateY(+π/2)
 *  +Y Python   → rotateX(+π/2)  ← top tilts toward viewer
 *  -Y Next.js  → rotateX(-π/2)  ← bottom tilts toward viewer
 *  +Z Tailwind → no rotation
 *  -Z JS       → rotateY(π)
 */
const FACE_ROTATIONS = [
  { x:  0,            y: -Math.PI / 2 }, // 0 React
  { x:  0,            y:  Math.PI / 2 }, // 1 Node.js
  { x:  Math.PI / 2,  y:  0           }, // 2 Python
  { x: -Math.PI / 2,  y:  0           }, // 3 Next.js
  { x:  0,            y:  0           }, // 4 Tailwind
  { x:  0,            y:  Math.PI     }, // 5 JavaScript
];

/** Shortest angular delta, result in (−π, π] */
function shortAngle(from, to) {
  return ((to - from + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

export default function InteractiveTechStage3D({
  activeIndex  = 0,
  freeRotate   = false,   // true = free spin; false = face-lock to activeIndex
  activeColor  = '#61DAFB',
  size         = 360,
}) {
  const containerRef   = useRef(null);
  const cubeRef        = useRef(null);
  const activeIdxRef   = useRef(activeIndex);
  const freeRotateRef  = useRef(freeRotate);

  // Keep refs in sync with props (animation loop reads refs, not closure values)
  useEffect(() => { activeIdxRef.current  = activeIndex;  }, [activeIndex]);
  useEffect(() => { freeRotateRef.current = freeRotate;   }, [freeRotate]);

  // ── Three.js scene (mounted once) ──────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // Build textured materials (one per face)
    const materials = BRAND_FACES.map((item) => {
      const cvs = document.createElement('canvas');
      cvs.width = cvs.height = 512;
      const ctx = cvs.getContext('2d');

      const paint = (img) => {
        ctx.fillStyle = '#0C0F0C';
        ctx.fillRect(0, 0, 512, 512);

        ctx.fillStyle = '#11150F';
        ctx.fillRect(28, 28, 456, 456);

        ctx.strokeStyle = item.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.85;
        ctx.strokeRect(28, 28, 456, 456);
        ctx.globalAlpha = 1;

        if (img) {
          ctx.drawImage(img, 136, 136, 240, 240);
        }
      };

      paint(null);
      const texture = new THREE.CanvasTexture(cvs);
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
      const img = new Image();
      img.src = item.src;
      img.onload = () => { paint(img); texture.needsUpdate = true; };
      return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.2, metalness: 0.65 });
    });

    const geo  = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const cube = new THREE.Mesh(geo, materials);
    cubeRef.current = cube;
    scene.add(cube);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const sun = new THREE.DirectionalLight(0xffffff, 3.5);
    sun.position.set(4, 4, 5);
    scene.add(sun);
    const rim = new THREE.PointLight(0xffffff, 2, 10);
    rim.position.set(-3, -3, -2);
    scene.add(rim);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = performance.now() * 0.001;

      if (cubeRef.current) {
        if (freeRotateRef.current) {
          // ── Free rotation (intro mode) ──────────────────────────────────────
          cubeRef.current.rotation.y += 0.009;
          cubeRef.current.rotation.x += 0.005;
        } else {
          // ── Face-lock (detail mode) — lerp toward target face ───────────────
          const target = FACE_ROTATIONS[activeIdxRef.current % FACE_ROTATIONS.length];
          cubeRef.current.rotation.y += shortAngle(cubeRef.current.rotation.y, target.y) * 0.14;
          cubeRef.current.rotation.x += shortAngle(cubeRef.current.rotation.x, target.x) * 0.14;
        }

        // Gentle floating bob (always active)
        cubeRef.current.position.y = Math.sin(t * 2) * 0.04;
        cubeRef.current.rotation.z = Math.sin(t * 1.5) * 0.025;
      }

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
  }, [size]); // remount when size changes

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        ref={containerRef}
        style={{ width: size, height: size, position: 'relative', zIndex: 10, overflow: 'visible' }}
      />
    </div>
  );
}
