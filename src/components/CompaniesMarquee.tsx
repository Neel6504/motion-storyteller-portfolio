import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const companies = [
  { name: 'VOSAP', logo: 'Vosap' },
  { name: 'Shilin Media', logo: 'AB' },
  { name: 'Metaloop', logo: 'MT' },
  { name: 'Lotus Herbals', logo: 'AP' },
  { name: 'Flipkart', logo: 'GO' },
  { name: 'Meta Ads', logo: 'AZ' },
  { name: 'Yuzi', logo: 'MS' },
  { name: 'Dizinfinity', logo: 'MS' },
];

const CompanyCard = ({ company, index }: { company: typeof companies[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 group"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex items-center px-6 md:px-8 py-4 bg-card/30 border border-border/30 rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors duration-300 overflow-hidden"
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(239,68,68,0.15) 0%, transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Company name */}
        <motion.span
          className="text-foreground/80 group-hover:text-foreground font-medium text-sm md:text-base whitespace-nowrap transition-colors relative z-10"
          style={{
            translateZ: 20,
          }}
        >
          {company.name}
        </motion.span>

        {/* Sparkle icon on hover */}
        <motion.div
          className="absolute -top-2 -right-2 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -180,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>

        {/* Corner glow */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent rounded-lg pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Burst particles on hover */}
        {isHovered && [...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const distance = 40 + Math.random() * 20;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: 2,
                height: 2,
                left: '50%',
                top: '50%',
                pointerEvents: 'none',
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
                scale: [0, 1, 0],
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
};


const CompaniesMarquee = () => {
  return (
    <section className="py-12 md:py-16 border-b border-border/50 overflow-hidden bg-background/50" aria-label="Companies worked with">
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-xs md:text-sm">Trusted By</p>
          <h2 className="font-display text-xl md:text-3xl font-bold">Companies I've Worked With</h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          >
            {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
              <CompanyCard key={`${company.name}-${index}`} company={company} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
