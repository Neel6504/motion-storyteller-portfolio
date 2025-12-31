import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FilmReel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D rotation based on mouse position
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 300, damping: 30 });
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Render a lightweight, static SVG on mobile to avoid heavy motion work.
  if (isMobile) {
    return (
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx={50} cy={50} r={48} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} />
          <circle cx={50} cy={50} r={38} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />
          <circle cx={50} cy={50} r={12} fill="hsl(var(--primary))" />
          <circle cx={50} cy={50} r={8} fill="hsl(var(--background))" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x = 50 + 28 * Math.cos(angle);
            const y = 50 + 28 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r={5} fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth={1} />;
          })}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 + 15) * (Math.PI / 180);
            const x = 50 + 43 * Math.cos(angle);
            const y = 50 + 43 * Math.sin(angle);
            return (
              <rect
                key={i}
                x={x - 2}
                y={y - 4}
                width={4}
                height={8}
                rx={1}
                fill="hsl(var(--background))"
                transform={`rotate(${i * 30 + 15}, ${x}, ${y})`}
              />
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-48 h-48 md:w-56 md:h-56 ${isMobile ? '' : 'cursor-pointer'}`}
      style={{ perspective: 1000 }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : () => setIsHovered(true)}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          translateZ: isMobile ? 0 : translateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={{ 
          rotate: isMobile ? 0 : 360,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ 
          rotate: { duration: isHovered ? 10 : 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 0.3 }
        }}
      >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer ring */}
        <motion.circle
          cx={50}
          cy={50}
          r={48}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          initial={{ r: 48, strokeWidth: 2 }}
          animate={{
            strokeWidth: isHovered ? 3 : 2,
            r: isHovered ? 49 : 48,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Inner ring */}
        <motion.circle
          cx={50}
          cy={50}
          r={38}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.5}
          initial={{ r: 38, strokeWidth: 1.5 }}
          animate={{
            strokeWidth: isHovered ? 2.5 : 1.5,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Center hole */}
        <motion.circle
          cx={50}
          cy={50}
          r={12}
          fill="hsl(var(--primary))"
          initial={{ r: 12 }}
          animate={{
            r: isHovered ? 14 : 12,
          }}
          transition={{ duration: 0.3 }}
        />
        <circle
          cx={50}
          cy={50}
          r={8}
          fill="hsl(var(--background))"
        />
        
        {/* Film sprocket holes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const x = 50 + 28 * Math.cos(angle);
          const y = 50 + 28 * Math.sin(angle);
          return (
            <motion.circle
              key={i}
              cx={typeof x === 'number' ? x : 0}
              cy={typeof y === 'number' ? y : 0}
              r={isHovered ? 6 : 5}
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth={isHovered ? 1.5 : 1}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          );
        })}
        
        {/* Outer sprocket holes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 + 15) * (Math.PI / 180);
          const x = 50 + 43 * Math.cos(angle);
          const y = 50 + 43 * Math.sin(angle);
          return (
            <motion.rect
              key={i}
              x={typeof x === 'number' ? x - 2 : 0}
              y={typeof y === 'number' ? y - 4 : 0}
              width={isHovered ? 5 : 4}
              height={isHovered ? 9 : 8}
              rx={1}
              fill="hsl(var(--background))"
              transform={`rotate(${i * 30 + 15}, ${typeof x === 'number' ? x : 0}, ${typeof y === 'number' ? y : 0})`}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            />
          );
        })}
      </svg>
      </motion.div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary/10 blur-xl -z-10"
        style={{
          translateZ: -50,
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Additional glow rings on hover */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary/20 blur-2xl -z-10"
        style={{
          translateZ: -70,
        }}
        animate={{
          scale: isHovered ? 1.5 : 0.8,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Burst particles on hover */}
      {isHovered && [...Array(20)].map((_, i) => {
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 200 + Math.random() * 400;
        const duration = 1.5 + Math.random() * 1;
        const size = 2 + Math.random() * 4;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              width: size,
              height: size,
              left: '50%',
              top: '50%',
              translateZ: 100 + Math.random() * 50,
            }}
            initial={{ 
              scale: 0, 
              x: 0, 
              y: 0,
              opacity: 1,
            }}
            animate={{
              x: distance * Math.cos(angle),
              y: distance * Math.sin(angle),
              scale: [0, 1, 0.5],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: duration,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 0.5,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default FilmReel;
