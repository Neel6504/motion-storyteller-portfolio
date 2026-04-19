import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import CountUp from './CountUp';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden"
      aria-labelledby="about-heading"
      ref={sectionRef}
    >
      {/* Background accent (hidden on mobile) */}
      {!isMobile && (
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      )}

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-medium mb-4 tracking-widest uppercase text-sm">About</p>
            <h2 id="about-heading" className="font-display text-3xl md:text-5xl font-bold mb-6">
              Passionate About
              <br />
              <span className="text-gradient">Visual Storytelling</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm Neel Lathiya, a motion designer and video editor with over 3 years of experience 
                creating compelling visual content. My journey began with a fascination for how movement 
                can evoke emotion and tell stories in ways that static images cannot.
              </p>
              <p>
                From high-energy promotional videos to cinematic 3D animations, I've had the privilege 
                of working with startups, established brands, and creative agencies worldwide. My approach 
                combines technical precision with artistic vision, ensuring every frame serves the story.
              </p>
              <p>
                When I'm not animating, you'll find me exploring new visual trends, experimenting with 
                emerging technologies, or sharing knowledge with the creative community.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-border/50 max-w-md mx-auto">
              {[
                { icon: Briefcase, label: 'Projects Completed', value: '200+' },
                { icon: GraduationCap, label: 'Years Experience', value: '3+' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Animated background on hover (disabled on mobile) */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Rotating border effect */}
                  {/* Rotating border effect (disabled on mobile) */}
                  {!isMobile && (
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 -z-10 blur-sm"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: '200% 100%' }}
                    />
                  )}
                  
                  {/* Icon with animation */}
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  
                  {/* Counter animation */}
                  <motion.p 
                    className="font-display text-xl md:text-2xl font-bold text-foreground"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 10,
                      delay: index * 0.2 + 0.3
                    }}
                  >
                    <CountUp value={stat.value} />
                  </motion.p>
                  
                  <p className="text-muted-foreground text-xs group-hover:text-primary transition-colors">
                    {stat.label}
                  </p>
                  
                  {/* Sparkle effect on hover (disabled on mobile) */}
                  {!isMobile &&
                    [...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                          top: `${20 + i * 30}%`,
                          left: `${10 + i * 35}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
