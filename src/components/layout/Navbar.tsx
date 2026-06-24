import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NAV_MENU, SITE, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Which top-level mobile menu group is currently expanded (accordion).
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open; collapse groups on close.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setExpanded(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "transition-colors duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container className="flex h-18 items-center justify-between py-4">
          <NavLink
            to="/"
            aria-label={`${SITE.name} — home`}
            className="rounded-sm"
          >
            <img
              src="/logo.png"
              alt={`${SITE.name} logo`}
              className="h-9 w-auto"
              width={132}
              height={90}
            />
          </NavLink>

          {/* Desktop mega-menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAV_MENU.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="primary" size="sm">
              <Link to="/studio/book">Book a Session</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-18 z-40 overflow-y-auto bg-background lg:hidden"
          >
            <Container className="flex flex-col py-6">
              {NAV_MENU.map((item, i) => {
                const isExpanded = expanded === item.label;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="border-b border-border/70 py-4"
                  >
                    {"href" in item ? (
                      <NavLink
                        to={item.href}
                        end={item.href === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "block text-2xl font-medium tracking-tight",
                            isActive ? "text-brand" : "text-foreground"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <div>
                        {/* Tap the top-level label to expand its sub-menu. */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(isExpanded ? null : item.label)
                          }
                          aria-expanded={isExpanded}
                          className="flex w-full items-center justify-between text-2xl font-medium tracking-tight text-foreground"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "size-6 shrink-0 text-muted transition-transform duration-300",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pt-3 pl-1">
                                {item.items.map((child) => (
                                  <NavLink
                                    key={child.href}
                                    to={child.href}
                                    end
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                      cn(
                                        "py-2 text-lg font-medium",
                                        isActive ? "text-brand" : "text-muted"
                                      )
                                    }
                                  >
                                    {child.label}
                                  </NavLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              <Button asChild variant="primary" size="lg" className="mt-6 w-full">
                <Link to="/studio/book" onClick={() => setOpen(false)}>
                  Book a Session
                </Link>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  // Plain link (no dropdown).
  if ("href" in item) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <NavLink
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn("flex-row!", isActive && "text-brand")
            }
          >
            {item.label}
          </NavLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  // Dropdown.
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div
          className={cn(
            "grid items-start gap-1.5 p-2",
            item.featured
              ? "w-max grid-cols-[18rem_auto]"
              : "w-88 grid-cols-1"
          )}
        >
          {item.featured && (
            <NavigationMenuLink asChild className="p-0">
              <Link
                to={item.featured.href}
                className="group flex flex-col self-start overflow-hidden rounded-lg border border-border bg-surface-raised"
              >
                {/* Photo sits in its own area at the top of the card. */}
                <div className="aspect-video overflow-hidden bg-surface">
                  <img
                    src={item.featured.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Text below the photo. */}
                <div className="p-3">
                  <p className="text-base font-semibold text-foreground">
                    {item.featured.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">
                    {item.featured.description}
                  </p>
                </div>
              </Link>
            </NavigationMenuLink>
          )}

          <ul className="grid gap-0.5">
            {item.items.map((child) => (
              <li key={child.href}>
                <NavigationMenuLink asChild>
                  <Link to={child.href} className="flex-row! items-start gap-3">
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-surface-raised text-brand">
                      <child.icon className="size-4" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-base font-medium text-foreground">
                        {child.label}
                      </span>
                      <span className="text-sm whitespace-nowrap text-muted">
                        {child.description}
                      </span>
                    </span>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
