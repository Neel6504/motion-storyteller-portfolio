import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const certifications = [
  { title: 'Advanced Motion Graphics', issuer: 'School of Motion', year: '2023' },
  { title: 'VFX Compositing', issuer: 'FXPHD', year: '2022' },
  { title: '3D Modeling & Animation', issuer: 'Gnomon Workshop', year: '2022' },
  { title: 'Color Grading Master', issuer: 'MixingLight', year: '2021' },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative" aria-labelledby="about-heading">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
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
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-border/50">
              {[
                { icon: Briefcase, label: 'Projects Completed', value: '150+' },
                { icon: GraduationCap, label: 'Years Experience', value: '3+' },
                { icon: Award, label: 'Certifications', value: '4' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-display font-bold text-sm">{cert.year.slice(2)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{cert.title}</h4>
                      <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
