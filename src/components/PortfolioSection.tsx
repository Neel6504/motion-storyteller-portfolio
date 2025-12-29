import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ExternalLink, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['3D Animation', 'Motion Graphics',  'Logo Reveal', 'Meta Ads', 'Cafe works', 'Storytelling Testimonial' , 'Fashion', 'Generative AI Video', 'Festival' ];

const CategoryButton = ({ category, isActive, onClick }: { category: string; isActive: boolean; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 300, damping: 30 });
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 300, damping: 30 });

  // Parallax layers at different depths
  const parallaxLayer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  const parallaxLayer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  
  const parallaxLayer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });
  const parallaxLayer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });

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
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="p-1"
    >
      <motion.button
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        role="tab"
        aria-selected={isActive}
        animate={{
          scale: isHovered ? 1.08 : 1,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(239, 68, 68, 0.3)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`relative text-xs md:text-sm px-4 py-2 rounded-md font-medium overflow-hidden ${
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border border-border hover:border-primary/50'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"
          animate={{ opacity: isHovered && !isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Spotlight effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(239,68,68,0.2) 0%, transparent 50%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Text with parallax */}
        <motion.span 
          className="relative z-10"
          style={{
            translateZ: 30,
            x: parallaxLayer1X,
            y: parallaxLayer1Y,
          }}
        >
          {category}
        </motion.span>

        {/* Active indicator sparkle */}
        {isActive && (
          <motion.div
            className="absolute -top-1 -right-1"
            style={{
              translateZ: 60,
              x: parallaxLayer2X,
              y: parallaxLayer2Y,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Sparkles className="w-3 h-3 text-primary-foreground" />
          </motion.div>
        )}

        {/* Burst particles on hover */}
        {isHovered && [...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const distance = 30 + Math.random() * 15;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary"
              style={{
                width: 2,
                height: 2,
                left: '50%',
                top: '50%',
                pointerEvents: 'none',
                translateZ: 80,
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
                scale: [0, 1, 0],
                opacity: [1, 0.5, 0],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 0.3,
              }}
            />
          );
        })}

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary/20 to-transparent rounded-md pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  );
};

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
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860017/diamond_cycle_-_Trim_-_frame_at_0m8s_cl0w99.jpg',
    videoUrl: 'https://youtube.com/embed/3oflYDt-0NQ?feature=share',
    description: 'Abstract particle simulation synchronized with orchestral music.',
    tools: ['Houdini', 'After Effects', 'Nuke'],
  },
  {
    id: 4,
    title: 'Product Reveal',
    category: '3D Animation',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860128/3d_diamond_-_frame_at_0m1s_zhhmba.jpg',
    videoUrl: 'hhttps://youtube.com/embed/hLredCyMk_8?feature=share',
    description: 'High-end product visualization with dramatic lighting and camera work.',
    tools: ['Blender', 'Substance Painter', 'After Effects'],
  },
  {
    id: 5,
    title: 'Documentary Edit',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860493/event_reveal_-_frame_at_0m3s_jppxhk.jpg',
    videoUrl: 'https://youtube.com/embed/pABpwfMbo5c?feature=share',
    description: 'Award-winning documentary with compelling storytelling and pacing.',
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
  },
  {
    id: 6,
    title: 'Tech Startup Promo',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860729/Logo_Intro_-_frame_at_0m1s_z3cciq.jpg',
    videoUrl: 'https://www.youtube.com/embed/7qbdWk6i-mY',
    description: 'Energetic promotional video combining live action with motion graphics.',
    tools: ['After Effects', 'Premiere Pro', 'Photoshop'],
  },
  {
    id: 7,
    title: 'Visual Effects Reel',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860926/logo_reveal_-_frame_at_0m0s_h7rfa2.jpg',
    videoUrl: 'https://www.youtube.com/embed/Ed3sG7-Z-bs',
    description: 'Compilation of VFX work including compositing, rotoscoping, and CGI integration.',
    tools: ['Nuke', 'After Effects', 'Mocha Pro'],
  },
  {
    id: 8,
    title: 'Brand Guidelines Video',
    category: 'Meta Ads',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766898813/Meta_Ad_-_frame_at_0m4s_pc9gbn.jpg',
    videoUrl: 'https://www.youtube.com/embed/28GsBph5Fuw',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 9,
    title: 'Brand Guidelines Video',
    category: 'Meta Ads',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767023724/launcher_1_-_frame_at_0m34s_kbhz3y.jpg',
    videoUrl: 'https://www.youtube.com/embed/Prz9xOvFbw4',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 10,
    title: 'Brand Guidelines Video',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767024095/toastt_-_Trim_-_frame_at_0m1s_fzjvj9.jpg',
    videoUrl: 'https://youtube.com/embed/gnjneSot6_o?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 11,
    title: 'Brand Guidelines Video',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767024403/cafe_reel_-_frame_at_0m7s_fbz5b9.jpg',
    videoUrl: 'https://youtube.com/embed/z1P45tJzriw?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 12,
    title: 'Brand Guidelines Video',
    category: 'Storytelling Testimonial',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767024675/reel49_-_frame_at_0m15s_icrqnu.jpg',
    videoUrl: 'https://youtube.com/embed/y4hAXmbsnGI?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 13,
    title: 'Brand Guidelines Video',
    category: 'Storytelling Testimonial',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767026125/Typography_-_frame_at_0m19s_lir12k.jpg',
    videoUrl: 'https://youtube.com/embed/FEnBNLQoIa0?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 14,
    title: 'Brand Guidelines Video',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767026979/king_fab_-_frame_at_0m11s_ehe0b1.jpg',
    videoUrl: 'https://youtube.com/embed/COhZzCdoom0?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 15,
    title: 'Brand Guidelines Video',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027227/Video-423_-_frame_at_0m28s_nc5upc.jpg',
    videoUrl: 'https://youtube.com/embed/LGWS-82EMO8?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 16,
    title: 'Brand Guidelines Video',
    category: 'Generative AI Video',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027712/furniture_-_frame_at_0m24s_zbvyzm.jpg',
    videoUrl: 'https://youtube.com/embed/YMu3YgvcCyc?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 17,
    title: 'Brand Guidelines Video',
    category: 'Generative AI Video',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027999/ras_intro_-_frame_at_0m8s_usot8c.jpg',
    videoUrl: 'https://youtube.com/embed/d9aicMlhMSU?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 18,
    title: 'Brand Guidelines Video',
    category: 'Festival',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767028247/intro_-_frame_at_0m5s_dnxagh.jpg',
    videoUrl: 'https://youtube.com/embed/KiEyx2CLBE4?feature=share',
    description: 'Animated brand guidelines explaining logo usage, colors, and typography.',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 19,
    title: 'Brand Guidelines Video',
    category: 'Storytelling Testimonial',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767029010/gastro_1_-_frame_at_0m57s_xllywv.jpg',
    videoUrl: 'https://youtube.com/embed/ITzJr_9zZKI?feature=share',
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
            <CategoryButton
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
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
