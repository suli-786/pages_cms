"use client"

import { MoveUpRight } from "lucide-react"
import { motion } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { BlogFrontmatter } from "@/lib/types"
import { formatDate, initialsOf } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function BlogFeatured({ posts }: { posts: BlogFrontmatter[] }) {
  const [hero, ...rest] = posts

  return (
    <section className="hero-padding overflow-hidden">
      <div className="container">
        <BlogIntro />

        {hero && (
          <div className="mt-12 md:mt-16 lg:mt-20">
            <HeroPost post={hero} />
          </div>
        )}
      </div>

      {rest.length > 0 && (
        <div className="container mt-12 md:mt-16 lg:mt-20">
          <ul className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={i * 0.05} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

function BlogIntro() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className="max-w-4xl"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <Badge variant="outline" size="lg">
          <span className="size-1 rounded-full bg-foreground/40" />
          Blog
          <span className="size-1 rounded-full bg-foreground/40" />
        </Badge>
      </motion.div>
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="mt-8 text-4xl leading-[1.02] font-light tracking-tight md:text-6xl lg:text-7xl"
      >
        Notes from counsel.
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
      >
        Practice notes, case framings, and process pieces — written by the
        partners who tried the matters they describe.
      </motion.p>
    </motion.div>
  )
}

function HeroPost({ post }: { post: BlogFrontmatter }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <Card
        asChild
        className="grid grid-cols-1 gap-8 p-6 md:grid-cols-[1.3fr_1fr] md:gap-12 md:p-8 lg:gap-16"
      >
        <a href={`/blog/${post.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[16/11]">
            <img
              src={post.image}
              alt=""
              sizes="(min-width: 768px) 55vw, 100vw"
              className="absolute inset-0 size-full object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <PostMeta post={post} />

            <h2 className="mt-6 text-2xl leading-[1.1] font-light tracking-tight md:text-3xl lg:text-4xl">
              {post.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>

            <AuthorRow post={post} className="mt-8" />

            <div className="mt-7 inline-flex items-center gap-2 text-sm tracking-tight text-foreground">
              <span className="border-b border-transparent transition-colors group-hover/card:border-foreground">
                Read the piece
              </span>
              <MoveUpRight className="size-3.5 text-accent transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </div>
          </div>
        </a>
      </Card>
    </motion.article>
  )
}

function PostCard({ post, delay }: { post: BlogFrontmatter; delay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      <Card asChild className="h-full">
        <a href={`/blog/${post.slug}`}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <img
              src={post.image}
              alt=""
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="absolute inset-0 size-full object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:scale-[1.04]"
            />
          </div>

          <div className="mt-5 flex flex-1 flex-col">
            <PostMeta post={post} />

            <h3 className="mt-4 text-lg leading-snug font-light tracking-tight md:text-xl">
              {post.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <AuthorRow post={post} className="mt-6" compact />
          </div>
        </a>
      </Card>
    </motion.li>
  )
}

function PostMeta({ post }: { post: BlogFrontmatter }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <span>{post.category}</span>
      <span aria-hidden className="block h-3 w-px bg-foreground/20" />
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.readTime && (
        <>
          <span aria-hidden className="block h-3 w-px bg-foreground/20" />
          <span>{post.readTime}</span>
        </>
      )}
    </div>
  )
}

function AuthorRow({
  post,
  className,
  compact = false,
}: {
  post: BlogFrontmatter
  className?: string
  compact?: boolean
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <Avatar size={compact ? "sm" : "default"}>
          {post.author.avatar && (
            <AvatarImage src={post.author.avatar} alt="" />
          )}
          <AvatarFallback>{initialsOf(post.author.name)}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div
            className={
              compact
                ? "text-sm font-light text-foreground"
                : "text-base font-light text-foreground"
            }
          >
            {post.author.name}
          </div>
          <div
            className={
              compact
                ? "mt-0.5 text-xs text-muted-foreground"
                : "mt-1 text-sm text-muted-foreground"
            }
          >
            {post.author.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogFeatured
