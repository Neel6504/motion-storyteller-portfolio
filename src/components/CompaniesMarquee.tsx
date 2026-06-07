import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
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
        className="relative flex items-center justify-center w-full min-h-[80px] px-4 md:px-8 py-4 bg-card/30 border border-border/30 rounded-lg hover:border-primary/50 hover:bg-card/50 transition-colors duration-300 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg pointer-events-none"
          animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(82,39,255,0.18) 0%, transparent 50%)`,
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
  const duplicatedCompanies = [...companies, ...companies];

  const marqueeVariants = {
    animate: {
      x: [0, -192 * companies.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear',
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
