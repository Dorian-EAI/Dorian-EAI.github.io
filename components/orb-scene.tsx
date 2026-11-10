"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vPos;

  void main() {
    vec3 pos = position;

    float n1 = sin(pos.x * 2.6 + uTime * 0.55)
      * sin(pos.y * 3.1 - uTime * 0.42)
      * sin(pos.z * 2.8 + uTime * 0.5);
    float n2 = sin(pos.x * 5.2 - uTime * 0.3)
      * sin(pos.y * 4.7 + uTime * 0.36)
      * sin(pos.z * 5.5 - uTime * 0.28);

    pos += normal * (n1 * 0.11 + n2 * 0.035);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    vPos = pos;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vPos;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewPosition);
    float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4);

    vec3 deep = vec3(0.016, 0.031, 0.035);
    vec3 mint = vec3(0.56, 0.95, 0.79);
    vec3 sand = vec3(0.95, 0.84, 0.63);

    float band = 0.5 + 0.5 * sin(vPos.y * 3.2 + uTime * 0.35 + fresnel * 5.0);
    vec3 color = mix(deep, mint, pow(fresnel, 1.15) * 1.05);
    color = mix(color, sand, band * fresnel * 0.22);

    vec3 lightDir = normalize(vec3(0.55, 0.85, 0.9));
    vec3 halfDir = normalize(lightDir + V);
    float spec = pow(max(dot(N, halfDir), 0.0), 56.0);
    color += vec3(1.0, 0.98, 0.94) * spec * 0.85;

    float rim = smoothstep(0.62, 1.0, fresnel);
    color += mint * rim * 0.16;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function OrbScene({ paused }: { paused: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearAlpha(0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const geometry = new THREE.IcosahedronGeometry(1.05, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader,
    });
    const orb = new THREE.Mesh(geometry, material);

    const wireGeometry = new THREE.IcosahedronGeometry(1.05, 6);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: "#a8f0d0",
      wireframe: true,
      transparent: true,
      opacity: 0.055,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    wire.scale.setScalar(1.14);

    group.add(orb, wire);
    scene.add(group);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerY = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    const clock = { last: performance.now() };
    let frame = 0;

    const render = () => {
      frame = requestAnimationFrame(render);

      const now = performance.now();
      const delta = Math.min((now - clock.last) / 1000, 0.05);
      clock.last = now;

      if (!pausedRef.current) {
        material.uniforms.uTime.value += delta;
        group.rotation.y += delta * 0.14;
        group.rotation.x = THREE.MathUtils.lerp(
          group.rotation.x,
          -pointerY * 0.2,
          0.045,
        );
        group.position.x = THREE.MathUtils.lerp(
          group.position.x,
          pointerX * 0.12,
          0.045,
        );
        group.position.y = THREE.MathUtils.lerp(
          group.position.y,
          pointerY * 0.08,
          0.045,
        );
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);

      geometry.dispose();
      material.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="orb-mount" ref={mountRef} />;
}
