'use client';

import { Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { SiteLogo } from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { useBannerVisibility } from '@/hooks/use-banner-visibility';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/#event' },
  { label: 'Partner With Us', href: '/#partners' },
  { label: 'About', href: '/#vision' },
];

// Uploaded logo (from Site settings) if set, otherwise the SVG mark + name.
function Brand({
  logo,
  siteName,
  imgClass,
  svgClass,
  textClass,
}: {
  logo?: string;
  siteName: string;
  imgClass: string;
  svgClass: string;
  textClass: string;
}) {
  if (logo) {
    return <img src={logo} alt={siteName} className={imgClass} />;
  }
  return (
    <>
      <SiteLogo className={svgClass} />
      <span className={textClass}>{siteName}</span>
    </>
  );
}

function Navbar({
  logo,
  siteName = 'Ummah Tech',
  initialBannerVisible = true,
  pathname = '/',
}: {
  logo?: string;
  siteName?: string;
  initialBannerVisible?: boolean;
  pathname?: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const { isBannerVisible } = useBannerVisibility(initialBannerVisible);
  const lastY = useRef(0);
  const isDarkHero = pathname === '/';
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
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

  // While the menu is open: lock scroll and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 text-foreground transition-[margin] duration-300',
          (isDarkHero || scrolled) && 'dark',
          scrolled ? 'mt-4' : isBannerVisible ? 'mt-14' : 'mt-0',
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
            className={cn(
              'flex items-center gap-6 rounded-xl border transition-all duration-300',
              scrolled
                ? 'bg-background/85 px-3 py-3 shadow-lg backdrop-blur-2xl sm:px-5'
                : 'border-transparent bg-transparent py-5 shadow-none',
            )}
          >
            <div className="flex flex-1 items-center">
              <a href="/" className="flex items-center gap-2.5">
                <Brand
                  logo={logo}
                  siteName={siteName}
                  imgClass="h-9 w-auto"
                  svgClass="size-9"
                  textClass="text-xl font-semibold tracking-tight"
                />
              </a>
            </div>

            <ul
              className="hidden items-center gap-9 md:flex"
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
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative text-sm transition-colors hover:text-foreground',
                        active ? 'text-foreground' : 'text-foreground/75',
                      )}
                    >
                      {item.label}
                      {highlighted && (
                        <motion.span
                          layoutId="nav-underline"
                          aria-hidden
                          className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-1 items-center justify-end gap-2">
              <Button size="lg" className="hidden md:inline-flex" asChild>
                <a href="/#newsletter">Get updates</a>
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5 md:hidden"
              >
                <Menu className="size-6" strokeWidth={1.5} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col bg-background p-6 shadow-2xl ring-1 ring-foreground/10"
            >
              <div className="flex items-center justify-between">
                <a
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Brand
                    logo={logo}
                    siteName={siteName}
                    imgClass="h-8 w-auto"
                    svgClass="size-8"
                    textClass="text-lg font-semibold tracking-tight"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/5"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <ul className="mt-8 flex flex-col">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'block border-b py-4 text-lg font-medium tracking-tight transition-colors hover:text-foreground',
                          active ? 'text-accent' : 'text-foreground/85',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <Button size="lg" className="w-full" asChild>
                  <a href="/#newsletter" onClick={() => setMenuOpen(false)}>
                    Get updates
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
