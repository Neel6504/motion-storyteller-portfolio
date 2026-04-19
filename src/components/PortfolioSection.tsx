import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ExternalLink, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['3D Animation', 'Motion Graphics',  'UGC', 'Wedding & events',  'Creative Typography', 'Logo Reveal', 'Meta Ads', 'Cafe works' , 'Fashion', 'Generative AI Video', 'Jewellery' ,'Shortfilm', 'Big Celebs', 'More After Effects Works'];

const CategoryButton = ({ category, isActive, onClick }: { category: string; isActive: boolean; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);  
  const [canHover, setCanHover] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const isShortfilm = category === 'Big Celebs';

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 300, damping: 30 });
  const translateZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 300, damping: 30 });

  // Parallax layers at different depths
  const parallaxLayer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  const parallaxLayer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 400, damping: 30 });
  
  const parallaxLayer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });
  const parallaxLayer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(canHover && !isMobile)) return;
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
      onMouseEnter={() => (canHover && !isMobile) && setIsHovered(true)}
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
          scale: isShortfilm 
            ? [1, 1.08, 1, 1.08, 1]
            : isHovered ? 1.08 : 1,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px rgba(239, 68, 68, 0.3)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
        transition={isShortfilm 
          ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 300, damping: 30 }
        }
        className={`relative text-xs md:text-sm px-4 py-2 font-medium rounded-md ${
          isShortfilm ? 'overflow-visible' : 'overflow-hidden'
        } ${
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

        {/* Spotlight effect (desktop only) */}
        {(canHover && !isMobile) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(239,68,68,0.2) 0%, transparent 50%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Text with parallax */}
        <motion.span 
          className="relative z-10"
          style={{
            translateZ: 30,
            x: parallaxLayer1X,
            y: parallaxLayer1Y,
          }}
          animate={isShortfilm ? {
            color: ['#ffffff', '#ff8c00', '#ffffff', '#ff8c00', '#ffffff'],
          } : category === 'Shortfilm' ? { color: '#ffffff' } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
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

        {/* Orange heartbeat glow for Shortfilm */}
        {isShortfilm && (
          <motion.div
            className="absolute inset-[-15px] pointer-events-none rounded-md"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.12), rgba(255, 100, 0, 0.78), transparent 70%)',
              filter: 'blur(15px)',
              boxShadow: '0 0 20px rgba(255, 140, 0, 0.25)',
            }}
            animate={{
              scale: [1, 1.4, 1, 1.4, 1],
              opacity: [0.4, 0.6, 0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Orange particles around Shortfilm */}
        {isShortfilm && [...Array(16)].map((_, i) => {
          const angle = (i * 22.5) * (Math.PI / 180);
          const distance = 40 + Math.random() * 30;
          const lifetime = 1.5 + Math.random() * 1;
          
          return (
            <motion.div
              key={`orange-particle-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2 + Math.random() * 2,
                height: 2 + Math.random() * 2,
                left: '50%',
                top: '50%',
                background: 'radial-gradient(circle, rgba(255, 140, 0, 0.9), rgba(255, 100, 0, 0.5))',
                boxShadow: '0 0 6px rgba(255, 140, 0, 0.7)',
              }}
              animate={{
                x: [0, distance * Math.cos(angle)],
                y: [0, distance * Math.sin(angle)],
                scale: [0.8, 1.2, 0],
                opacity: [0.8, 0.6, 0],
              }}
              transition={{
                duration: lifetime,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </motion.button>
    </motion.div>
  );
};

