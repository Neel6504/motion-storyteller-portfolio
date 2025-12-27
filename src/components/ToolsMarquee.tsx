import { motion } from 'framer-motion';
import { Play, Scissors, Layers, Palette } from 'lucide-react';

const tools = [
  { 
    name: 'Adobe After Effects', 
    icon: 'Ae',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg',
    color: 'from-purple-600/20 to-purple-900/20',
    hoverColor: 'from-purple-600 to-purple-900',
    description: 'Motion Graphics & VFX',
    Icon: Layers,
  },
  { 
    name: 'Adobe Premiere Pro', 
    icon: 'Pr',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg',
    color: 'from-blue-600/20 to-blue-900/20',
    hoverColor: 'from-blue-600 to-blue-900',
    description: 'Professional Video Editing',
    Icon: Play,
  },
  { 
    name: 'CapCut', 
    icon: 'Cc',
    logo: 'https://1000logos.net/wp-content/uploads/2025/01/CapCut-Logo-500x281.png',
    color: 'from-pink-600/20 to-pink-900/20',
    hoverColor: 'from-pink-600 to-pink-900',
    description: 'Creative Content Editing',
    Icon: Scissors,
  },
  { 
    name: 'Canva', 
    icon: 'Ca',
    logo: 'https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg',
    color: 'from-cyan-600/20 to-teal-900/20',
    hoverColor: 'from-cyan-600 to-teal-900',
    description: 'Graphic Design & Templates',
    Icon: Palette,
  },
];

const ToolsMarquee = () => {
  return (
    <section id="tools" className="py-16 md:py-24 border-y border-border/50 relative overflow-hidden" aria-label="Software tools">
      {/* Timeline background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 h-3 w-0.5 bg-primary/30"
            style={{ left: `${i * 5}%`, transform: 'translateY(-50%)' }}
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
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-sm">Software</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold">Editing Arsenal</h2>
          <p className="text-muted-foreground mt-2">Professional tools for crafting visual stories</p>
        </motion.div>
      </div>

      {/* Video editing styled tool cards */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card with video clip aesthetic */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Film strip perforations */}
                <div className="absolute top-0 left-0 right-0 h-2 flex gap-2 px-2 py-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2 flex gap-2 px-2 py-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-primary/20 rounded-full" />
                  ))}
                </div>

                <div className="relative p-8 pt-10 pb-10">
                  {/* Logo display */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} group-hover:bg-white flex items-center justify-center transition-all duration-500 border-2 border-border/50 group-hover:border-transparent group-hover:scale-110 p-3`}>
                        <img 
                          src={tool.logo} 
                          alt={`${tool.name} logo`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center font-display font-bold text-3xl text-foreground">
                          {tool.icon}
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <tool.Icon className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Tool info */}
                  <div className="text-center">
                    <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">
                      {tool.description}
                    </p>
                  </div>

                  {/* Progress bar decoration */}
                  <div className="mt-6 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/50"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
