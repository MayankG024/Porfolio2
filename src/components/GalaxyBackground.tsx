import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyProps {
  scrollY: number;
  mouseX: number;
  mouseY: number;
}

function GalaxyParticles({ scrollY, mouseX, mouseY }: GalaxyProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const CORE_COUNT    = 1400;
  const ARM_COUNT     = 11000;
  const SCATTER_COUNT = 6000;
  const TOTAL         = CORE_COUNT + ARM_COUNT + SCATTER_COUNT;
  const BRANCHES      = 3;
  const SPIN          = 1.3;

  const { positions, sizes, alphas } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const sizes     = new Float32Array(TOTAL);
    const alphas    = new Float32Array(TOTAL);
    let idx = 0;

    // Core — tightly packed, slightly brighter
    for (let i = 0; i < CORE_COUNT; i++) {
      const r     = Math.pow(Math.random(), 4) * 0.7;
      const theta = Math.random() * Math.PI * 2;
      positions[idx * 3]     = Math.cos(theta) * r;
      positions[idx * 3 + 1] = (Math.random() - 0.5) * 0.05;
      positions[idx * 3 + 2] = Math.sin(theta) * r;
      sizes[idx]  = Math.random() < 0.85 ? 1.0 : 1.5;
      alphas[idx] = 0.55 + Math.random() * 0.35;
      idx++;
    }

    // Spiral arms
    for (let i = 0; i < ARM_COUNT; i++) {
      const radius      = Math.pow(Math.random(), 0.45) * 6.5 + 0.4;
      const branch      = i % BRANCHES;
      const branchAngle = (branch / BRANCHES) * Math.PI * 2;
      const spinAngle   = radius * SPIN;
      const spread      = 0.08 + (radius / 6.5) * 0.28;

      const rx = (Math.random() - 0.5) * spread * radius;
      const rz = (Math.random() - 0.5) * spread * radius;
      const ry = (Math.random() - 0.5) * 0.04;

      positions[idx * 3]     = Math.cos(branchAngle + spinAngle) * radius + rx;
      positions[idx * 3 + 1] = ry;
      positions[idx * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;
      sizes[idx]  = Math.random() < 0.92 ? 1.0 : 1.5;
      const t     = Math.max(0, 1.0 - radius / 7.5);
      alphas[idx] = 0.08 + t * 0.35 + Math.random() * 0.12;
      idx++;
    }

    // Scattered outer stars
    for (let i = 0; i < SCATTER_COUNT; i++) {
      const r     = 3.5 + Math.random() * 9.0;
      const theta = Math.random() * Math.PI * 2;
      positions[idx * 3]     = Math.cos(theta) * r;
      positions[idx * 3 + 1] = (Math.random() - 0.5) * r * 0.12;
      positions[idx * 3 + 2] = Math.sin(theta) * r;
      sizes[idx]  = 1.0;
      alphas[idx] = 0.04 + Math.random() * 0.14;
      idx++;
    }

    return { positions, sizes, alphas };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: `
      attribute float aSize;
      attribute float aAlpha;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize;
        gl_Position  = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        vec2  uv   = gl_PointCoord - 0.5;
        float dist = length(uv);
        if (dist > 0.5) discard;
        gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
      }
    `,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.NormalBlending,
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes,     1));
    geo.setAttribute("aAlpha",   new THREE.BufferAttribute(alphas,    1));
    return geo;
  }, [positions, sizes, alphas]);

  const BASE_TILT = -0.32;
  // Track smooth targets separately for snappier feel
  const smoothRotY = useRef(0);
  const smoothRotX = useRef(BASE_TILT);
  let elapsed = 0;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed += delta;

    // ── Cursor interaction: pronounced tilt that follows the mouse ──
    // Range: ±0.28 rad on Y, ±0.18 rad on X — clearly visible
    const targetRotY = elapsed * 0.018 + mouseX * 0.28;
    const targetRotX = BASE_TILT + mouseY * 0.18;

    // Fast lerp so cursor feel is responsive (0.06 vs old 0.014)
    smoothRotY.current += (targetRotY - smoothRotY.current) * 0.06;
    smoothRotX.current += (targetRotX - smoothRotX.current) * 0.06;

    groupRef.current.rotation.y = smoothRotY.current;
    groupRef.current.rotation.x = smoothRotX.current;

    // ── Scroll: galaxy drifts down + zooms out noticeably ──
    const drift = scrollY * 0.00028;
    const targetY = -drift * 1.2;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;

    const targetScale = Math.max(0.80, 1.44 - drift * 0.18); // starts at 1.44 (+44% total)
    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.08;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.08;
    groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.08;
  });

  return (
    <group ref={groupRef} rotation={[BASE_TILT, 0, 0]} scale={[1.44, 1.44, 1.44]}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

function FallbackBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#090909", pointerEvents: "none" }} />
  );
}

export default function GalaxyBackground({ scrollY, mouseX, mouseY }: GalaxyProps) {
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl2") && !c.getContext("webgl")) setWebglFailed(true);
    } catch {
      setWebglFailed(true);
    }
  }, []);

  if (webglFailed) return <FallbackBackground />;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 58 }}
        gl={{ antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }}
        style={{ position: "absolute", inset: 0, background: "transparent" }}
        fallback={<FallbackBackground />}
      >
        <GalaxyParticles scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} />
      </Canvas>

      {/* Soft edge vignette — text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 60% at 60% 52%, transparent 25%, rgba(9,9,9,0.45) 65%, rgba(9,9,9,0.82) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
