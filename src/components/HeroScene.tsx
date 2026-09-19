"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The 3D hero: four glass layers (Browser, API, Database, Tests) with packets of light
 * travelling down through them. It reacts to the mouse and pulls apart as you scroll.
 *
 * The canvas is created inside the effect (not in JSX) so React Strict Mode can mount,
 * clean up and mount again in development without reusing a lost WebGL context.
 */

interface Layer {
  g: THREE.Group;
  body: THREE.Mesh;
  edges: THREE.LineSegments;
  dec: THREE.Group;
  i: number;
}
interface Packet {
  m: THREE.Mesh;
  h: THREE.Sprite;
  ph: number;
}

const W = 4.6; // layer width
const H = 0.26; // layer thickness
const D = 3.2; // layer depth

const layerDefs = [
  { n: "Browser", c: 0x8b6cff, hex: "#8b6cff" },
  { n: "API", c: 0x35d6ff, hex: "#35d6ff" },
  { n: "Database", c: 0xff7a59, hex: "#ff7a59" },
  { n: "Tests", c: 0x5df2a0, hex: "#5df2a0" },
];

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const layerY = (i: number, spread: number) => (1.5 - i) * (1.15 + spread * 0.8);

function roundRect(x: CanvasRenderingContext2D, px: number, py: number, w: number, h: number, r: number) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

function decorMaterial(color: number) {
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: color,
    emissiveIntensity: 0.6,
    roughness: 0.35,
    metalness: 0.2,
  });
}

/** Small props on top of each layer: windows, pipes, database disks, test cubes. */
function addDecor(kind: number, color: number, dec: THREE.Group) {
  const m = decorMaterial(color);

  if (kind === 0) {
    [
      [-1.2, -0.55, 1.5, 1.0],
      [0.85, -0.5, 1.6, 1.1],
      [-0.35, 0.8, 2.4, 0.7],
    ].forEach(([x, z, w, d]) => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(w, 0.07, d), m);
      win.position.set(x, 0.06, z);
      dec.add(win);
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.09, 0.14), decorMaterial(0xffffff));
      bar.position.set(x, 0.08, z - d / 2 + 0.07);
      dec.add(bar);
    });
  } else if (kind === 1) {
    for (let i = 0; i < 4; i++) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.4, 16), m);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, 0.12, -1.05 + i * 0.7);
      dec.add(pipe);
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), decorMaterial(0xffffff));
      node.position.set(-1.7 + (i % 2) * 3.4, 0.14, -1.05 + i * 0.7);
      dec.add(node);
    }
  } else if (kind === 2) {
    for (let i = 0; i < 3; i++) {
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.16, 40), m);
      disk.position.set(0, 0.12 + i * 0.26, 0);
      dec.add(disk);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.018, 8, 48), decorMaterial(0xffffff));
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, 0.2 + i * 0.26, 0);
      dec.add(ring);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), m);
      cube.position.set(-1.6 + i * 0.8, 0.3, (i % 2) * 0.7 - 0.35);
      cube.rotation.y = Math.PI / 4;
      cube.userData.ph = i;
      dec.add(cube);
    }
  }
}

