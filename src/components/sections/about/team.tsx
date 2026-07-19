import type { ResolvedTeamContent } from '@/lib/images-about';

// Who's behind Ummah Tech — a plain photo wall (user decision, 2026-07-19:
// no interim prose; volunteer photos arrive via the CMS). Deliberately NOT a
// registry gallery block: the registry's galleries are product and portfolio
// cards (prices, hover overlays, per-item links), the wrong furniture for a
// wall of people. The grid follows the site's existing photo idiom instead —
// rounded-lg tiles, the story/hero rhythm.
//
// THE WHOLE SECTION RENDERS NOTHING WHILE EMPTY: a heading over an empty
// grid reads as a broken page. It appears when the first photo is added.
function Team({ content }: { content: ResolvedTeamContent }) {
  const { heading, photos } = content;
  const shots = photos.filter((p) => p.src);
  if (shots.length === 0) return null;

  return (
    <section id="team" className="section-padding scroll-mt-24 overflow-hidden">
      <div className="container">
        {heading && (
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-light tracking-tight text-balance md:text-5xl">
            {heading}
          </h2>
        )}

        <ul className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
          {shots.map((photo, i) => (
            <li key={i}>
              <img
                src={photo.src}
                srcSet={photo.srcSet}
                sizes={photo.sizes}
                loading="lazy"
                decoding="async"
                alt={photo.alt}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Team;
