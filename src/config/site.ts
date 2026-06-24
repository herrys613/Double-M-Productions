import {
  CalendarClock,
  Disc3,
  SlidersHorizontal,
  Speaker,
  Home,
  Sun,
  type LucideIcon,
} from "lucide-react";

/** A single clickable destination inside a dropdown. */
export type NavChild = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

/** A top-level nav entry: either a plain link or a dropdown with children. */
export type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      // Optional promo card shown on the left of the dropdown panel.
      // `image` is a path under /public (e.g. "/studio.jpg").
      featured?: {
        title: string;
        description: string;
        href: string;
        image: string;
      };
      items: NavChild[];
    };

// Primary nav — the single source of truth for the navbar (and footer).
// Route slugs match the Phase 1 route map in CLAUDE.md.
export const NAV_MENU: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Music Studio",
    featured: {
      title: "Music Studio",
      description:
        "Pro recording, mixing & mastering in a room built for sound.",
      href: "/studio",
      image: "/music-studio.png",
    },
    items: [
      {
        label: "Studio Overview",
        href: "/studio",
        description: "Our rooms, gear and full service list.",
        icon: SlidersHorizontal,
      },
      {
        label: "Book a Session",
        href: "/studio/book",
        description: "Reserve studio time with our engineers.",
        icon: CalendarClock,
      },
      {
        label: "Audio Library",
        href: "/studio/audio-library",
        description: "Browse beats, stems and samples.",
        icon: Disc3,
      },
    ],
  },
  {
    label: "Live Shows",
    featured: {
      title: "Live Shows",
      description:
        "Full-service production for live events, from sound to lighting.",
      href: "/live-shows",
      image: "/live-shows.png",
    },
    items: [
      {
        label: "Live Shows Overview",
        href: "/live-shows",
        description: "Our live show production overview.",
        icon: Home,
      },
      {
        label: "Summer Shows",
        href: "/live-shows/summer-shows",
        description: "Outdoor concerts and summer events.",
        icon: Sun,
      },
      {
        label: "Concerts",
        href: "/live-shows/concerts",
        description: "Headline concerts and live tours.",
        icon: Speaker,
      },
    ],
  },
  { label: "The Music Mingle", href: "/music-mingle" },
  { label: "Contact", href: "/contact" },
];

export const SITE = {
  name: "Double M Productions",
  shortName: "Double M",
} as const;

export const CONTACT = {
  phone: "+1 (347) 201-1386",
  email: "info@doublempro.com",
} as const;

export const SOCIALS = {
  twitter: "https://twitter.com/doublempro1",
  instagram: "https://instagram.com/double_m_pro",
  youtube: "https://youtube.com/",
  facebook: "https://facebook.com/",
  whatsapp: "https://wa.me/13472011386",
} as const;
