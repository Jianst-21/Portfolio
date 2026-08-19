'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingCube3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Purge any existing canvas node
    containerRef.current.innerHTML = '';

    const width = 135;
    const height = 135;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 3.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    containerRef.current.appendChild(renderer.domElement);

    // 6 Official Brand SVG Icon Paths
    const brandFaces = [
      { src: '/assets/icons/react.svg', color: '#61DAFB' },
      { src: '/assets/icons/nodejs.svg', color: '#22C55E' },
      { src: '/assets/icons/python.svg', color: '#3776AB' },
      { src: '/assets/icons/nextjs.svg', color: '#F5EFE6' },
      { src: '/assets/icons/tailwind.svg', color: '#06B6D4' },
      { src: '/assets/icons/javascript.svg', color: '#F7DF1E' },
    ];

    // Solid Materials (#15100C Card Face, #3D2B1F Outer Frame, Amber Inner Hairline)
    const materials = brandFaces.map((item) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      const drawFace = (img = null) => {
        // Solid Dark Card Background (#15100C)
        ctx.fillStyle = '#15100C';
        ctx.fillRect(0, 0, 512, 512);

        // Outer Dark Brown Border Frame - #3D2B1F
        ctx.strokeStyle = '#3D2B1F';
        ctx.lineWidth = 26;
        ctx.strokeRect(15, 15, 482, 482);

        // Inner Theme Amber Accent Hairline - #E8A33D
        ctx.strokeStyle = '#E8A33D';
        ctx.lineWidth = 10;
        ctx.strokeRect(38, 38, 436, 436);

        if (img) {
          // Offscreen Canvas to Tint SVG Icon Vector to Theme Amber #E8A33D
          const iconCanvas = document.createElement('canvas');
          iconCanvas.width = 512;
          iconCanvas.height = 512;
          const iconCtx = iconCanvas.getContext('2d');

          iconCtx.drawImage(img, 136, 136, 240, 240);
          iconCtx.globalCompositeOperation = 'source-in';
          iconCtx.fillStyle = '#E8A33D'; // Theme Amber Accent
          iconCtx.fillRect(0, 0, 512, 512);

          ctx.drawImage(iconCanvas, 0, 0);
        }
      };

      drawFace();

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);

      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        drawFace(img);
        texture.needsUpdate = true;
      };

      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2,
        metalness: 0.65,
      });
    });

    // Solid Box Geometry
    const geometry = new THREE.BoxGeometry(1.35, 1.35, 1.35);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Directional & Point Lights for Glossy Specular Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xe8a33d, 3.5);
    mainLight.position.set(4, 4, 5);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0xffffff, 2, 10);
    backLight.position.set(-3, -3, -2);
    scene.add(backLight);

    // Continuous 3D Auto-Rotation Loop
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      cube.rotation.x += 0.007;
      cube.rotation.y += 0.011;
      cube.position.y = Math.sin(time * 2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative group cursor-pointer pointer-events-auto flex items-center justify-center">
      {/* 3D Cube Canvas matching Card styling (Bigger 135px size) */}
      <div ref={containerRef} className="w-[135px] h-[135px] relative z-10" />
    </div>
  );
}
