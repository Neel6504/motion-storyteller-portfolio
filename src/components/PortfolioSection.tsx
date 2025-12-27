import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['3D Animation', 'Motion Graphics', 'VFX', 'Video Editing', 'Branding'];

const projects = [
  {
    id: 1,
    title: 'Cosmic Voyage',
    category: '3D Animation',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766167814/Screenshot_2025-12-19_234001_l7d1gl.png',
    videoUrl: 'https://www.youtube.com/embed/M2cESo0s81w?feature=share',
    description: 'A stunning 3D animation exploring the depths of space with cinematic camera movements.',
    tools: ['Cinema 4D', 'After Effects', 'Octane Render'],
  },
  {
    id: 2,
    title: 'Brand Identity Motion',
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766858278/metaloop_graphics_3_-_Copy_-_Trim_-_frame_at_0m2s_kxftqe.jpg',
    videoUrl: 'https://youtube.com/embed/s7zX_gLfKTw?feature=share',
    description: 'Dynamic logo animation and brand identity motion system for a tech startup.',
    tools: ['After Effects', 'Illustrator'],
  },
  {
    id: 3,
    title: 'Particle Symphony',
    category: 'VFX',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Abstract particle simulation synchronized with orchestral music.',
    tools: ['Houdini', 'After Effects', 'Nuke'],
  },
  {
    id: 4,
    title: 'Product Reveal',
    category: '3D Animation',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'High-end product visualization with dramatic lighting and camera work.',
    tools: ['Blender', 'Substance Painter', 'After Effects'],
  },
  {
    id: 5,
    title: 'Documentary Edit',
    category: 'Video Editing',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Award-winning documentary with compelling storytelling and pacing.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
  },
  {
    id: 6,
    title: 'Tech Startup Promo',
    category: 'Motion Graphics',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Energetic promotional video combining live action with motion graphics.',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
  },
  {
    id: 7,
    title: 'Visual Effects Reel',
    category: 'VFX',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Compilation of VFX work including compositing, rotoscoping, and CGI integration.',
    tools: ['Nuke', 'After Effects', 'Mocha Pro'],
  },
  {
    id: 8,
    title: 'Brand Guidelines Video',
    category: 'Branding',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('3D Animation');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-20 md:py-32 relative" aria-labelledby="work-heading">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary font-medium mb-4 tracking-widest uppercase text-sm">Portfolio</p>
          <h2 id="work-heading" className="font-display text-3xl md:text-5xl font-bold mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A curated collection of projects showcasing expertise across motion design, VFX, and video production.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              role="tab"
              aria-selected={activeCategory === category}
              className="text-xs md:text-sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer card-glow bg-card"
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                aria-label={`View ${project.title} project details`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Play className="w-3 h-3" /> Watch
                    </span>
                  </div>
                </div>

                {/* Play button center */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%] max-w-sm sm:max-w-xl max-h-[85vh] bg-card rounded-xl overflow-hidden border border-border flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="flex flex-col overflow-y-auto">
                {/* Video side */}
                <div className="relative aspect-video bg-muted">
                  <iframe
                    src={selectedProject.videoUrl}
                    title={selectedProject.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Info side */}
                <div className="p-6 flex flex-col">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider mb-2">
                    {selectedProject.category}
                  </span>
                  <h3 id="modal-title" className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Tools Used</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Full Project
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
