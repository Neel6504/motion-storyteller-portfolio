import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaInstagram, FaUsers, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

interface Influencer {
  name: string;
  handle: string;
  followers: string;
  views?: string;
  niche: string;
  quote?: string;
}

const influencers: Influencer[] = [
  {
    name: "Sapna Rai",
    handle: "@sapnaraich",
    followers: "100K+",
    niche: "Fashion & Lifestyle",
    quote: "Delivered high-converting aesthetic reels with smooth color grading and motion stories."
  },
  {
    name: "Nidhi Shah",
    handle: "@shahnidhi.10",
    followers: "250K+",
    niche: "Entertainment & Acting",
    quote: "Crafted viral lifestyle short edits with custom transitions and trending sound cuts."
  },
  {
    name: "Jal Hiradiya",
    handle: "@jalhiradiya",
    followers: "50K+",
    niche: "Fitness & Tech",
    quote: "Produced energetic, fast-paced video edits optimized for high engagement."
  },
  {
    name: "Manali Gandhi",
    handle: "@manaligandhi",
    followers: "80K+",
    niche: "Beauty & Style",
    quote: "Sophisticated motion edits designed to elevate brand beauty campaigns."
  },
  {
    name: "Srishti Dani",
    handle: "@srishtidani",
    followers: "120K+",
    niche: "Vlogging & Lifestyle",
    quote: "Engaging vertical reel edits packed with dynamic text overlays and seamless flow."
  },
  {
    name: "Vishrut Kshatriya",
    handle: "@vishrutkshatriya",
    followers: "90K+",
    niche: "Digital Content",
    quote: "Punchy visual storytelling tailored to keep social audiences hooked."
  },
  {
    name: "Om Parekh",
    handle: "@omparekh",
    followers: "75K+",
    niche: "Storytelling & Visuals",
    quote: "Dynamic typography animations and crisp audio-visual sync for viral impact."
  },
  {
    name: "Dhruvil Shah",
    handle: "@dhruvilshah",
    followers: "110K+",
    niche: "Filmmaking & Edits",
    quote: "Clean cut edits with custom sound design and high-end visual pacing."
  },
  {
    name: "Antra Agrawal",
    handle: "@antraagrawal",
    followers: "60K+",
    niche: "Lifestyle & Culture",
    quote: "Vibrant visual edits bringing brand concepts to life effortlessly."
  },
  {
    name: "Tania Gupta",
    handle: "@taniagupta",
    followers: "200K+",
    niche: "Fashion & Influencer",
    quote: "Glamorous video edits designed for luxury brand collaborations and launches."
  }
];

