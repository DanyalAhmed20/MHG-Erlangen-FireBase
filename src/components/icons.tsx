import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M12 2l7.5 5-7.5 5-7.5-5L12 2z" />
    <path d="M4.5 17l7.5 5 7.5-5" />
    <path d="M4.5 12l7.5 5 7.5-5" />
  </svg>
);