const projects = [
  {
    id: 1,
    title: 'Content Creation',
    category: '3D Animation',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766167814/Screenshot_2025-12-19_234001_l7d1gl.png',
    videoUrl: 'https://www.youtube.com/embed/M2cESo0s81w?feature=share',
    tools: ['Cinema 4D', 'After Effects'],
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766858278/metaloop_graphics_3_-_Copy_-_Trim_-_frame_at_0m2s_kxftqe.jpg',
    videoUrl: 'https://youtube.com/embed/s7zX_gLfKTw?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 3,
    title: 'Diamond Cycle',
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860017/diamond_cycle_-_Trim_-_frame_at_0m8s_cl0w99.jpg',
    videoUrl: 'https://youtube.com/embed/3oflYDt-0NQ?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 4,
    title: 'Diamond Zoom',
    category: '3D Animation',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860128/3d_diamond_-_frame_at_0m1s_zhhmba.jpg',
    videoUrl: 'https://youtube.com/embed/hLredCyMk_8?feature=share',
    tools: ['Cinema 4D', 'After Effects'],
  },
  {
    id: 5,
    title: 'TEDx at Charusat',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860493/event_reveal_-_frame_at_0m3s_jppxhk.jpg',
    videoUrl: 'https://youtube.com/embed/pABpwfMbo5c?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 6,
    title: 'Charusat Logo Reveal',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860729/Logo_Intro_-_frame_at_0m1s_z3cciq.jpg',
    videoUrl: 'https://www.youtube.com/embed/7qbdWk6i-mY',
    tools: ['After Effects'],
  },
  {
    id: 7,
    title: 'Visual Effects Reel',
    category: 'Logo Reveal',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766860926/logo_reveal_-_frame_at_0m0s_h7rfa2.jpg',
    videoUrl: 'https://www.youtube.com/embed/Ed3sG7-Z-bs',
    tools: ['After Effects'],
  },
  {
    id: 8,
    title: 'Messanger',
    category: 'Meta Ads',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1766898813/Meta_Ad_-_frame_at_0m4s_pc9gbn.jpg',
    videoUrl: 'https://www.youtube.com/embed/28GsBph5Fuw',
    tools: ['After Effects'],
  },
  {
    id: 9,
    title: 'Calculator Launcher',
    category: 'Meta Ads',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767023724/launcher_1_-_frame_at_0m34s_kbhz3y.jpg',
    videoUrl: 'https://www.youtube.com/embed/Prz9xOvFbw4',
    tools: ['After Effects'],
  },
  {
    id: 10,
    title: 'HOY',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775573852/image_x4orbt.jpg',
    videoUrl: 'https://youtube.com/embed/NVT_uIyW_hg?feature=share',
    tools: ['Premiere Pro'],
  },
  {
    id: 11,
    title: 'Mojito',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767024403/cafe_reel_-_frame_at_0m7s_fbz5b9.jpg',
    videoUrl: 'https://youtube.com/embed/z1P45tJzriw?feature=share',
    tools: ['Premiere Pro'],
  },
  {
    id: 12,
    title: 'Unhealthy Diet',
    category: 'UGC',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767024675/reel49_-_frame_at_0m15s_icrqnu.jpg',
    videoUrl: 'https://youtube.com/embed/y4hAXmbsnGI?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 13,
    title: 'Marketing School',
    category: 'UGC',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767026125/Typography_-_frame_at_0m19s_lir12k.jpg',
    videoUrl: 'https://youtube.com/embed/FEnBNLQoIa0?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 14,
    title: 'Clothing',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767026979/king_fab_-_frame_at_0m11s_ehe0b1.jpg',
    videoUrl: 'https://youtube.com/embed/COhZzCdoom0?feature=share',
    tools: ['Premiere Pro'],
  },
  {
    id: 15,
    title: 'Female Dress',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027227/Video-423_-_frame_at_0m28s_nc5upc.jpg',
    videoUrl: 'https://youtube.com/embed/LGWS-82EMO8?feature=share',
    tools: ['After Effects', 'Illustrator', 'Premiere Pro'],
  },
  {
    id: 16,
    title: 'Furniture',
    category: 'Generative AI Video',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027712/furniture_-_frame_at_0m24s_zbvyzm.jpg',
    videoUrl: 'https://youtube.com/embed/YMu3YgvcCyc?feature=share',
    tools: ['After Effects', 'Generative AI'],
  },
  {
    id: 17,
    title: 'Moradiya Ras',
    category: 'Generative AI Video',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767027999/ras_intro_-_frame_at_0m8s_usot8c.jpg',
    videoUrl: 'https://youtube.com/embed/d9aicMlhMSU?feature=share',
    tools: ['After Effects', 'Generative AI'],
  },
  {
    id: 18,
    title: 'Meet Jain',
    category: 'Big Celebs',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775573087/image_ez5uja.jpg',
    videoUrl: 'https://youtube.com/embed/-CErKbpmwc8',
    tools: ['After Effects'],
  },
  {
    id: 19,
    title: 'Gastro',
    category: 'UGC',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767029010/gastro_1_-_frame_at_0m57s_xllywv.jpg',
    videoUrl: 'https://youtube.com/embed/ITzJr_9zZKI?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 20,
    title: 'Ring Choose',
    category: 'Jewellery',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767116198/ring_choose_-_frame_at_0m7s_md23zk.jpg',
    videoUrl: 'https://youtube.com/embed/S8Ah77OdqKg?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 21  ,
    title: 'Diamond Showcase',
    category: 'Jewellery',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767116655/vasant_diamond_-_frame_at_0m7s_xjvtx7.jpg',
    videoUrl: 'https://youtube.com/embed/eBNUSdUINqg?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 22,
    title: 'Over Text',
    category: 'Jewellery',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767116820/lgd_overtext_-_Trim_-_frame_at_0m5s_yuaucb.jpg',
    videoUrl: 'https://youtube.com/embed/jSThINk5K0w?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 23,
    title: 'Amenities Showcase',
    category: 'More After Effects Works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767117048/vraj_wave_1_-_frame_at_0m7s_niuuck.jpg',
    videoUrl: 'https://youtube.com/embed/eC1nbG8PGss?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 24,
    title: 'Carousel Video',
    category: 'More After Effects Works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767117261/vraj_carousel_-_Trim_-_frame_at_0m4s_wd1lju.jpg',
    videoUrl: 'https://youtube.com/embed/BdPu8nhkJso?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 25,
    title: 'Sketch',
    category: 'More After Effects Works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767117427/sketch_-_Trim_-_frame_at_0m7s_dddogb.jpg',
    videoUrl: 'https://youtube.com/embed/cZ_BjtrDm6M?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 26,
    title: 'Trailer',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767117731/Trailer_-_Trim_-_frame_at_0m2s_qq4jbf.jpg',
    videoUrl: 'https://youtube.com/embed/NjdCBY-c0T0?feature=share',
    tools: ['After Effects'],
  },
  {
    id: 27,
    title: 'Wedding Film',
    category: 'Wedding & events',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1767155754/Wedding_-_frame_at_0m40s_lqseqa.jpg',
    videoUrl: 'https://youtube.com/embed/-tDuOCQdHYo',
    tools: ['Capcut'],
  },
  {
    id: 27,
    title: 'The Rehearsal',
    category: 'Shortfilm',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1768326852/WhatsApp_Image_2026-01-08_at_21.35.50_hsp29h.jpg',
    videoUrl: 'https://youtube.com/embed/0sZEzzBKcms',
    tools: ['Premiere Pro'],
    description: 'The Rehearsal is a psychological thriller that explores the fragile boundary between performance and reality. As an actor immerses herself deeply into a role during rehearsal, the lines between acting, memory, and truth begin to blur, leading to an unsettling confrontation with her own mind.',
    achievement: 'Successfully secured 4th position in shortfilm making competition among 18 other shortfilms.',
  },
  {
    id: 28,
    title: 'Paneri - A Fashion Story',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773258525/paneri_-_frame_at_0m21s_mm0shq.jpg',
    videoUrl: 'https://youtube.com/embed/afi95FpRuDY?feature=share',
    tools: ['Premiere Pro'],
  },
  {
    id: 29,
    title: 'Mokari',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773258696/mokari_-_frame_at_0m3s_k6emwd.jpg',
    videoUrl: 'https://youtube.com/embed/fKGlQ5jBs3Q?feature=share',
    tools: ['After Effects', 'Premiere Pro'],
  },
  {
    id: 30,
    title: 'Desaii Global Group',
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773258823/desaii_group_1_-_frame_at_0m24s_toexgh.jpg',
    videoUrl: 'https://youtube.com/embed/5JFPK0ZvKAY?feature=share',
    tools: ['After Effects'],
  },

  {
    id: 31,
    title: 'Rajvi Makeup',
    category: 'Fashion',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773258989/rajvi_1_-_frame_at_0m54s_dozdto.jpg',
    videoUrl: 'https://youtube.com/embed/zA8vER44rNE?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 32,
    title: 'Purva Pandey',
    category: 'Creative Typography',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773259156/Sequence_01_-_frame_at_0m11s_nz1igk.jpg',
    videoUrl: 'https://youtube.com/embed/Zcl8xRxZrTw?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 33,
    title: 'Atha for All',
    category: 'Big Celebs',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773259496/mixed_start_-_frame_at_0m0s_xmi5sf.jpg',
    videoUrl: 'https://youtube.com/embed/2ImsdMj-kP0?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 34,
    title: 'Atha for All',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773259693/atha_2_-_frame_at_0m4s_vj1oub.jpg',
    videoUrl: 'https://youtube.com/embed/1_BKyeBLRjQ?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 35,
    title: 'Kooffee',
    category: 'Cafe works',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773259778/kooffee_-_frame_at_0m0s_qczun6.jpg',
    videoUrl: 'https://youtube.com/embed/1_BKyeBLRjQ?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 36,
    title: 'Jal Tarang Waterpark',
    category: 'Big Celebs',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1773259957/jal_tarang_-_frame_at_0m4s_lc6rz1.jpg',
    videoUrl: 'https://youtube.com/embed/o_TK2dBhHUE?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 37,
    title: 'PIT PUB, CAN',
    category: 'Wedding & events',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775572870/image_q8tosm.jpg',
    videoUrl: 'https://youtube.com/embed/L3JOQW7PgNA?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 38,
    title: 'Jal Tarang Waterpark',
    category: 'UGC',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775573397/image_hpjovm.jpg',
    videoUrl: 'https://youtube.com/embed/Gci3vOmLtkU?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 39,
    title: 'Radhika Bhardwaj',
    category: 'Creative Typography',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775573575/image_naubhn.jpg',
    videoUrl: 'https://youtube.com/embed/woFo-l-hIH4?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 40,
    title: 'Inspire DJ, CAN',
    category: 'Wedding & events',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776267218/image_f56akd.jpg',
    videoUrl: 'https://youtube.com/embed/xgTiKfPqPJo?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 41,
    title: 'RJ Hardik',
    category: 'Wedding & events',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776267328/image_syb83x.jpg',
    videoUrl: 'https://youtube.com/embed/idE11TALC7Q?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 42,
    title: 'CA',
    category: 'UGC',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776627383/image_reregn.jpg',
    videoUrl: 'https://youtube.com/shorts/zs1DRfsP_Ic?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 42,
    title: 'CA',
    category: 'Motion Graphics',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776627343/image_c3p9nz.jpg',
    videoUrl: 'https://youtube.com/embed/zs1DRfsP_Ic?feature=share',
    tools: ['Premiere Pro'],
  },

  {
    id: 42,
    title: 'Dimple Biscuitwala',
    category: 'Big Celebs',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1775573308/image_xzisu4.jpg',
    videoUrl: 'https://youtube.com/embed/GFzf6H3VTlY',
    tools: ['Premiere Pro'],
  },

  {
    id: 43,
    title: 'Dimple Biscuitwala',
    category: 'Wedding & events',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776266955/image_st25zq.jpg',
    videoUrl: 'https://youtube.com/embed/jFX4MIFvKlY',
    tools: ['Premiere Pro'],
  },

  {
    id: 44,
    title: 'Oviyana Jewellery',
    category: 'Generative AI Video',
    thumbnail: 'https://res.cloudinary.com/dlwztbh9v/image/upload/v1776629885/image_oj2kwo.jpg',
    videoUrl: 'https://youtube.com/embed/E6NGXLU9JlQ?feature=share',
    tools: ['Premiere Pro'],
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
            A curated collection of projects showcasing expertise across motion design, Animation and Generative AI.
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
              className="relative w-[90%] max-w-sm sm:max-w-xl lg:max-w-4xl max-h-[85vh] bg-card rounded-xl overflow-hidden border border-border flex flex-col"
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
                  <h3 id="modal-title" className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">
                    {selectedProject.title}
                  </h3>

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
                    
                    {selectedProject.description && (
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Description</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedProject.description}
                        </p>
                        {(selectedProject as any).achievement && (
                          <p className="text-sm font-black mt-3" style={{ fontWeight: 900 }}>
                            {(selectedProject as any).achievement}
                          </p>
                        )}
                      </div>
                    )}
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
