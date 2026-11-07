"use client";

import { useEffect, useMemo, useRef, useState, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useStudioStore } from "@/lib/studio-store";

/* ------------------------------------------------------------------ */
/* shared pointer state (window-level so overlays never block it)      */
/* ------------------------------------------------------------------ */
const pointer = { x: 0, y: 0 };

/* ------------------------------------------------------------------ */
/* The Q-CORE sculpture — brand object of QODIX                        */
/* A heavy black-chrome ring + diagonal tail (the Q mark), a glowing   */
/* core, broken orbital arcs, glass halo and floating fragments.       */
/* ------------------------------------------------------------------ */
function QCore() {
  const introDone = useStudioStore((s) => s.introDone);
  const reduced = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 768px)").matches,
    []
  );

  const root = useRef<THREE.Group>(null);
  const ringGroup = useRef<THREE.Group>(null);
  const arcA = useRef<THREE.Mesh>(null);
  const arcB = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const intro = useRef(0);

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#101010"),
        metalness: 1,
        roughness: 0.16,
        envMapIntensity: 1.5,
      }),
    []
  );
  const chromeSoft = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#161616"),
        metalness: 0.95,
        roughness: 0.3,
        envMapIntensity: 1.1,
      }),
    []
  );

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const vh = window.innerHeight || 1;
    const scrollP = Math.min(1, Math.max(0, window.scrollY / vh));

    // intro scale-in
    intro.current = THREE.MathUtils.damp(intro.current, introDone ? 1 : 0.001, 2.4, d);
    const s = intro.current * (1 - scrollP * 0.16);

    if (root.current) {
      root.current.scale.setScalar(Math.max(0.001, s));
      // scroll drift upward + gentle extra rotation
      root.current.position.y = scrollP * 1.7;
      // mouse parallax (disabled for reduced motion)
      const px = reduced ? 0 : pointer.x;
      const py = reduced ? 0 : pointer.y;
      root.current.rotation.x = THREE.MathUtils.damp(
        root.current.rotation.x,
        py * 0.16 + scrollP * 0.25,
        3,
        d
      );
      root.current.rotation.y = THREE.MathUtils.damp(
        root.current.rotation.y,
        px * 0.24 + scrollP * 0.6,
        3,
        d
      );
    }
    if (!reduced) {
      if (ringGroup.current) {
        ringGroup.current.rotation.y += d * 0.22;
        ringGroup.current.rotation.z = Math.sin(t * 0.4) * 0.06;
      }
      if (arcA.current) arcA.current.rotation.z += d * 0.12;
      if (arcB.current) arcB.current.rotation.z -= d * 0.09;
      if (halo.current) {
        halo.current.rotation.x = 1.1 + Math.sin(t * 0.3) * 0.12;
        halo.current.rotation.y -= d * 0.14;
      }
      if (core.current) {
        const pulse = 1 + Math.sin(t * 1.6) * 0.06;
        core.current.scale.setScalar(pulse);
      }
    }
  });

  const seg = isMobile ? 96 : 200;

  return (
    <group ref={root}>
      {/* main Q ring */}
      <group ref={ringGroup}>
        <mesh material={chrome} castShadow={false}>
          <torusGeometry args={[1.5, 0.42, isMobile ? 24 : 40, seg]} />
        </mesh>
        {/* the tail of the Q — diagonal capsule */}
        <mesh material={chrome} position={[1.5, -1.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <capsuleGeometry args={[0.22, 1.25, 8, isMobile ? 12 : 24]} />
        </mesh>
      </group>

      {/* luminous core */}
      <mesh ref={core} material={chromeSoft}>
        <icosahedronGeometry args={[0.34, 1]} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0, 0.4]} intensity={reduced ? 4 : 6} distance={5} decay={2} color="#ffffff" />

      {/* broken orbital arcs */}
      <mesh ref={arcA} rotation={[1.35, 0.3, 0]}>
        <torusGeometry args={[2.45, 0.012, 8, seg, Math.PI * 1.45]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh ref={arcB} rotation={[2.1, -0.5, 0.6]}>
        <torusGeometry args={[2.85, 0.008, 8, seg, Math.PI * 1.2]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* translucent glass halo */}
      <mesh ref={halo} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[2.05, 0.045, 12, isMobile ? 72 : 140]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.16}
          roughness={0.05}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* floating fragments */}
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh material={chromeSoft} position={[2.9, 1.1, -0.6]}>
          <octahedronGeometry args={[0.16, 0]} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.8}>
        <mesh material={chrome} position={[-2.7, -0.8, 0.4]}>
          <octahedronGeometry args={[0.11, 0]} />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh material={chromeSoft} position={[-1.9, 1.9, -0.9]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.6}>
        <mesh material={chrome} position={[2.2, -1.8, 0.2]}>
          <tetrahedronGeometry args={[0.15, 0]} />
        </mesh>
      </Float>

      {/* particles */}
      <Sparkles
        count={isMobile ? 60 : 130}
        scale={[7.5, 5, 5]}
        size={2.1}
        speed={reduced ? 0 : 0.24}
        opacity={0.5}
        color="#ffffff"
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* studio lighting — white light, silver reflections                   */
/* ------------------------------------------------------------------ */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.16} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-5, 2, -4]} intensity={0.85} color="#e5e5e5" />
      <directionalLight position={[0, -4, 2]} intensity={0.22} color="#b5b5b5" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={1.6} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[9, 5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.4} position={[-4.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} scale={[7, 1.6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.0} position={[4.5, -0.5, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[7, 1.2, 1]} color="#e5e5e5" />
        <Lightformer form="circle" intensity={1.2} position={[0, 0, -5]} scale={[3, 3, 1]} color="#8a8a8a" />
      </Environment>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* camera rig — object sits slightly right of center on desktop        */
/* ------------------------------------------------------------------ */
function SceneContent() {
  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 768px)").matches,
    []
  );
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (group.current) group.current.position.x = isMobile ? 0 : 1.7;
  }, [isMobile]);

  return (
    <group ref={group}>
      <QCore />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* WebGL error boundary → static fallback                              */
/* ------------------------------------------------------------------ */
class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function HeroScene() {
  const [active, setActive] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // window-level pointer tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // pause rendering when hero is offscreen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <SceneErrorBoundary>
        <Canvas
          frameloop={active ? (reduced ? "demand" : "always") : "never"}
          dpr={[1, 1.8]}
          camera={{ position: [0, 0, 8.2], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <SceneContent />
          <StudioLighting />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
