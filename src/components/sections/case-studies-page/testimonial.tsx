import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { CaseStudyTestimonial } from "@/lib/types"
import { initialsOf } from "@/lib/utils"

function CaseStudyTestimonialCard({
  testimonial,
}: {
  testimonial: CaseStudyTestimonial
}) {
  return (
    <figure className="mt-14 rounded-xl bg-muted/60 p-7 md:mt-20 md:p-10">
      <blockquote className="text-lg leading-snug font-light text-foreground md:text-xl">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4">
        <Avatar size="lg">
          {testimonial.avatar && (
            <AvatarImage src={testimonial.avatar} alt="" />
          )}
          <AvatarFallback>{initialsOf(testimonial.author)}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div className="text-sm font-medium text-foreground">
            {testimonial.author}
          </div>
          <div className="mt-1 text-xs text-muted-foreground md:text-sm">
            {testimonial.role}
          </div>
        </div>
      </figcaption>
    </figure>
  )
}

export default CaseStudyTestimonialCard
