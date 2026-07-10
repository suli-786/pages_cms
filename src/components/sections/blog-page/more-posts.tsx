import { MoveUpRight } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import type { BlogFrontmatter } from "@/lib/types"
import { formatDate, initialsOf } from "@/lib/utils"

function MorePosts({ posts }: { posts: BlogFrontmatter[] }) {
  if (posts.length === 0) return null

  return (
    <section className="section-padding border-t">
      <div className="container">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl leading-tight font-light tracking-tight md:text-3xl">
            More notes.
          </h2>
          <a
            href="/blog"
            className="group/all inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <MoveUpRight className="size-3.5 transition-transform group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card asChild className="h-full">
                <a href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt=""
                      sizes="(min-width: 1024px) 28vw, 50vw"
                      className="absolute inset-0 size-full object-cover transition duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover/card:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-5 flex flex-1 flex-col">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span>{post.category}</span>
                      <span
                        aria-hidden
                        className="block h-3 w-px bg-foreground/20"
                      />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    <h3 className="mt-3 text-lg leading-snug font-light tracking-tight md:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <Avatar size="sm">
                        {post.author.avatar && (
                          <AvatarImage src={post.author.avatar} alt="" />
                        )}
                        <AvatarFallback>
                          {initialsOf(post.author.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-light text-foreground">
                        {post.author.name}
                      </div>
                    </div>
                  </div>
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default MorePosts
