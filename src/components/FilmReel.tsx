import { motion } from 'framer-motion';

const FilmReel = () => {
  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
        />
        
        {/* Center hole */}
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="hsl(var(--primary))"
        />
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="hsl(var(--background))"
        />
        
        {/* Film sprocket holes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const x = 50 + 28 * Math.cos(angle);
          const y = 50 + 28 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Outer sprocket holes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 + 15) * (Math.PI / 180);
          const x = 50 + 43 * Math.cos(angle);
          const y = 50 + 43 * Math.sin(angle);
          return (
            <rect
              key={i}
              x={x - 2}
              y={y - 4}
              width="4"
              height="8"
              rx="1"
              fill="hsl(var(--background))"
              transform={`rotate(${i * 30 + 15}, ${x}, ${y})`}
            />
          );
        })}
      </svg>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl -z-10" />
    </motion.div>
  );
};

export default FilmReel;
