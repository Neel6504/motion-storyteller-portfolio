import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const companies = [
  { name: 'VOSAP', logo: 'Vosap' },
  { name: 'Shilin Media', logo: 'AB' },
  { name: 'Metaloop Marketing', logo: 'MT' },
  { name: 'Lotus Herbals', logo: 'AP' },
  { name: 'Meta Ads', logo: 'AZ' },
  { name: 'Yuzi Media', logo: 'MS' },
  { name: 'Dizinfinity', logo: 'MS' },
  { name: 'Citytadka', logo: 'MS' },
  { name: 'Desaii Global Group', logo: 'MS' },
  { name: 'SocialScribbles', logo: 'MS' },
];

const CompanyCard = ({ company, index }: { company: typeof companies[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D effects removed as requested

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(canHover && !isMobile)) return;
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => (canHover && !isMobile) && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full group"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative flex items-center justify-center w-full min-h-[80px] px-4 md:px-8 py-4 bg-card/30 border border-border/30 rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors duration-300 overflow-hidden"
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg pointer-events-none"
          animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Spotlight effect (desktop only) */}
        {(canHover && !isMobile) && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(82,39,255,0.18) 0%, transparent 50%)`,
            }}
            animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Company name */}
        <motion.span
          className="text-foreground/80 group-hover:text-foreground font-medium text-sm md:text-base whitespace-nowrap transition-colors relative z-10"
        >
          {company.name}
        </motion.span>

        {/* Sparkle icon on hover */}
        <motion.div
          className="absolute -top-2 -right-2 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isHovered && !prefersReducedMotion ? 1 : 0,
            rotate: isHovered && !prefersReducedMotion ? 0 : -180,
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
        {isHovered && !prefersReducedMotion && [...Array(8)].map((_, i) => {
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

      {/* Grid Layout spanning full width */}
      <div className="w-full px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 w-full">
          {companies.map((company, index) => (
            <CompanyCard key={`${company.name}-${index}`} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
