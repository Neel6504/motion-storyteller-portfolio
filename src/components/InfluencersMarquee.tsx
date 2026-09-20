import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaInstagram, FaUsers, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

interface Influencer {
  name: string;
  handle: string;
  followers: string;
  views?: string;
  profession: string;
  niche: string;
  quote?: string;
}

const influencers: Influencer[] = [
  {
    name: "Sapna Rai",
    handle: "@sapnaraich",
    followers: "185K+",
    views: "84k+",
    profession: "Fashion Creator",
    niche: "Fashion & Lifestyle",
    quote: "Delivered high-converting aesthetic reels with smooth color grading and motion stories."
  },
  {
    name: "Nidhi Shah",
    handle: "@shahnidhi.10",
    followers: "73k+",
    views: "61k+",
    profession: "Actor & Creator",
    niche: "Entertainment & Acting",
    quote: "Crafted viral lifestyle short edits with custom transitions and trending sound cuts."
  },
  {
    name: "Jal Hiradiya",
    handle: "@jalhiradiya",
    followers: "23k+",
    views: "30k+",
    profession: "Creator, Videographer & Agency owner",
    niche: "Fashion & Lifestyle",
    quote: "Produced energetic, fast-paced video edits optimized for high engagement."
  },
  {
    name: "Manali Gandhi",
    handle: "@themanaligandhi",
    followers: "168K+",
    views: "250k+",
    profession: "Beauty Creator",
    niche: "Beauty & Style",
    quote: "Sophisticated motion edits designed to elevate brand beauty campaigns."
  },
  {
    name: "Srishti Dani",
    handle: "@srishtieforyou",
    followers: "112K+",
    views: "25k+",
    profession: "Vlogger & Creator",
    niche: "Vlogging, Fashion & Lifestyle",
    quote: "Engaging vertical reel edits packed with dynamic text overlays and seamless flow."
  },
  {
    name: "Vishrut Kshatriya",
    handle: "@vishrut_kshatriya",
    followers: "1000+",
    views: "50k+",
    profession: "Photographer",
    niche: "Photographer & Videographer",
    quote: "Punchy visual storytelling tailored to keep social audiences hooked."
  },
  {
    name: "Om Parekh",
    handle: "@om_.parekh",
    followers: "2000+",
    views: "25k+",
    profession: "Agency owner",
    niche: "Storytelling & Business",
    quote: "Dynamic typography animations and crisp audio-visual sync for viral impact."
  },
  {
    name: "Dhruvil Shah",
    handle: "@dhruvilverse",
    followers: "5K+",
    views: "10k+",
    profession: "Creator",
    niche: "Creator",
    quote: "Clean cut edits with custom sound design and high-end visual pacing."
  },
  {
    name: "Antra Agrawal",
    handle: "@antra_agrawal24",
    followers: "145K+",
    views: "685k+",
    profession: "Lifestyle Creator",
    niche: "Lifestyle & Beauty",
    quote: "Vibrant visual edits bringing brand concepts to life effortlessly."
  },
  {
    name: "Tania Gupta",
    handle: "@glamlook_by_taniee",
    followers: "145K+",
    views: "172k+",
    profession: "Fashion Influencer",
    niche: "Fashion & Influencer",
    quote: "Glamorous video edits designed for luxury brand collaborations and launches."
  }
];

function parseViews(value?: string): number {
  if (!value) return 0;

  const normalizedValue = value.toLowerCase().replace(/,/g, "").trim();
  const amount = Number.parseFloat(normalizedValue);

  if (Number.isNaN(amount)) return 0;
  if (normalizedValue.endsWith("m+")) return amount * 1_000_000;
  if (normalizedValue.endsWith("k+")) return amount * 1_000;
  return amount;
}

function formatCombinedViews(): string {
  const totalViews = influencers.reduce((total, influencer) => total + parseViews(influencer.views), 0);

  if (totalViews >= 1_000_000) return `${(totalViews / 1_000_000).toFixed(1)}M+`;
  if (totalViews >= 1_000) return `${Math.round(totalViews / 1_000)}K+`;
  return `${Math.round(totalViews)}+`;
}

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
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-6 border-b border-white/[0.08] pb-7">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/70">
              0{creatorNumber}
            </p>
            <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Views
            </p>
            <motion.p
              animate={{ opacity: isFront ? 1 : 0.65, scale: isFront ? 1 : 0.97 }}
              transition={{ duration: 0.5 }}
              className="mt-2 font-display text-3xl font-semibold leading-none tracking-[-0.05em] text-foreground sm:text-4xl"
            >
              {influencer.views ?? "--"}
            </motion.p>
            <p className="mt-3 max-w-[7rem] text-[8px] uppercase leading-[1.5] tracking-[0.12em] text-muted-foreground/60">
              Generated through edits
            </p>
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-primary">
              {influencer.profession}
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-[1.8rem]">
              {influencer.name}
            </h3>
            <p className="mt-2 text-xs tracking-[0.02em] text-muted-foreground">{influencer.handle}</p>
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

        <div className="relative max-w-[94%] pt-7">
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
  const activeInfluencer = influencers[index];
  const combinedViews = formatCombinedViews();

  return (
    <section className="py-14 md:py-20 border-b border-border/50 overflow-hidden bg-background/50" aria-label="Influencers Worked With">
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid items-center gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)] md:gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl text-left"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary md:text-sm">
            Creator collaborations
          </p>
          <h2 className="mb-5 max-w-lg font-display text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-foreground md:text-6xl">
            Turning creators into brands.
          </h2>
          <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
            High-retention edits and motion graphics built for creators who want every frame to earn attention.
          </p>
          <div className="mt-9 flex items-end gap-8 border-t border-border/70 pt-5">
            <div>
              <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-foreground">{combinedViews}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Combined reach</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-foreground">9+</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Creator partners</p>
            </div>
          </div>
          <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Now featuring <span className="text-primary">{activeInfluencer.name}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex w-full justify-center md:justify-end"
        >
          <div className="relative" style={{ width: "min(420px, calc(100vw - 40px))", height: 560, perspective: 1200 }}>
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
        </motion.div>
      </div>
    </section>
  );
};

export default InfluencersMarquee;
