const inkLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Practice areas" },
  { href: "/case-studies", label: "Recent results" },
  { href: "/contact", label: "Contact" },
]

function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background py-32 md:py-40">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative">
            <span
              aria-label="404"
              className="leading-trim pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-tighter opacity-10 select-none"
              style={{ fontSize: "clamp(12rem, 44vw, 36rem)" }}
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
                className="leading-trim mx-auto block w-fit leading-none text-accent select-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
              >
                &ldquo;
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-light tracking-tight text-balance md:mt-6 md:text-4xl lg:text-5xl">
                Some pages, like some cases, simply aren&apos;t filed.
              </h1>
              <figcaption className="mt-7 text-sm text-muted-foreground md:mt-8">
                &mdash; a note from the bench, regarding the page you tried
              </figcaption>
            </figure>
          </div>

          <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:mt-14">
            {inkLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="size-1 rounded-full bg-foreground/30"
                  />
                )}
                <a
                  href={l.href}
                  className="text-foreground/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {l.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}

export default NotFound
