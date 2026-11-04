import { useEffect, useRef } from 'react';
import * as THREE from '../vendor/three.module.js';

export default function DimensionCanvas({ scrollProgress = 0, hoveredTech = null }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    monolithGroup: null,
    constellationGroup: null,
    portalGroup: null,
    particles: null,
    coreMesh: null,
    wireframeMesh: null,
    rings: [],
    constellationNodes: [],
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    scroll: 0,
    targetScroll: 0,
    clock: new THREE.Clock(),
    animId: null,
    isDestroyed: false,
    hoveredTech: null,
  });

  useEffect(() => {
    stateRef.current.hoveredTech = hoveredTech;
  }, [hoveredTech]);

  useEffect(() => {
    stateRef.current.targetScroll = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.055);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: window.devicePixelRatio < 2,
      alpha: true,
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x06161f, 1.8);
    scene.add(ambientLight);

    const vermilionLight = new THREE.PointLight(0xff2a2a, 4.5, 20);
    vermilionLight.position.set(5, 4, 3);
    scene.add(vermilionLight);

    const chartreuseLight = new THREE.PointLight(0xd4ff00, 3.8, 18);
    chartreuseLight.position.set(-5, -3, 3);
    scene.add(chartreuseLight);

    const copperLight = new THREE.PointLight(0xc87d55, 3.2, 16);
    copperLight.position.set(0, 5, -3);
    scene.add(copperLight);

    // ── MONOLITH ARCHITECTURE (World 00 & 01) ──
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // Liquid Deformed Central Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 4);
    // Save original position attribute for vertex ripple displacement
    const posAttr = coreGeometry.attributes.position;
    const originalPositions = new Float32Array(posAttr.array);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x09141c,
      emissive: 0x050a10,
      metalness: 0.92,
      roughness: 0.18,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    monolithGroup.add(coreMesh);

    // Outer Architectural Polyhedral Wireframe
    const wireGeometry = new THREE.IcosahedronGeometry(2.15, 1);
    const wireMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4ff00,
      emissive: 0x3d4a00,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
    const wireframeMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    monolithGroup.add(wireframeMesh);

    // Floating Gyroscopic Rings
    const rings = [];
    const ringConfigs = [
      { r: 2.7, tube: 0.02, color: 0xc87d55, rotSpeed: { x: 0.005, y: 0.012, z: 0.003 } },
      { r: 3.1, tube: 0.018, color: 0xff2a2a, rotSpeed: { x: -0.008, y: 0.006, z: 0.01 } },
      { r: 3.5, tube: 0.015, color: 0xd4ff00, rotSpeed: { x: 0.004, y: -0.009, z: 0.007 } },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.r, cfg.tube, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.45,
        metalness: 0.95,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.userData = { rotSpeed: cfg.rotSpeed };
      monolithGroup.add(ringMesh);
      rings.push(ringMesh);
    });

    // ── TECHNOLOGY CONSTELLATION (World 02) ──
    const constellationGroup = new THREE.Group();
    constellationGroup.position.set(0, -7.5, 0);
    scene.add(constellationGroup);

    const techNodesData = [
      { name: 'Flutter', pos: [0, 0, 0], size: 0.65, color: 0xd4ff00 },
      { name: 'Dart', pos: [-2.4, 1.2, 0.5], size: 0.45, color: 0xc87d55 },
      { name: 'Firebase', pos: [2.5, 1.0, -0.4], size: 0.45, color: 0xff2a2a },
      { name: 'Supabase', pos: [1.8, -1.8, 0.6], size: 0.42, color: 0xd4ff00 },
      { name: 'Clean Architecture', pos: [-1.9, -1.6, -0.5], size: 0.5, color: 0xf2f5fa },
      { name: 'REST APIs & Dio', pos: [-3.2, -0.2, 0.8], size: 0.4, color: 0xc87d55 },
      { name: 'State Management', pos: [3.1, -0.5, 0.5], size: 0.42, color: 0xd4ff00 },
      { name: 'Problem Solving', pos: [0.1, 2.6, -0.6], size: 0.5, color: 0xff2a2a },
    ];

    const constellationNodes = [];
    techNodesData.forEach((td) => {
      const nodeGeo = new THREE.OctahedronGeometry(td.size, 1);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: td.color,
        emissive: td.color,
        emissiveIntensity: 0.6,
        roughness: 0.15,
        metalness: 0.9,
        wireframe: false,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(td.pos[0], td.pos[1], td.pos[2]);
      nodeMesh.userData = { ...td, initialY: td.pos[1], rotX: Math.random() * 0.02, rotY: Math.random() * 0.02 };

      // Halo wireframe
      const haloGeo = new THREE.IcosahedronGeometry(td.size * 1.5, 0);
      const haloMat = new THREE.MeshBasicMaterial({ color: td.color, wireframe: true, transparent: true, opacity: 0.35 });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeMesh.add(haloMesh);

      constellationGroup.add(nodeMesh);
      constellationNodes.push(nodeMesh);
    });

    // Connecting Network Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xf2f5fa,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < constellationNodes.length; i++) {
      for (let j = i + 1; j < constellationNodes.length; j++) {
        const p1 = constellationNodes[i].position;
        const p2 = constellationNodes[j].position;
        if (p1.distanceTo(p2) < 4.2) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
          const line = new THREE.Line(lineGeo, lineMat);
          constellationGroup.add(line);
        }
      }
    }

    // ── DIMENSIONAL WARP PORTAL (World 06) ──
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, -25.5, 0);
    scene.add(portalGroup);

    for (let p = 0; p < 7; p++) {
      const pRadius = 1.2 + p * 0.45;
      const pGeo = new THREE.TorusGeometry(pRadius, 0.022, 16, 64);
      const pColor = p % 2 === 0 ? 0xff2a2a : 0xd4ff00;
      const pMat = new THREE.MeshStandardMaterial({
        color: pColor,
        emissive: pColor,
        emissiveIntensity: 0.6 + p * 0.08,
        metalness: 0.9,
        roughness: 0.1,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.z = -p * 0.6;
      pMesh.userData = { rotSpeed: 0.015 + p * 0.005 };
      portalGroup.add(pMesh);
    }

    // ── STARDUST PARTICLES ──
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cPalette = [
      new THREE.Color(0xd4ff00),
      new THREE.Color(0xff2a2a),
      new THREE.Color(0xc87d55),
      new THREE.Color(0xf2f5fa),
    ];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 28;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;

      const c = cPalette[Math.floor(Math.random() * cPalette.length)];
      particleColors[i * 3 + 0] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Save refs
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.renderer = renderer;
    stateRef.current.monolithGroup = monolithGroup;
    stateRef.current.constellationGroup = constellationGroup;
    stateRef.current.portalGroup = portalGroup;
    stateRef.current.particles = particles;
    stateRef.current.coreMesh = coreMesh;
    stateRef.current.wireframeMesh = wireframeMesh;
    stateRef.current.rings = rings;
    stateRef.current.constellationNodes = constellationNodes;

    // ── EVENT LISTENERS ──
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouse.targetX = nx;
      stateRef.current.mouse.targetY = ny;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // ── RENDER LOOP ──
    let isVisible = true;
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      if (stateRef.current.isDestroyed) return;
      stateRef.current.animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = stateRef.current.clock.getElapsedTime();

      // Smooth mouse interpolation (lerp)
      const m = stateRef.current.mouse;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      // Smooth scroll interpolation
      const currentScroll = stateRef.current.scroll;
      const targetScroll = stateRef.current.targetScroll;
      stateRef.current.scroll += (targetScroll - currentScroll) * 0.08;
      const scrollY = stateRef.current.scroll; // 0 to 1

      // ── PROCEDURAL MONOLITH DEFORMATION ──
      if (coreMesh) {
        const positions = coreMesh.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const u = i * 3;
          const ox = originalPositions[u];
          const oy = originalPositions[u + 1];
          const oz = originalPositions[u + 2];
          const wave = Math.sin(time * 2.2 + ox * 3.5 + oy * 2.5) * 0.07;
          positions.setXYZ(i, ox + ox * wave, oy + oy * wave, oz + oz * wave);
        }
        positions.needsUpdate = true;
        coreMesh.rotation.y = time * 0.22;
        coreMesh.rotation.x = time * 0.14;
      }

      if (wireframeMesh) {
        wireframeMesh.rotation.y = -time * 0.18;
        wireframeMesh.rotation.z = time * 0.12;
      }

      rings.forEach((r, idx) => {
        r.rotation.x += r.userData.rotSpeed.x;
        r.rotation.y += r.userData.rotSpeed.y;
        r.rotation.z += r.userData.rotSpeed.z;
        r.position.x = Math.sin(time + idx) * 0.08;
      });

      // Monolith responsive tilt
      monolithGroup.rotation.x = m.y * 0.25;
      monolithGroup.rotation.y = m.x * 0.35;

      // ── CONSTELLATION NODES ANIMATION ──
      const activeTech = stateRef.current.hoveredTech;
      constellationNodes.forEach((node) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.015;
        node.position.y = node.userData.initialY + Math.sin(time * 1.5 + node.position.x) * 0.12;

        const isHighlighted = activeTech && activeTech.toLowerCase() === node.userData.name.toLowerCase();
        const targetScale = isHighlighted ? 1.6 : 1.0;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        if (node.children[0]) {
          node.children[0].rotation.y = -time * 0.5;
          node.children[0].material.opacity = isHighlighted ? 0.9 : 0.35;
        }
      });
      constellationGroup.rotation.y = m.x * 0.2 + time * 0.04;

      // ── PORTAL VORTEX ANIMATION ──
      portalGroup.children.forEach((pMesh, idx) => {
        pMesh.rotation.z += pMesh.userData.rotSpeed;
        pMesh.position.z = -idx * 0.6 + Math.sin(time * 2 + idx) * 0.15;
      });
      portalGroup.rotation.x = Math.sin(time * 0.8) * 0.1 + m.y * 0.2;
      portalGroup.rotation.y = Math.cos(time * 0.8) * 0.1 + m.x * 0.2;

      // ── PARTICLES MOTION ──
      if (particles) {
        particles.rotation.y = time * 0.02 + m.x * 0.05;
        particles.rotation.x = -time * 0.015 + m.y * 0.05;
      }

      // ── CAMERA JOURNEY THROUGH WORLDS ──
      // Total travel distance across 6 worlds
      const targetCamY = -scrollY * 26.0;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;

      // Subtle lateral parallax based on cursor
      camera.position.x += (m.x * 0.7 - camera.position.x) * 0.05;
      camera.position.z = 7.5 + Math.sin(scrollY * Math.PI) * 1.5;

      // Dynamic lighting coordinates
      vermilionLight.position.x = 4 + m.x * 3;
      vermilionLight.position.y = camera.position.y + 3 + m.y * 2;
      chartreuseLight.position.x = -4 - m.x * 3;
      chartreuseLight.position.y = camera.position.y - 2 - m.y * 2;

      renderer.render(scene, camera);
    };

    animate();

    const state = stateRef.current;
    return () => {
      state.isDestroyed = true;
      if (state.animId) cancelAnimationFrame(state.animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      // Dispose Three.js WebGL resources cleanly
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((mat) => mat.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    />
  );
}
