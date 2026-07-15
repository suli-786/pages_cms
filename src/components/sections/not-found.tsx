const inkLinks = [
  { href: '/', label: 'Home' },
  { href: '/#speakers', label: 'Speakers' },
  { href: '/#contact', label: 'Get in touch' },
];

function NotFound() {
  return (
    <section className="bg-background relative flex min-h-[100svh] items-center justify-center overflow-hidden py-32 md:py-40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative">
            <span
              aria-label="404"
              className="leading-trim pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-tighter opacity-10 select-none"
              style={{ fontSize: 'clamp(12rem, 44vw, 36rem)' }}
            >
              <span aria-hidden>4</span>
              <span aria-hidden className="text-accent">
                0
              </span>
              <span aria-hidden>4</span>
            </span>

            <figure className="relative">
              <span
                aria-hidden
                className="leading-trim text-accent mx-auto block w-fit leading-none select-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
              >
                &ldquo;
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-light tracking-tight text-balance md:mt-6 md:text-4xl lg:text-5xl">
                This page took a wrong turn.
              </h1>
              <figcaption className="text-muted-foreground mt-7 text-sm md:mt-8">
                &mdash; the page you tried to reach isn&apos;t here
              </figcaption>
            </figure>
          </div>

          <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:mt-14">
            {inkLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="bg-foreground/30 size-1 rounded-full"
                  />
                )}
                <a
                  href={l.href}
                  className="text-foreground/80 hover:text-accent underline-offset-4 transition-colors hover:underline"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
