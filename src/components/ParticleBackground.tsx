import { useEffect, useRef, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const updateFlags = () => {
      setIsMobile(window.innerWidth < 768);
      try {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mq.matches);
      } catch {}
    };
    updateFlags();
    window.addEventListener('resize', updateFlags);

    // If mobile or reduced-motion, skip rendering to improve performance
    if (window.innerWidth < 768 || reducedMotion) {
      return () => {
        window.removeEventListener('resize', updateFlags);
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Fewer particles on smaller screens
    const particleCount = window.innerWidth < 1024 ? 24 : 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        // Draw abstract shapes
        if (Math.random() > 0.5) {
          // Triangles
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fillStyle = `hsla(${particle.hue}, 98%, 45%, ${particle.opacity})`;
          ctx.fill();
        } else {
          // Circles with gradient
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
          gradient.addColorStop(0, `hsla(${particle.hue}, 98%, 55%, ${particle.opacity})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 98%, 35%, 0)`);
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Skip connecting lines on mobile to reduce CPU
      if (window.innerWidth >= 768) {
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const gradient = ctx.createLinearGradient(particle.x, particle.y, other.x, other.y);
              gradient.addColorStop(0, `hsla(${particle.hue}, 98%, 45%, ${0.1 * (1 - distance / 200)})`);
              gradient.addColorStop(1, `hsla(${other.hue}, 98%, 45%, ${0.1 * (1 - distance / 200)})`);
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', updateFlags);
    };
  }, [reducedMotion]);

  return (
    isMobile || reducedMotion ? null : (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />
    )
  );
};

export default ParticleBackground;
