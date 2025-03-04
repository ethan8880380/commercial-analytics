import React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const Logo = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M9 9h6" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
    </svg>
  )
}

export const Icons = {
  logo: Logo,
} 