import { ChevronRight, Mail, MessageSquare } from 'lucide-react';

import { renderEmphasis } from '@/components/elements/emphasis';
import { Prose } from '@/components/elements/prose';
import type { PartnerContactContent } from '@/lib/partner';

// Start the conversation — adapted from @shadcnblocks/cta3: a bordered
// two-column strip with headline and copy on one side and two clickable
// channel cards on the other. The block's two subfeature cards become the
// page's two contact channels: direct email (primary, listed first — sponsors
// expect a human reply, not a form pipeline) and the homepage contact form's
// "Partner With Us" track.
function Contact({ content }: { content: PartnerContactContent }) {
  const { heading, body, email, formCta, formNote } = content;

  const channels = [
    email && {
      icon: Mail,
      title: email,
      description:
        "Tell us who you are and what you have in mind — we'll reply directly.",
      href: `mailto:${email}?subject=Partnership`,
    },
    formCta.label &&
      formCta.href && {
        icon: MessageSquare,
        title: formCta.label,
        description: formNote,
        href: formCta.href,
      },
  ].filter(Boolean) as {
    icon: typeof Mail;
    title: string;
    description: string;
    href: string;
  }[];

  return (
    <section
      id="contact"
      className="section-padding scroll-mt-24 overflow-hidden"
    >
      <div className="container">
        <div className="border-border grid grid-cols-1 gap-10 rounded-lg border p-6 md:p-10 lg:grid-cols-2 lg:px-16 lg:py-14">
          <div>
            {heading && (
              <h2 className="text-3xl leading-[1.05] font-light tracking-tight text-balance md:text-4xl">
                {renderEmphasis(heading)}
              </h2>
            )}
            <Prose
              text={body}
              className="mt-6 space-y-4"
              paragraphClassName="text-muted-foreground leading-relaxed text-pretty"
            />
          </div>

          {channels.length > 0 && (
            <ul className="flex flex-col justify-center gap-4">
              {channels.map((channel, i) => (
                <li key={i}>
                  <a
                    href={channel.href}
                    className="border-border hover:bg-muted focus-visible:ring-ring flex items-center justify-between gap-3 rounded-lg border px-6 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <span className="flex items-start gap-3">
                      <channel.icon
                        aria-hidden
                        className="text-accent mt-0.5 size-4 shrink-0"
                      />
                      <span>
                        <span className="text-foreground block font-medium">
                          {channel.title}
                        </span>
                        {channel.description && (
                          <span className="text-muted-foreground mt-1 block text-sm text-pretty">
                            {channel.description}
                          </span>
                        )}
                      </span>
                    </span>
                    <ChevronRight
                      aria-hidden
                      className="text-muted-foreground size-5 shrink-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