function createRenderer(canvas: HTMLCanvasElement) {
  try {
    return new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
}

export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const hero = host?.closest(".hero") as HTMLElement | null;
    if (!host || !hero) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);
    const renderer = createRenderer(canvas);
    if (!renderer) {
      canvas.remove();
      root.classList.add("no-gl");
      return () => root.classList.remove("no-gl");
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(3, 8, 6);
    scene.add(key);
    const violet = new THREE.PointLight(0x8b6cff, 2.4, 40);
    violet.position.set(-6, 3, 5);
    scene.add(violet);
    const cyan = new THREE.PointLight(0x35d6ff, 2.2, 40);
    cyan.position.set(6, -3, 6);
    scene.add(cyan);

    const stack = new THREE.Group();
    scene.add(stack);

    /* Labels are drawn on a canvas texture. They are redrawn once web fonts finish loading. */
    const labelDraws: Array<() => void> = [];
    const textures: THREE.Texture[] = [];
    const makeLabel = (text: string, hex: string) => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 128;
      const tex = new THREE.CanvasTexture(c);
      textures.push(tex);
      const draw = () => {
        const x = c.getContext("2d");
        if (!x) return;
        x.clearRect(0, 0, 512, 128);
        x.fillStyle = "rgba(12,10,32,.82)";
        roundRect(x, 8, 16, 496, 96, 48);
        x.fill();
        x.lineWidth = 4;
        x.strokeStyle = hex;
        roundRect(x, 8, 16, 496, 96, 48);
        x.stroke();
        x.fillStyle = "#ffffff";
        x.font = "700 54px Outfit, Arial, sans-serif";
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.fillText(text, 256, 68);
        tex.needsUpdate = true;
      };
      draw();
      labelDraws.push(draw);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
      sprite.scale.set(1.7, 0.425, 1);
      sprite.renderOrder = 10;
      return sprite;
    };

    const layers: Layer[] = layerDefs.map((def, i) => {
      const g = new THREE.Group();
      const geo = new THREE.BoxGeometry(W, H, D);
      const body = new THREE.Mesh(
        geo,
        new THREE.MeshPhysicalMaterial({
          color: def.c,
          transparent: true,
          opacity: 0.3,
          roughness: 0.2,
          metalness: 0.1,
          clearcoat: 1,
          depthWrite: false,
        })
      );
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: def.c, transparent: true })
      );
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(W - 0.3, D - 0.3),
        new THREE.MeshBasicMaterial({
          color: def.c,
          transparent: true,
          opacity: 0.13,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      glow.rotation.x = -Math.PI / 2;
      glow.position.y = H / 2 + 0.005;

      const grid = new THREE.GridHelper(W - 0.4, 10, def.c, def.c);
      grid.scale.z = (D - 0.4) / (W - 0.4);
      grid.position.y = H / 2 + 0.01;
      const gridMat = grid.material as THREE.LineBasicMaterial;
      gridMat.transparent = true;
      gridMat.opacity = 0.3;

      const dec = new THREE.Group();
      dec.position.y = H / 2;
      addDecor(i, def.c, dec);

      const label = makeLabel(def.n, def.hex);
      label.position.set(0, 0.05, D / 2 + 0.55);

      g.add(body, edges, glow, grid, dec, label);
      stack.add(g);
      return { g, body, edges, dec, i };
    });

    /* Glowing packets that travel down through the layers */
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 64;
    const hx = haloCanvas.getContext("2d");
    if (hx) {
      const grad = hx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(160,220,255,.6)");
      grad.addColorStop(1, "rgba(160,220,255,0)");
      hx.fillStyle = grad;
      hx.fillRect(0, 0, 64, 64);
    }
    const haloTex = new THREE.CanvasTexture(haloCanvas);
    textures.push(haloTex);

    const packetX = [-1.5, -0.6, 0.5, 1.4, -1.0, 0.9];
    const packetZ = [0.4, -0.5, 0.6, -0.2, -0.7, 0.1];
    const packets: Packet[] = packetX.map((x, k) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      const h = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: haloTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      h.scale.set(0.7, 0.7, 1);
      m.add(h);
      m.position.set(x, 0, packetZ[k]);
      stack.add(m);
      return { m, h, ph: k / packetX.length };
    });

    /* Animation state */
    const mouse = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let spread = 0;
    const startTime = performance.now();
    let running = false;
    let visible = true;
    let raf = 0;

    const onPointer = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const update = (now: number, instant: boolean) => {
      const elapsed = instant ? 99 : (now - startTime) / 1000;
      const t = now / 1000;
      const target = clamp(window.scrollY / (hero.offsetHeight * 0.85), 0, 1);
      spread += (target - spread) * (instant ? 1 : 0.08);
      cur.x += (mouse.x - cur.x) * 0.06;
      cur.y += (mouse.y - cur.y) * 0.06;

      layers.forEach((L) => {
        // Intro: each layer drops in and spins into place, one after another.
        const e = ease(clamp((elapsed - 0.15 * L.i - 0.2) / 1.2, 0, 1));
        L.g.position.y = layerY(L.i, spread) + (1 - e) * 4.5;
        L.g.rotation.y = (1 - e) * 1.4;
        (L.body.material as THREE.MeshPhysicalMaterial).opacity = 0.3 * e;
        (L.edges.material as THREE.LineBasicMaterial).opacity = e;
        L.dec.rotation.y = L.i === 2 ? t * 0.5 : 0;
        if (L.i === 3) {
          L.dec.children.forEach((c) => {
            const s = 1 + Math.sin(t * 2 + c.userData.ph) * 0.12;
            c.scale.set(s, s, s);
            c.rotation.y = t * 0.6 + c.userData.ph;
          });
        }
      });

      const top = layerY(0, spread) + 0.9;
      const bottom = layerY(3, spread) - 0.9;
      packets.forEach((p) => {
        const f = (t * 0.1 + p.ph) % 1;
        const y = top - f * (top - bottom);
        p.m.position.y = y;
        let near = 9;
        layers.forEach((L) => {
          near = Math.min(near, Math.abs(y - layerY(L.i, spread)));
        });
        const s = 0.55 + 0.75 * Math.exp(-near * near * 9);
        p.h.scale.set(s, s, 1);
      });

      stack.rotation.y = -0.6 + Math.sin(t * 0.4) * 0.14 + cur.x * 0.5 + spread * 0.5;
      stack.rotation.x = cur.y * 0.1;
      stack.position.y = -0.1 + spread * 0.2;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;
      camera.position.set(0, 3.3, aspect < 1.1 ? 11 + (1.1 - aspect) * 7 : 11);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      if (!running) {
        update(performance.now(), reduce);
        renderer.render(scene, camera);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      update(now, false);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduce || raf) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }
    resize();
    update(performance.now(), reduce);
    renderer.render(scene, camera);
    root.classList.add("gl-ready");

    // Pause rendering when the hero is off screen or the tab is hidden.
    let io: IntersectionObserver | null = null;
    if (!reduce) {
      if (typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver(
          (entries) => {
            visible = entries[0].isIntersecting;
            if (visible) start();
          },
          { threshold: 0 }
        );
        io.observe(canvas);
      }
      document.addEventListener("visibilitychange", start);
      start();
    }

    let disposed = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) labelDraws.forEach((d) => d());
      });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", start);
      ro?.disconnect();
      io?.disconnect();

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      root.classList.remove("gl-ready");
    };
  }, []);

  return (
    <div className="hero-gl" aria-hidden="true">
      <div className="gl-host" ref={hostRef} />
      <span className="gl-hint">Move your mouse over the stack, then scroll to pull it apart</span>
    </div>
  );
}
