import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyProps {
  scrollY: number;
  mouseX: number;
  mouseY: number;
  theme: "dark" | "light";
}

/* ════════════════════════════════════════════════════════════════════
   Galaxy particles (unchanged physics / animation)
   ════════════════════════════════════════════════════════════════════ */
function GalaxyParticles({ scrollY, mouseX, mouseY, theme }: GalaxyProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const CORE_COUNT    = 1400;
  const ARM_COUNT     = 14000;   // +3000 for denser arms
  const SCATTER_COUNT = 9000;    // +3000 for more background stars
  const TOTAL         = CORE_COUNT + ARM_COUNT + SCATTER_COUNT;
  const BRANCHES      = 3;
  const SPIN          = 1.3;

  const { positions, sizes, alphas } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const sizes     = new Float32Array(TOTAL);
    const alphas    = new Float32Array(TOTAL);
    let idx = 0;

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
    uniforms: {
      uColorR: { value: 1.0 },
      uColorG: { value: 1.0 },
      uColorB: { value: 1.0 },
      uSizeMult: { value: 1.3 },
    },
    vertexShader: `
      uniform float uSizeMult;
      attribute float aSize;
      attribute float aAlpha;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uSizeMult;
        gl_Position  = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform float uColorR;
      uniform float uColorG;
      uniform float uColorB;
      varying float vAlpha;
      void main() {
        vec2  uv   = gl_PointCoord - 0.5;
        float dist = length(uv);
        if (dist > 0.5) discard;
        gl_FragColor = vec4(uColorR, uColorG, uColorB, vAlpha);
      }
    `,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.NormalBlending,
  }), []);

  useEffect(() => {
    if (material.uniforms) {
      const isLight = theme === "light";
      material.uniforms.uColorR.value = isLight ? 0.0 : 1.0;
      material.uniforms.uColorG.value = isLight ? 0.0 : 1.0;
      material.uniforms.uColorB.value = isLight ? 0.0 : 1.0;
      material.uniforms.uSizeMult.value = isLight ? 2.2 : 1.3; // bigger dots in light
    }
  }, [theme, material]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(sizes,     1));
    geo.setAttribute("aAlpha",   new THREE.BufferAttribute(alphas,    1));
    return geo;
  }, [positions, sizes, alphas]);

  const BASE_TILT = -0.32;
  const smoothRotY = useRef(0);
  const smoothRotX = useRef(BASE_TILT);
  let elapsed = 0;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed += delta;

    const targetRotY = elapsed * 0.018 + mouseX * 0.28;
    const targetRotX = BASE_TILT + mouseY * 0.18;

    smoothRotY.current += (targetRotY - smoothRotY.current) * 0.06;
    smoothRotX.current += (targetRotX - smoothRotX.current) * 0.06;

    groupRef.current.rotation.y = smoothRotY.current;
    groupRef.current.rotation.x = smoothRotX.current;

    const drift = scrollY * 0.00028;
    const targetY = -drift * 1.2;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;

    const targetScale = Math.max(0.80, 1.44 - drift * 0.18);
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

/* ════════════════════════════════════════════════════════════════════
   Shooting Stars
   ────────────────────────────────────────────────────────────────────
   Pool of 5 stars. Each is a short fading trail (line) that streaks
   across the scene.  Spawned:
     • Automatically every ~2-5 s (random)
     • When the cursor sits still for ≥150 ms
   ════════════════════════════════════════════════════════════════════ */
const POOL_SIZE  = 5;
const TRAIL_PTS  = 14;         // number of trail segments per star
const TRAIL_STEP = 0.06;       // spacing between trail points

interface Star {
  active: boolean;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
}

