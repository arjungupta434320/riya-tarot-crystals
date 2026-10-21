"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCrystalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Sacred Crystal Geometry (Central Icosahedron Gem)
    const crystalGeo = new THREE.IcosahedronGeometry(1.3, 0);
    
    // Luxury Amethyst & Champagne Gold Crystal Material
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x8a58de,
      emissive: 0x361669,
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.65,
      ior: 1.54, // Quartz refractive index
      thickness: 1.2,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    scene.add(crystalMesh);

    // Golden wireframe accent cage
    const wireGeo = new THREE.WireframeGeometry(crystalGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc9a24d,
      transparent: true,
      opacity: 0.45,
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    crystalMesh.add(wireframe);

    // 3. Floating Sacred Sparkle Particles
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      scales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc9a24d,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff6db, 2.5); // Champagne Gold highlight
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xcbb8f5, 2.0); // Soft Lavender rim light
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf4c6d0, 1.5, 6); // Rose Quartz core warmth
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    // 5. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow (lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate crystal gently
      crystalMesh.rotation.y = elapsedTime * 0.25 + targetX * 0.8;
      crystalMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2 + targetY * 0.6;
      crystalMesh.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Rotate particles slowly
      particleSystem.rotation.y = elapsedTime * 0.06;
      particleSystem.rotation.x = -elapsedTime * 0.03;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[360px] sm:min-h-[460px] relative flex items-center justify-center pointer-events-none"
    />
  );
}