function CreatorCard({
  influencer,
  creatorNumber,
  isFront,
  reduceMotion,
  onActivate,
}: {
  influencer: Influencer;
  creatorNumber: number;
  isFront: boolean;
  reduceMotion: boolean;
  onActivate?: () => void;
}) {
  const cardContent = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,hsl(var(--primary)/.16),transparent_35%)]" />
      <div className="absolute -bottom-5 -right-8 select-none font-display text-[7.5rem] font-semibold leading-none tracking-[-0.08em] text-foreground/[0.035]">
        {influencer.followers}
      </div>
      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
          <span>0{creatorNumber} / Creator</span>
        </div>

        <div className="relative mt-7 flex items-start gap-5">
          <div className="relative flex min-h-40 w-[46%] shrink-0 items-end overflow-hidden py-3">
            <div className="relative z-10">
              <motion.p animate={{ opacity: isFront ? 1 : 0.7, y: isFront ? 0 : 4 }} transition={{ duration: 0.45 }} className="text-[9px] uppercase tracking-[0.2em] text-primary">
                Views
              </motion.p>
              <motion.p animate={{ opacity: isFront ? 1 : 0.7, scale: isFront ? 1 : 0.97 }} transition={{ duration: 0.5 }} className="mt-2 font-display text-[2.6rem] font-semibold leading-none tracking-[-0.055em] text-foreground sm:text-5xl">
                {influencer.views ?? "--"}
              </motion.p>
              <p className="mt-2 max-w-[8rem] text-[8px] uppercase tracking-[0.12em] text-muted-foreground/50">Generated through edits</p>
            </div>
            <motion.svg
              viewBox="0 0 220 180"
              className="pointer-events-none absolute -left-8 -top-5 h-48 w-56 text-primary/20"
              animate={reduceMotion ? undefined : { rotate: [0, 2, -1, 0] }}
              transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <defs>
                <pattern id={`views-grid-${creatorNumber}`} width="18" height="18" patternUnits="userSpaceOnUse">
                  <path d="M18 0H0V18" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth=".6" />
                </pattern>
              </defs>
              <rect width="220" height="180" fill={`url(#views-grid-${creatorNumber})`} opacity=".4" />
              <ellipse cx="112" cy="90" rx="92" ry="40" fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth=".8" transform="rotate(-22 112 90)" />
              <path d="M16 144C68 94 130 110 205 28" fill="none" stroke="currentColor" strokeOpacity=".55" strokeWidth="1" />
              <circle cx="168" cy="56" r="2.5" fill="currentColor">
                {!reduceMotion && <animate attributeName="opacity" values=".3;1;.3" dur="2s" repeatCount="indefinite" />}
              </circle>
            </motion.svg>
          </div>
          <div className="min-w-0 pt-2">
            <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-primary/80">{influencer.niche.split(" & ")[0]}</p>
            <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[1.35rem]">
              {influencer.name}
            </h3>
            <p className="mt-1 text-xs tracking-[0.02em] text-muted-foreground">{influencer.handle}</p>
            <a
              href={`https://instagram.com/${influencer.handle.replace("@", "")}`}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="group/instagram relative z-10 mt-5 inline-flex items-center gap-2 border-b border-primary/50 pb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              aria-label={`Open ${influencer.name} on Instagram`}
            >
              <FaInstagram className="text-primary transition-transform duration-300 group-hover/instagram:translate-x-0.5" aria-hidden="true" />
              <span>View profile</span>
              <span className="text-primary transition-transform duration-300 group-hover/instagram:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        <div className="relative mt-auto max-w-[88%] pt-8">
          <FaQuoteLeft className="mb-3 text-sm text-primary/80" aria-hidden="true" />
          <p className="font-display text-[15px] leading-[1.45] text-foreground/85 sm:text-base">{influencer.quote}</p>
        </div>

        <div className="relative mt-7 flex items-end justify-between border-t border-white/[0.08] pt-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">{influencer.niche}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-4xl font-semibold leading-none tracking-[-0.06em] text-foreground">{influencer.followers}</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-primary/80">Followers</p>
          </div>
        </div>
        <div className="mt-5 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full origin-left bg-primary/70"
            initial={{ scaleX: 0.18 }}
            animate={{ scaleX: isFront ? 1 : 0.22 }}
            transition={{ duration: isFront ? 2.2 : 0.5, ease: "linear" }}
          />
        </div>
      </div>
      {isFront && <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-white/[0.04] transition-transform duration-700 group-hover:translate-x-[480%]" />}
    </>
  );

  if (!isFront) {
    return <div className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0d0c11] text-left shadow-[0_24px_60px_hsl(255_20%_0%_/_0.45)]">{cardContent}</div>;
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/[0.14] bg-[#0d0c11] text-left shadow-[0_28px_80px_hsl(255_20%_0%_/_0.58)] transition-transform duration-500 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={`Show ${influencer.name}`}
    >
      {cardContent}
    </button>
  );
}

