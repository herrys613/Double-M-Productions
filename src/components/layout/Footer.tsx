import { Link } from "react-router-dom";
import { Instagram, Twitter, Youtube, Facebook } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { NAV_MENU, SITE, SOCIALS, CONTACT } from "@/config/site";

// WhatsApp brand glyph (lucide has no WhatsApp icon).
function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIALS.instagram, Icon: Instagram },
  { label: "Twitter", href: SOCIALS.twitter, Icon: Twitter },
  { label: "YouTube", href: SOCIALS.youtube, Icon: Youtube },
  { label: "Facebook", href: SOCIALS.facebook, Icon: Facebook },
  { label: "WhatsApp", href: SOCIALS.whatsapp, Icon: WhatsappIcon },
];

// Right-side link columns: one per dropdown group (its sub-menu items).
const LINK_COLUMNS = NAV_MENU.flatMap((item) =>
  "items" in item
    ? [{ title: item.label, links: item.items.map((c) => ({ label: c.label, href: c.href })) }]
    : []
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand + socials */}
          <div className="max-w-xs">
            <img
              src="/logo.png"
              alt={`${SITE.name} logo`}
              className="h-10 w-auto"
              width={146}
              height={100}
            />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Recording studio, live show production, and audio library — built
              by people who love the craft.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Sub-menu columns + company contact */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {LINK_COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                  {col.title}
                </h3>
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            ))}

            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                Company
              </h3>
              <a
                href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {year} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
