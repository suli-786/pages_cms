'use client';

import { useState } from 'react';

import { MoveRight } from 'lucide-react';
import { motion } from 'motion/react';

import SectionHeader from '@/components/elements/section-header';
import type { Speaker, SpeakersContent } from '@/lib/home';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Viewfinder-framed CTA — the section's old decorative corner-bracket mark,
// made functional: the brackets now frame the "Interested in speaking?" link.
// On hover the corners spread and take the accent colour.
function FramedCta({ label, href }: { label: string; href: string }) {
  const corner =
    'absolute size-3 border-foreground/40 transition-all duration-300 group-hover:size-4 group-hover:border-accent';
  return (
    <a
      href={href}
      className="group focus-visible:ring-ring relative inline-flex items-center gap-2.5 px-6 py-5 font-mono text-xs tracking-[0.18em] uppercase outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span
        aria-hidden
        className={cn(corner, 'top-0 left-0 border-t border-l')}
      />
      <span
        aria-hidden
        className={cn(corner, 'top-0 right-0 border-t border-r')}
      />
      <span
        aria-hidden
        className={cn(corner, 'bottom-0 left-0 border-b border-l')}
      />
      <span
        aria-hidden
        className={cn(corner, 'right-0 bottom-0 border-r border-b')}
      />
      {label}
      <MoveRight
        aria-hidden
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.25}
      />
    </a>
  );
}

function Team({ content }: { content: SpeakersContent }) {
  const { heading, description, cta, items = [] } = content;
  const speakers = items.filter((p) => p.portrait);

  return (
    <section
      id="speakers"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <SectionHeader
          heading={heading}
          description={description}
          mark={
            cta.label && cta.href ? (
              <FramedCta label={cta.label} href={cta.href} />
            ) : undefined
          }
        />
      </div>

      <div className="container mt-12 md:mt-16 lg:mt-20">
        {/* flex-wrap instead of grid so an incomplete last row centres itself
            (grid pins orphans to the left). Cards per row: 3 on mobile — keeps
            the section to a couple of short rows instead of a long scroll —
            then 4 from md and 5 from lg. Widths subtract the row's gaps. */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {speakers.map((p, i) => (
            <MemberCard
              key={`${p.name}-${i}`}
              p={p}
              index={i}
              className="w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({
  p,
  index,
  className,
}: {
  p: Speaker;
  index: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 5) * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={`${p.name}, ${p.role} — ${p.theme}`}
      className={cn(
        'group focus-visible:ring-ring relative aspect-[3/4] overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        className,
      )}
    >
      <motion.img
        src={p.portrait}
        alt={p.name}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="absolute inset-0 size-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-2.5 text-white md:p-4">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h3 className="text-sm leading-tight font-light tracking-tight md:text-lg">
            {p.name}
          </h3>
          <p className="mt-1.5 font-mono text-[0.5rem] tracking-[0.18em] text-white/70 uppercase md:text-[0.55rem]">
            {p.role}
          </p>
        </motion.div>

        <motion.div
          aria-hidden={!hovered}
          initial={false}
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? '0.6rem' : 0,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 font-mono text-[0.5rem] tracking-[0.18em] text-white/85 uppercase md:text-[0.55rem]">
            <span aria-hidden className="bg-accent block h-px w-5" />
            {p.theme}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default Team;