// StackedInfluencers renders a click-to-cycle physical card deck.
function StackedInfluencers({
  items,
  visibleCount = 5,
  cardWidth = "min(360px, calc(100vw - 48px))",
  cardHeight = 500,
  spreadX = 0,
  spreadY = 12,
  duration = 0.35,
  ease = "easeOut",
  depthScale = 0.06,
  depthOpacity = 0.08,
  onSelect,
}: {
  items: Influencer[];
  visibleCount?: number;
  cardWidth?: number | string;
  cardHeight?: number;
  spreadX?: number;
  spreadY?: number;
  duration?: number;
  ease?: string;
  depthScale?: number;
  depthOpacity?: number;
  onSelect?: (index: number) => void;
}) {
  const count = items.length;
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const isRotating = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setOrder(items.map((_, i) => i));
  }, [items]);

  const visible = Math.max(1, Math.min(visibleCount, count));

  const rotate = useCallback(() => {
    if (isRotating.current) return;

    setOrder((prev) => {
      if (prev.length < 2) return prev;

      const outgoing = prev[0];
      isRotating.current = true;
      setLeavingIndex(outgoing);
      if (onSelect) onSelect(prev[1]);
      return prev.slice(1);
    });
  }, [onSelect]);

  useEffect(() => {
    if (shouldReduceMotion || count < 2) return;

    const rotationTimer = window.setInterval(rotate, 2800);
    return () => window.clearInterval(rotationTimer);
  }, [count, rotate, shouldReduceMotion]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      rotate();
    }
  };

  const visibleIndices = order.slice(0, visible);

  const transition = shouldReduceMotion ? { duration: 0 } : { duration, ease };

  return (
    <div className="relative w-full h-full select-none" aria-label="Influencer testimonials">
      {visibleIndices
        .map((idx, pos) => ({ idx, pos }))
        .reverse()
        .map(({ idx, pos }) => {
          const posFromFront = pos; // 0 = front, increasing toward the back
          const x = spreadX * posFromFront;
          const y = spreadY * posFromFront;
          const scale = Math.max(0.6, 1 - depthScale * posFromFront);
          const op = Math.max(0, 1 - depthOpacity * posFromFront);
          const z = 100 + (visible - posFromFront);
          const rotation = posFromFront === 0 ? 0 : posFromFront % 2 === 0 ? 1.8 : -1.8;

          const isFront = posFromFront === 0;

          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{ x, y, scale, opacity: op, rotate: rotation }}
              transition={transition}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: cardWidth,
                height: cardHeight,
                zIndex: z,
                cursor: isFront ? "pointer" : "default",
              }}
            >
              <CreatorCard
                influencer={items[idx]}
                creatorNumber={idx + 1}
                isFront={isFront}
                reduceMotion={Boolean(shouldReduceMotion)}
                onActivate={rotate}
              />
            </motion.div>
          );
        })}
      {leavingIndex !== null && (
        <motion.div
          key={`leaving-${leavingIndex}`}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, 24, 8],
            y: [0, -100, -100],
            scale: [1, 0.94, 0.86],
            opacity: [1, 1, 0],
            rotate: [0, -4, 6],
          }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            setOrder((prev) => prev.concat(leavingIndex));
            setLeavingIndex(null);
            isRotating.current = false;
          }}
          className="pointer-events-none absolute left-0 top-0 overflow-hidden rounded-[1.5rem]"
          style={{ width: cardWidth, height: cardHeight, zIndex: 200 }}
          aria-hidden="true"
        >
          <CreatorCard influencer={items[leavingIndex]} creatorNumber={leavingIndex + 1} isFront={false} reduceMotion={Boolean(shouldReduceMotion)} />
        </motion.div>
      )}
    </div>
  );
}


const InfluencersMarquee = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className="py-14 md:py-20 border-b border-border/50 overflow-hidden bg-background/50" aria-label="Influencers Worked With">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-xs md:text-sm">
            Collaborations
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3 text-foreground">
            Trusted By 9+ Influencers Globally
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto">
            Delivering high-retention video edits and motion graphics for creators with over 1.2M+ combined followers
          </p>
        </motion.div>

      


        {/* Stacked influencer cards (click front -> back) */}
        <div className="relative w-full flex justify-center mt-8">
          <div className="relative" style={{ width: "min(420px, calc(100vw - 40px))", height: 560, perspective: 1200 }}>
            {/* Manage a local order state for stack rotation */}
            <StackedInfluencers
              items={influencers}
              visibleCount={5}
              cardWidth="min(420px, calc(100vw - 40px))"
              cardHeight={520}
              spreadX={0}
              spreadY={10}
              duration={0.5}
              ease="easeOut"
              onSelect={(i) => setIndex(i)}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfluencersMarquee;
