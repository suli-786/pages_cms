import type { SVGProps } from "react"

export const VerdictLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 9 L22 35 L35 9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="22" cy="9" r="1.5" fill="currentColor" />
  </svg>
)
