import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Play, Scissors, Layers, Palette, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import CountUp from './CountUp';

const tools = [
  { 
    name: 'Adobe After Effects', 
    icon: 'Ae',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    color: 'from-purple-600/20 to-purple-900/20',
    hoverColor: 'from-purple-600 to-purple-900',
    description: 'Motion Graphics & Visual Effects',
    Icon: Layers,
    skillLevel: 95,
    yearsExp: '3+',
    projectCount: 75,
  },
  { 
    name: 'Adobe Premiere Pro', 
    icon: 'Pr',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
    color: 'from-blue-600/20 to-blue-900/20',
    hoverColor: 'from-blue-600 to-blue-900',
    description: 'Professional Video Editing',
    Icon: Play,
    skillLevel: 90,
    yearsExp: '3+',
    projectCount: 30,
  },
  { 
    name: 'CapCut', 
    icon: 'Cc',
    logo: 'https://1000logos.net/wp-content/uploads/2025/01/CapCut-Logo-500x281.png',
    color: 'from-pink-600/20 to-pink-900/20',
    hoverColor: 'from-pink-600 to-pink-900',
    description: 'Creative Content Editing',
    Icon: Scissors,
    skillLevel: 85,
    yearsExp: '2+',
    projectCount: 30,
  },
  { 
    name: 'Canva', 
    icon: 'Ca',
    logo: 'https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg',
    color: 'from-cyan-600/20 to-teal-900/20',
    hoverColor: 'from-cyan-600 to-teal-900',
    description: 'Graphic Design & Templates',
    Icon: Palette,
    skillLevel: 88,
    yearsExp: '3+',
    projectCount: 15,
  },
];

const ToolCard = ({ tool, index }: { tool: typeof tools[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hoverEnabled = !isMobile; // Disable interactivity only on mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced 3D rotation with stronger effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 300, damping: 30 });
  
  // Card depth effect
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 300, damping: 30 });

  // Parallax layers at different depths
  const parallaxLayer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  const parallaxLayer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  
  const parallaxLayer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });
  const parallaxLayer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });
  
  const parallaxLayer3X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-60, 60]), { stiffness: 400, damping: 30 });
  const parallaxLayer3Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-60, 60]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hoverEnabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-auto min-h-full p-1 md:p-4"
    >
      <motion.div
        style={{ 
          rotateX: isMobile ? 0 : rotateX, 
          rotateY: isMobile ? 0 : rotateY,
          translateZ: isMobile ? 0 : translateZ,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: hoverEnabled && isHovered ? 1.08 : 1,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(var(--primary), 0.3)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`relative bg-gradient-to-br from-card/90 to-card/60 md:backdrop-blur-xl border-2 border-border/30 rounded-2xl overflow-hidden ${hoverEnabled ? 'hover:border-primary/50' : ''} transition-colors duration-500 h-full w-full`}
      >
        {/* Subtle gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${tool.color} pointer-events-none`}
          animate={{ opacity: hoverEnabled && isHovered && !prefersReducedMotion ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Spotlight effect (desktop only, no touch) */}
        {hoverEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            }}
            animate={{ opacity: isHovered && !prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Main content with subtle parallax */}
        <motion.div 
          className="relative p-4 sm:p-6 md:p-8" 
          style={{ 
            translateZ: isMobile ? 0 : 30,
            x: isMobile ? 0 : parallaxLayer1X,
            y: isMobile ? 0 : parallaxLayer1Y,
          }}
        >
          {/* Header with logo and badge */}
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div className="relative">
              <motion.div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${tool.name === 'CapCut' ? 'bg-white' : tool.color} flex items-center justify-center transition-all duration-500 border-2 border-border/30 shadow-lg overflow-hidden p-2`}
                style={{ 
                  translateZ: isMobile ? 0 : 60,
                  x: isMobile ? 0 : parallaxLayer2X,
                  y: isMobile ? 0 : parallaxLayer2Y,
                }}
                animate={{
                  scale: hoverEnabled && isHovered ? 1.05 : 1,
                  rotate: prefersReducedMotion ? 0 : (hoverEnabled && isHovered ? [0, -3, 3, 0] : 0),
                }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={tool.logo} 
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Skill percentage */}
            <motion.div
              className="text-right flex-shrink-0"
              animate={{ scale: hoverEnabled && isHovered ? 1.15 : 1 }}
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <CountUp value={`${tool.skillLevel}%`} />
              </div>
              <div className="text-xs text-muted-foreground">Mastery</div>
            </motion.div>
          </div>

          {/* Tool name and description */}
          <motion.div 
            className="mb-4 md:mb-6 min-h-[60px] md:min-h-[72px]"
            style={{ 
              translateZ: isMobile ? 0 : 25,
            }}
          >
            <h3 className={`font-display font-bold text-base sm:text-lg md:text-xl text-foreground mb-1 md:mb-2 ${hoverEnabled ? 'group-hover:text-primary' : ''} transition-colors line-clamp-2`}>
              {tool.name}
            </h3>
            <p className={`text-muted-foreground text-xs sm:text-sm ${hoverEnabled ? 'group-hover:text-foreground/80' : ''} transition-colors line-clamp-2`}>
              {tool.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex items-center justify-between pt-4 border-t border-border/30"
            style={{ 
              translateZ: isMobile ? 0 : 25,
            }}
          >
            <motion.div 
              className="flex items-center gap-2"
              style={{ 
                translateZ: isMobile ? 0 : 70,
                x: isMobile ? 0 : parallaxLayer2X,
                y: isMobile ? 0 : parallaxLayer2Y,
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <tool.Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">
                  <CountUp value={`${tool.projectCount}+`} />
                </div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
            </motion.div>
            
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
              style={{ 
                translateZ: isMobile ? 0 : 70,
                x: isMobile ? 0 : parallaxLayer2X,
                y: isMobile ? 0 : parallaxLayer2Y,
              }}
              animate={{
                rotate: prefersReducedMotion ? 0 : (hoverEnabled && isHovered ? 360 : 0),
              }}
              transition={{ duration: 0.6 }}
            >
              <Zap className="w-5 h-5 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 ${hoverEnabled ? 'group-hover:opacity-100' : ''} transition-opacity duration-500 pointer-events-none rounded-2xl`} />
      </motion.div>
    </motion.div>
  );
};

const ToolsMarquee = () => {
  // Respect user's reduced motion preference within this component
  const prefersReducedMotion = useReducedMotion();
  return (
    <section id="tools" className="py-16 md:py-24 relative overflow-hidden" aria-label="Software tools">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating particles (disabled on mobile or reduced-motion) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: (typeof window !== 'undefined' && (window.innerWidth < 768 || prefersReducedMotion)) ? 0 : 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: prefersReducedMotion ? 0 : [0, -24, 0],
              opacity: prefersReducedMotion ? 0.3 : [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : (3 + Math.random() * 2),
              repeat: prefersReducedMotion ? 0 : Infinity,
              delay: prefersReducedMotion ? 0 : Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Mastered Tools</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Creative <span className="text-primary">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Professional software expertise backed by years of hands-on experience
          </p>
        </motion.div>
      </div>

      {/* Interactive 3D tool cards */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;