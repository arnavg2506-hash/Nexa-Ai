import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer
} from "three";
import { useInViewport } from "@/components/three/useThreeScene";

type ParticleFieldProps = {
  className?: string;
  density?: number;
  warm?: boolean;
};

export function ParticleField({ className = "", density = 800, warm = false }: ParticleFieldProps) {
  const [hostRef, visibleRef] = useInViewport<HTMLDivElement>();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(65, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 100);
    camera.position.z = 24;

    const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const positions = new Float32Array(density * 3);
    const colors = new Float32Array(density * 3);
    const velocities = new Float32Array(density);
    const copper = new Color("#B5712C");
    const gold = new Color("#C9973F");

    for (let i = 0; i < density; i += 1) {
      const ix = i * 3;
      positions[ix] = (Math.random() - 0.5) * 42;
      positions[ix + 1] = (Math.random() - 0.5) * 28;
      positions[ix + 2] = (Math.random() - 0.5) * 18;
      const color = copper.clone().lerp(gold, Math.random());
      colors[ix] = color.r;
      colors[ix + 1] = color.g;
      colors[ix + 2] = color.b;
      velocities[i] = 0.006 + Math.random() * 0.018;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    const material = new PointsMaterial({
      size: warm ? 0.075 : 0.055,
      vertexColors: true,
      transparent: true,
      opacity: warm ? 0.72 : 0.58,
      depthWrite: false,
      blending: AdditiveBlending
    });
    const points = new Points(geometry, material);
    scene.add(points);

    const onMouse = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
    };

    const onResize = () => {
      camera.aspect = host.clientWidth / Math.max(host.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    host.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!visibleRef.current) return;
      const position = geometry.attributes.position as BufferAttribute;
      for (let i = 0; i < density; i += 1) {
        const ix = i * 3;
        positions[ix] += Math.sin(performance.now() * 0.00025 + i) * 0.0014 + mouse.current.x * 0.0009;
        positions[ix + 1] += velocities[i];
        positions[ix + 2] += mouse.current.y * 0.0008;
        if (positions[ix + 1] > 15) {
          positions[ix + 1] = -15;
          positions[ix] = (Math.random() - 0.5) * 42;
        }
      }
      position.needsUpdate = true;
      points.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [density, hostRef, visibleRef, warm]);

  return <div ref={hostRef} className={`pointer-events-auto absolute inset-0 overflow-hidden ${className}`} aria-hidden="true" />;
}
