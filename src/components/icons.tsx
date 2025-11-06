import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="currentColor"
    {...props}
  >
    <style>
      {`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@500&display=swap');
      .heavy-sans { font-family: 'Montserrat', sans-serif; font-weight: 700; }
      .light-sans { font-family: 'Roboto', sans-serif; font-weight: 500; }
    `}
    </style>
    {/* Outer circle */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2.5" />
    {/* Inner circle */}
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />

    {/* MHG Text */}
    <text
      x="50"
      y="63"
      textAnchor="middle"
      className="heavy-sans"
      fontSize="24"
      fill="currentColor"
    >
      MHG
    </text>

    {/* Mosque Dome */}
    <path
      d="M 35 48 L 65 48 L 65 46 C 65 42, 62 40, 58 40 L 55 40 C 55 37, 52.5 35, 50 35 C 47.5 35, 45 37, 45 40 L 42 40 C 38 40, 35 42, 35 46 Z"
      fill="currentColor"
    />

    <defs>
      <path
        id="circleTextTop"
        d="M 12 50 A 38 38 0 0 1 88 50"
        fill="none"
      />
      <path
        id="circleTextBottom"
        d="M 88 50 A 38 38 0 0 1 12 50"
        fill="none"
      />
    </defs>

    <text className="light-sans" fontSize="6.5" letterSpacing="0.2em" fill="currentColor">
      <textPath href="#circleTextTop" startOffset="50%" textAnchor="middle">
        MUSLIMISCHE HOCHSCHULGRUPPE
      </textPath>
    </text>
    <text className="light-sans" fontSize="6.5" letterSpacing="0.4em" fill="currentColor">
      <textPath href="#circleTextBottom" startOffset="50%" textAnchor="middle">
        ERLANGEN
      </textPath>
    </text>
  </svg>
);
