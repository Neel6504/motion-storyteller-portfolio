import { motion } from 'framer-motion';

const tools = [
  { name: 'After Effects', icon: 'Ae' },
  { name: 'Premiere Pro', icon: 'Pr' },
  { name: 'Cinema 4D', icon: 'C4D' },
  { name: 'Blender', icon: 'Bl' },
  { name: 'DaVinci Resolve', icon: 'Da' },
  { name: 'Photoshop', icon: 'Ps' },
  { name: 'Illustrator', icon: 'Ai' },
  { name: 'Houdini', icon: 'H' },
  { name: 'Nuke', icon: 'Nk' },
  { name: 'Mocha Pro', icon: 'Mo' },
  { name: 'Substance Painter', icon: 'Sp' },
  { name: 'Figma', icon: 'Fg' },
];

const ToolsMarquee = () => {
  return (
    <section id="tools" className="py-16 md:py-24 border-y border-border/50 overflow-hidden" aria-label="Software tools">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Software</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Tools of the Trade</h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...tools, ...tools].map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 bg-card/50 border border-border/50 rounded-lg hover:border-primary/50 hover:bg-card transition-all duration-300 flex-shrink-0 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center font-display font-bold text-sm md:text-base text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {tool.icon}
                </div>
                <span className="text-foreground font-medium text-sm md:text-base whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
