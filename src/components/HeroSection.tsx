import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FilmReel from './FilmReel';
import { Button } from '@/components/ui/button';
import CountUp from './CountUp';
import { ArrowDown, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const HeroSection = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  const magneticRefWork = useMagneticEffect({ strength: 0.25, speed: 0.2 });
  const magneticRefContact = useMagneticEffect({ strength: 0.25, speed: 0.2 });
  
  // Mouse spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [canHover, setCanHover] = useState(true);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 30 });
  // Compute spotlight background unconditionally (hooks must not be conditional)
  const spotlightBg = useTransform(
    [smoothMouseX, smoothMouseY],
    ([x, y]) => `radial-gradient(250px circle at ${x}px ${y}px, rgba(239, 68, 68, 0.20), transparent 70%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!(canHover && !isMobile)) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkHoverCapability = () => {
      const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setCanHover(mq.matches && !hasTouch);
    };

    checkMobile();
    checkHoverCapability();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    window.matchMedia('(hover: hover) and (pointer: fine)').addEventListener('change', checkHoverCapability);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, canHover, isMobile]);
  
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
      {/* Mouse-following spotlight (desktop only) */}
      {(canHover && !isMobile) && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />
      )}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      
      {/* Red accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={textReveal}
              className="text-primary font-medium mb-4 tracking-widest uppercase text-lg md:text-xl"
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
              Hi, I'm{' '}
              <motion.span 
                className="font-medium cursor-pointer relative inline-block"
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                animate={{
                  scale: isNameHovered ? 1.1 : 1,
                  color: isNameHovered ? 'rgb(239, 68, 68)' : 'rgb(255, 255, 255)',
                  textShadow: isNameHovered 
                    ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)' 
                    : '0 0 0px rgba(0, 0, 0, 0)',
                }}
                transition={{ duration: 0.3 }}
              >
                Neel Lathiya
                
                {/* Burst particles on hover */}
                {isNameHovered && [...Array(25)].map((_, i) => {
                  const angle = (Math.random() * 360) * (Math.PI / 180);
                  const distance = 150 + Math.random() * 350;
                  const duration = 1.2 + Math.random() * 1;
                  const size = 2 + Math.random() * 5;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-primary"
                      style={{
                        width: size,
                        height: size,
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
              </motion.span>
              .{' '}
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
              <div ref={magneticRefWork as any}>
                <Button size="lg" className="group gap-2" asChild>
                  <a href="#work">
                    <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    View My Work
                  </a>
                </Button>
              </div>
              <div ref={magneticRefContact as any}>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Get in Touch</a>
                </Button>
              </div>
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
                { value: '20+', label: 'Clients' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {/* Start counting from 0 when the stat enters view */}
                    <CountUp value={stat.value} startOnView={true} />
                  </p>
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
          className="absolute bottom-18 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer"
          aria-label="Scroll to work section"
        >
          {/* Animated mouse icon */}
          <motion.div 
            className="relative w-6 h-10 border-2 border-primary/40 rounded-full flex items-start justify-center pt-2 overflow-hidden"
            whileHover={{ borderColor: 'hsl(var(--primary))' }}
          >
            {/* Scroll wheel */}
            <motion.div
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ 
                y: [0, 12, 0],
                opacity: [1, 0.3, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/10 blur-md"
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.span 
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors font-medium"
          >
            Scroll
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
