"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type AccordionVariant = "default" | "stacked"

function Accordion({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  variant?: AccordionVariant
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn(
        "group/accordion flex w-full flex-col",
        "data-[variant=default]:overflow-hidden data-[variant=default]:rounded-2xl data-[variant=default]:border",
        "data-[variant=stacked]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group-data-[variant=default]/accordion:not-last:border-b group-data-[variant=default]/accordion:data-open:bg-muted/50",
        "group-data-[variant=stacked]/accordion:rounded-xl group-data-[variant=stacked]/accordion:bg-muted group-data-[variant=stacked]/accordion:transition-shadow group-data-[variant=stacked]/accordion:hover:shadow-sm group-data-[variant=stacked]/accordion:data-open:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent text-start transition-all outline-none disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          "group-data-[variant=default]/accordion:p-4 group-data-[variant=default]/accordion:text-sm group-data-[variant=default]/accordion:font-medium group-data-[variant=default]/accordion:hover:underline",
          "group-data-[variant=stacked]/accordion:items-center group-data-[variant=stacked]/accordion:p-5 group-data-[variant=stacked]/accordion:text-base group-data-[variant=stacked]/accordion:font-light group-data-[variant=stacked]/accordion:tracking-tight group-data-[variant=stacked]/accordion:**:data-[slot=accordion-trigger-icon]:text-foreground md:group-data-[variant=stacked]/accordion:p-6 md:group-data-[variant=stacked]/accordion:text-lg",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden group-data-[variant=default]/accordion:px-4 group-data-[variant=default]/accordion:text-sm group-data-[variant=stacked]/accordion:px-5 group-data-[variant=stacked]/accordion:text-base md:group-data-[variant=stacked]/accordion:px-6 data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          "group-data-[variant=default]/accordion:pt-0 group-data-[variant=default]/accordion:pb-4",
          "group-data-[variant=stacked]/accordion:pt-0 group-data-[variant=stacked]/accordion:pb-5 group-data-[variant=stacked]/accordion:leading-relaxed group-data-[variant=stacked]/accordion:text-muted-foreground md:group-data-[variant=stacked]/accordion:pb-6",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent,AccordionItem, AccordionTrigger }
