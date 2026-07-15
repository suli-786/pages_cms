'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowRight, Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';

import { UmmahMark, UmmahWordmark } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/#event' },
  { label: 'Partner With Us', href: '/#partners' },
  { label: 'About', href: '/#vision' },
];

const CTA = { label: 'Get Tickets', href: '/#newsletter' };

// Hardcoded Ummah Tech lockup: brand mark + wordmark. Both SVGs are decorative
// here — the wrapping link carries the accessible name. The wordmark inherits
// the nav text colour (Mist on the dark homepage nav, dark on a light backdrop).
function Brand({
  markClass,
  wordClass,
}: {
  markClass: string;
  wordClass: string;
}) {
  return (
    <>
      <UmmahMark aria-hidden className={markClass} />
      <UmmahWordmark aria-hidden className={wordClass} />
    </>
  );
}

function Navbar({ pathname = '/' }: { pathname?: string }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);
  const isDarkHero = pathname === '/';
  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(href + '/');
  const activeHref = navItems.find((item) => isActive(item.href))?.href;

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    lastY.current = y;
    if (y < 20) {
      setHidden(false);
      setScrolled(false);
    } else if (delta > 3) {
      setHidden(true);
      setScrolled(true);
    } else if (delta < -3) {
      setHidden(false);
    }
  });

  // Close the mobile menu when the route changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // The drawer and hamburger are `md:hidden` — they vanish at >=768px. If the
  // viewport crosses that line while the menu is open (rotate, resize, zoom),
  // every affordance for closing it disappears while `inert` + scroll-lock stay
  // applied, dead-locking the whole page. Close it when we leave mobile.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      if (mq.matches) setMenuOpen(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // While the drawer is open it behaves as a modal dialog: every top-level
  // element except the one hosting the drawer is `inert`, which makes the page
  // non-interactive AND keeps Tab inside the drawer without a manual trap. The
  // drawer's own host (this island) also holds the header, so the header opts
  // itself out separately via `inert={menuOpen}` below.
  useEffect(() => {
    if (!menuOpen) return;
    const host = drawerRef.current?.closest('body > *');
    // If the host lookup fails, inerting "everything except host" would inert
    // the drawer's own island too — a hard lockout. Bail rather than risk it.
    if (!host) return;
    const background = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el !== host && el instanceof HTMLElement && !el.inert,
    );
    background.forEach((el) => (el.inert = true));

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      background.forEach((el) => (el.inert = false));
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Opening moves focus into the drawer; closing returns it to the trigger.
  // Focus can't simply be left where it is on close: the drawer stays mounted
  // through its exit animation, so the element that had focus is still in the
  // DOM (but on its way out) at this point.
  useEffect(() => {
    if (menuOpen) {
      wasMenuOpen.current = true;
      menuCloseRef.current?.focus();
    } else if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      menuTriggerRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <motion.header
        inert={menuOpen}
        className={cn(
          'text-foreground fixed inset-x-0 top-0 z-50 transition-[margin] duration-300',
          (isDarkHero || scrolled) && 'dark',
          scrolled ? 'mt-3' : 'mt-0',
        )}
        animate={{ y: hidden ? '-150%' : '0%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div
          className={cn(
            'container transition-[max-width] duration-300',
            scrolled && 'max-w-6xl',
          )}
        >
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center gap-6 rounded-full border transition-all duration-300',
              scrolled
                ? // /90, not a lower alpha: the scrolled pill is always `.dark`
                  // (#0b0c2e) and floats over the light sections below the hero,
                  // so a more translucent fill drops the nav-link text and focus
                  // ring below WCAG AA against that composited backdrop.
                  'bg-background/90 ring-foreground/5 p-2.5 pl-5 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.45)] ring-1 backdrop-blur-2xl sm:pl-7'
                : 'border-transparent bg-transparent py-7 shadow-none ring-0',
            )}
          >
            <div className="flex flex-1 items-center">
              <a
                href="/"
                aria-label="Ummah Tech, home"
                className="focus-visible:ring-ring flex items-center gap-4 rounded-full outline-none focus-visible:ring-2"
              >
                <Brand
                  markClass={cn(
                    'w-auto transition-all duration-300',
                    scrolled ? 'h-9' : 'h-10',
                  )}
                  wordClass={cn(
                    'w-auto transition-all duration-300',
                    scrolled ? 'h-[18px]' : 'h-5',
                  )}
                />
              </a>
            </div>

            {/* Sliding capsule follows hover, and rests on the current section
                when nothing is hovered. */}
            <ul
              className="hidden items-center md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => {
                const active = isActive(item.href);
                const highlighted = (hovered ?? activeHref) === item.href;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'focus-visible:ring-ring relative block rounded-full px-4 py-2 text-[15px] transition-colors outline-none focus-visible:ring-2',
                        active || highlighted
                          ? 'text-foreground'
                          : 'text-foreground/75 hover:text-foreground',
                        active && 'font-medium',
                      )}
                    >
                      {highlighted && (
                        <motion.span
                          layoutId="nav-capsule"
                          aria-hidden
                          className="bg-foreground/10 absolute inset-0 -z-10 rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button
                size="lg"
                className={cn(
                  'hidden transition-all duration-300 md:inline-flex',
                  scrolled ? 'h-10 px-5' : 'h-11 px-6',
                )}
                asChild
              >
                <a href={CTA.href}>
                  {CTA.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                  />
                </a>
              </Button>
              <button
                ref={menuTriggerRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="border-foreground/15 text-foreground hover:bg-foreground/10 focus-visible:ring-ring grid size-10 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2 md:hidden"
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              aria-hidden
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="bg-background ring-foreground/10 absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col overflow-y-auto p-6 shadow-2xl ring-1"
            >
              <div className="flex items-center justify-between">
                <a
                  href="/"
                  aria-label="Ummah Tech, home"
                  onClick={() => setMenuOpen(false)}
                  className="focus-visible:ring-ring flex items-center gap-3.5 rounded-full outline-none focus-visible:ring-2"
                >
                  <Brand markClass="h-9 w-auto" wordClass="h-[18px] w-auto" />
                </a>
                <button
                  ref={menuCloseRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="border-foreground/15 text-foreground hover:bg-foreground/10 focus-visible:ring-ring grid size-10 place-items-center rounded-full border transition-colors outline-none focus-visible:ring-2"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-8">
                <ul className="flex flex-col">
                  {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'hover:text-foreground focus-visible:ring-ring block border-b py-4 text-lg tracking-tight transition-colors outline-none focus-visible:ring-2',
                            active
                              ? 'text-foreground font-semibold'
                              : 'text-foreground/75 font-medium',
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto pt-8">
                <Button size="lg" className="w-full" asChild>
                  <a href={CTA.href} onClick={() => setMenuOpen(false)}>
                    {CTA.label}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5"
                    />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
