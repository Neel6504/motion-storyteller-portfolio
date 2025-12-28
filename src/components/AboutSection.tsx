import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative" aria-labelledby="about-heading">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

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
                { icon: Briefcase, label: 'Projects Completed', value: '150+' },
                { icon: GraduationCap, label: 'Years Experience', value: '3+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
