import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

const companies = [
  'VOSAP',
  'Shilin Media',
  'Metaloop Marketing',
  'Lotus Herbals',
  'Meta Ads',
  'Yuzi Media',
  'Dizinfinity',
  'Citytadka',
  'Desaii Global Group',
  'SocialScribbles',
  'GIPMC',
  'Fancall',
  'Oviyana Jewels',
  'Desaii Advertising',
  'Studio White',
  'Hindusstan talks'
];

const CompanyCard = ({ name }: { name: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 260, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 260, damping: 24 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3]);
  const spotlightX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(111, 75, 255, 0.2), transparent 52%)`;

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 w-auto px-4 md:px-6 group"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformPerspective: 800,
        }}
        tabIndex={0}
        className="relative flex items-center justify-center w-full min-h-[80px] px-4 md:px-8 py-4 bg-card/30 border border-border/30 rounded-lg hover:border-primary/50 hover:bg-card/50 focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors duration-300 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg pointer-events-none"
          animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-2/5 skew-x-[-18deg] bg-white/[0.12] transition-transform duration-700 group-hover:translate-x-[420%]" aria-hidden="true" />

        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
            style={{
                background: spotlight,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <span className="text-foreground/80 group-hover:text-foreground font-medium text-sm md:text-base whitespace-nowrap transition-colors relative z-10">
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const CompaniesMarquee = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -192 * companies.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop' as const,
          duration: 35,
          ease: 'linear' as const,
        },
      },
    },
  };

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
          <h2 className="font-display text-xl md:text-3xl font-bold">15+ Brands Globally</h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...companies, ...companies].map((company, index) => (
            <CompanyCard key={index} name={company} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