function ShootingStars({ mouseX, mouseY, theme }: { mouseX: number; mouseY: number; theme: "dark" | "light" }) {
  const groupRef = useRef<THREE.Group>(null!);

  /* ── Per-star refs ── */
  const starsRef = useRef<Star[]>([]);
  const linesRef = useRef<THREE.Line[]>([]);
  const geoRef   = useRef<THREE.BufferGeometry[]>([]);

  /* ── Timing refs ── */
  const nextAutoSpawn = useRef(3 + Math.random() * 3);
  const lastMouse     = useRef({ x: mouseX, y: mouseY });
  const mouseIdleTime = useRef(0);

  /* ── Shared trail material (created once) ── */
  const trailMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uColorR: { value: 1.0 },
      uColorG: { value: 1.0 },
      uColorB: { value: 1.0 },
    },
    vertexShader: `
      attribute float aOpacity;
      varying float vOp;
      void main() {
        vOp = aOpacity;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uColorR;
      uniform float uColorG;
      uniform float uColorB;
      varying float vOp;
      void main() {
        gl_FragColor = vec4(uColorR, uColorG, uColorB, vOp);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  /* theme-reactive color */
  useEffect(() => {
    const isLight = theme === "light";
    trailMaterial.uniforms.uColorR.value = isLight ? 0.0 : 1.0;
    trailMaterial.uniforms.uColorG.value = isLight ? 0.0 : 1.0;
    trailMaterial.uniforms.uColorB.value = isLight ? 0.0 : 1.0;
    // In light mode use normal blending so black streaks show on white bg
    trailMaterial.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
  }, [theme, trailMaterial]);

  /* ── Build pool (runs once) ── */
  useEffect(() => {
    const stars: Star[] = [];
    const lines: THREE.Line[] = [];
    const geos:  THREE.BufferGeometry[] = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const geo = new THREE.BufferGeometry();
      const posArr = new Float32Array(TRAIL_PTS * 3);
      const opArr  = new Float32Array(TRAIL_PTS);
      geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      geo.setAttribute("aOpacity", new THREE.BufferAttribute(opArr, 1));

      const line = new THREE.Line(geo, trailMaterial);
      line.frustumCulled = false;
      line.visible = false;

      stars.push({
        active: false,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 0,
      });
      geos.push(geo);
      lines.push(line);

      groupRef.current?.add(line);
    }

    starsRef.current = stars;
    linesRef.current = lines;
    geoRef.current   = geos;

    return () => {
      geos.forEach((g) => g.dispose());
    };
  }, [trailMaterial]);

  /* ── Spawn a single star in a random direction ── */
  const spawn = useCallback(() => {
    const pool = starsRef.current;
    // find an inactive slot
    let slot = -1;
    for (let i = 0; i < pool.length; i++) {
      if (!pool[i].active) { slot = i; break; }
    }
    if (slot === -1) return; // all busy

    const s = pool[slot];
    // Random origin — biased toward top-left region
    const angle = Math.random() * Math.PI * 2;
    const dist  = 1.5 + Math.random() * 4.5;
    s.pos.set(
      Math.cos(angle) * dist,
      (Math.random() - 0.5) * 1.5,
      Math.sin(angle) * dist,
    );

    // Direction: 70% chance top-left → bottom-right, 30% random
    // Top-left → bottom-right in 3D scene = positive X, slight negative Y, positive Z
    const speed = 1.75 + Math.random() * 0.5; // halved from 3.5–7.5
    let vAngle: number;
    if (Math.random() < 0.70) {
      // Base angle for top-left→bottom-right is ~π*0.25 (45°), with ±30° spread
      vAngle = Math.PI * 0.25 + (Math.random() - 0.5) * (Math.PI / 3);
    } else {
      vAngle = Math.random() * Math.PI * 2;
    }
    s.vel.set(
      Math.cos(vAngle) * speed,
      (Math.random() - 0.5) * speed * 0.2 - 0.1, // slight downward bias
      Math.sin(vAngle) * speed,
    );

    s.life    = 0;
    s.maxLife = 0.4 + Math.random() * 0.5;
    s.active  = true;
    linesRef.current[slot].visible = true;
  }, []);

  /* ── Per-frame update ── */
  useFrame((_, delta) => {
    /* — auto spawn timer — */
    nextAutoSpawn.current -= delta;
    if (nextAutoSpawn.current <= 0) {
      spawn();
      nextAutoSpawn.current = 3 + Math.random() * 3;
    }

    /* — cursor idle detection (150 ms) — */
    const dx = mouseX - lastMouse.current.x;
    const dy = mouseY - lastMouse.current.y;
    if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
      mouseIdleTime.current += delta;
      if (mouseIdleTime.current >= 0.15) {
        spawn();
        mouseIdleTime.current = -1.5; // cooldown so it doesn't fire every frame
      }
    } else {
      mouseIdleTime.current = 0;
    }
    lastMouse.current.x = mouseX;
    lastMouse.current.y = mouseY;

    /* — update active stars — */
    const pool = starsRef.current;
    for (let i = 0; i < pool.length; i++) {
      const s = pool[i];
      if (!s.active) continue;

      s.life += delta;
      if (s.life >= s.maxLife) {
        s.active = false;
        linesRef.current[i].visible = false;
        continue;
      }

      // advance head
      s.pos.x += s.vel.x * delta;
      s.pos.y += s.vel.y * delta;
      s.pos.z += s.vel.z * delta;

      // build trail behind head
      const geo = geoRef.current[i];
      const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
      const opAttr  = geo.getAttribute("aOpacity") as THREE.BufferAttribute;
      const pArr = posAttr.array as Float32Array;
      const oArr = opAttr.array as Float32Array;

      const lifeRatio  = s.life / s.maxLife;
      // fade in quickly, then fade out
      const envelope = lifeRatio < 0.15
        ? lifeRatio / 0.15
        : 1.0 - Math.pow((lifeRatio - 0.15) / 0.85, 2);

      const velNorm = s.vel.clone().normalize();

      for (let p = 0; p < TRAIL_PTS; p++) {
        const t = p / (TRAIL_PTS - 1); // 0 = head, 1 = tail
        pArr[p * 3]     = s.pos.x - velNorm.x * TRAIL_STEP * p;
        pArr[p * 3 + 1] = s.pos.y - velNorm.y * TRAIL_STEP * p;
        pArr[p * 3 + 2] = s.pos.z - velNorm.z * TRAIL_STEP * p;
        oArr[p] = Math.max(0, envelope * (1.0 - t * 0.92));
      }

      posAttr.needsUpdate = true;
      opAttr.needsUpdate  = true;
    }
  });

  return <group ref={groupRef} />;
}

/* ════════════════════════════════════════════════════════════════════
   Fallback & Root export
   ════════════════════════════════════════════════════════════════════ */
function FallbackBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, background: "var(--theme-bg)", pointerEvents: "none" }} />
  );
}

export default function GalaxyBackground({ scrollY, mouseX, mouseY, theme }: GalaxyProps) {
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
        <GalaxyParticles scrollY={scrollY} mouseX={mouseX} mouseY={mouseY} theme={theme} />
        <ShootingStars mouseX={mouseX} mouseY={mouseY} theme={theme} />
      </Canvas>

      {/* Soft edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            `radial-gradient(ellipse 75% 60% at 60% 52%, transparent 25%, var(--theme-vignette) 65%, var(--theme-vignette-edge) 100%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
