import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  trigger: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  gravity: number;
  drag: number;
}

const COLORS = [
  '#8b5cf6', // Violet
  '#a78bfa', // Purple
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#3b82f6', // Blue
  '#60a5fa', // Light Blue
  '#10b981', // Emerald
  '#34d399', // Mint
  '#f59e0b', // Amber
  '#fbbf24', // Yellow
];

export default function Confetti({ trigger }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Resize canvas to cover whole screen
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Spawn celebration particles
  const spawnConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const newParticles: Particle[] = [];

    // Left corner shooting up-right
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        x: 0,
        y: height,
        vx: 8 + Math.random() * 14,
        vy: -15 - Math.random() * 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 6 + Math.random() * 8,
        height: 10 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotationSpeed: -10 + Math.random() * 20,
        opacity: 1,
        gravity: 0.2 + Math.random() * 0.15,
        drag: 0.97 + Math.random() * 0.015,
      });
    }

    // Right corner shooting up-left
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        x: width,
        y: height,
        vx: -8 - Math.random() * 14,
        vy: -15 - Math.random() * 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 6 + Math.random() * 8,
        height: 10 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotationSpeed: -10 + Math.random() * 20,
        opacity: 1,
        gravity: 0.2 + Math.random() * 0.15,
        drag: 0.97 + Math.random() * 0.015,
      });
    }

    // Center burst shooting outwards
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        x: width / 2,
        y: height * 0.6,
        vx: -8 + Math.random() * 16,
        vy: -12 - Math.random() * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 5 + Math.random() * 7,
        height: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: -12 + Math.random() * 24,
        opacity: 1,
        gravity: 0.18 + Math.random() * 0.12,
        drag: 0.96 + Math.random() * 0.02,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];

    // Ensure loop is running
    if (!animationFrameRef.current) {
      tick();
    }
  };

  // Trigger whenever trigger value increments
  useEffect(() => {
    if (trigger > 0) {
      spawnConfetti();
    }
  }, [trigger]);

  const tick = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Apply physics
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      
      // Gradually fade out as they fall below 2/3rds of the screen
      if (p.vy > 1) {
        p.opacity -= 0.006;
      } else {
        p.opacity -= 0.002;
      }

      // Remove dead particles
      if (p.opacity <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
        particles.splice(i, 1);
        continue;
      }

      // Draw particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw standard rectangle/ribbon
      ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
      ctx.restore();
    }

    if (particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(tick);
    } else {
      animationFrameRef.current = null;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
