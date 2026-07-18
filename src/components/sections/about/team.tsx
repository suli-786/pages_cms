import { MoveRight } from 'lucide-react';

import { Prose } from '@/components/elements/prose';
import { Button } from '@/components/ui/button';
import type { TeamContent } from '@/lib/about';
import { cn, isExternal } from '@/lib/utils';

// Who's behind Ummah Tech — bespoke and deliberately minimal.
//
// No source document names a single organiser, so this ships honest interim
// copy rather than a roster block with invented people. A team grid
// (@shadcnblocks/team15 is the pick) goes in here once real names, roles and
// photos exist — at which point this section grows a `members` list. The CMS
// model has no empty members field on purpose: fields for content that doesn't
// exist invite a half-filled roster, which is worse than saying "coming".
//
// The non-sectarian line lives here rather than in the closing CTA because this
// is where a visitor checking legitimacy looks for who is behind the project.
function Team({ content }: { content: TeamContent }) {
  const { heading, body, cta } = content;

  return (
    <section id="team" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container max-w-3xl">
        {heading && (
          <h2 className="text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}

        <Prose
          text={body}
          className={cn('space-y-6', heading && 'mt-8')}
          paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
        />

        {cta.label && cta.href && (
          <Button variant="outline" className="mt-10" asChild>
            <a
              href={cta.href}
              {...(isExternal(cta.href)
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {cta.label}
              <MoveRight
                className="transition-transform group-hover/button:translate-x-0.5"
                data-icon="inline-end"
              />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}

export default Team;
