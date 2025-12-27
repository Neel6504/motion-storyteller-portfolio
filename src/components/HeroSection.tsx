import { motion } from 'framer-motion';
import FilmReel from './FilmReel';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';

const HeroSection = () => {
  const textReveal = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero section">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      
      {/* Red accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="text-primary font-medium mb-4 tracking-widest uppercase text-sm"
            >
              Motion Designer & Video Editor
            </motion.p>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              Crafting Stories
              <br />
              <span className="text-gradient">Through Motion</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Hi, I'm <span className="text-foreground font-medium">Neel Lathiya</span>. 
              With 3+ years of experience, I transform ideas into captivating visual experiences 
              that engage, connect, and inspire.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group gap-2" asChild>
                <a href="#work">
                  <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  View My Work
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: '150+', label: 'Projects' },
                { value: '3+', label: 'Years' },
                { value: '50+', label: 'Clients' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Film Reel Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <FilmReel />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to work section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
