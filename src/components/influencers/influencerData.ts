export interface Influencer {
  name: string;
  handle: string;
  followers: string;
  niche: string;
  quote: string;
}

export const influencers: Influencer[] = [
  {
    name: "Sapna Rai",
    handle: "@sapnaraich",
    followers: "100K+",
    niche: "Fashion & Lifestyle",
    quote:
      "Delivered high-converting aesthetic reels with smooth color grading and motion stories.",
  },
  {
    name: "Nidhi Shah",
    handle: "@shahnidhi.10",
    followers: "250K+",
    niche: "Entertainment & Acting",
    quote:
      "Crafted viral lifestyle short edits with custom transitions and trending sound cuts.",
  },
  {
    name: "Jal Hiradiya",
    handle: "@jalhiradiya",
    followers: "50K+",
    niche: "Fitness & Tech",
    quote:
      "Produced energetic, fast-paced video edits optimized for high engagement.",
  },
  {
    name: "Manali Gandhi",
    handle: "@manaligandhi",
    followers: "80K+",
    niche: "Beauty & Style",
    quote:
      "Sophisticated motion edits designed to elevate brand beauty campaigns.",
  },
  {
    name: "Srishti Dani",
    handle: "@srishtidani",
    followers: "120K+",
    niche: "Vlogging & Lifestyle",
    quote:
      "Engaging vertical reel edits packed with dynamic text overlays and seamless flow.",
  },
  {
    name: "Vishrut Kshatriya",
    handle: "@vishrutkshatriya",
    followers: "90K+",
    niche: "Digital Content",
    quote:
      "Punchy visual storytelling tailored to keep social audiences hooked.",
  },
  {
    name: "Om Parekh",
    handle: "@omparekh",
    followers: "75K+",
    niche: "Storytelling & Visuals",
    quote:
      "Dynamic typography animations and crisp audio-visual sync for viral impact.",
  },
  {
    name: "Dhruvil Shah",
    handle: "@dhruvilshah",
    followers: "110K+",
    niche: "Filmmaking & Edits",
    quote:
      "Clean cut edits with custom sound design and high-end visual pacing.",
  },
  {
    name: "Antra Agrawal",
    handle: "@antraagrawal",
    followers: "60K+",
    niche: "Lifestyle & Culture",
    quote:
      "Vibrant visual edits bringing brand concepts to life effortlessly.",
  },
  {
    name: "Tania Gupta",
    handle: "@taniagupta",
    followers: "200K+",
    niche: "Fashion & Influencer",
    quote:
      "Glamorous video edits designed for luxury brand collaborations and launches.",
  },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
