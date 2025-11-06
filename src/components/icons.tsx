import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100C22.386 100 0 77.614 0 50S22.386 0 50 0s50 22.386 50 50-22.386 50-50 50zM8.5 50c0 22.912 18.588 41.5 41.5 41.5S91.5 72.912 91.5 50 72.912 8.5 50 8.5 8.5 27.088 8.5 50z"
    />
    <path
      d="M26.2 38.25V36.5h47.6v1.75H26.2z"
    />
    <path
      d="M49.999 28c-3.593.023-6.936 1.492-9.333 4.083-1.143 1.235-1.921 2.8-2.16 4.417h22.986c-.239-1.617-1.017-3.182-2.16-4.417C56.935 29.492 53.592 28.023 50 28h-.001z"
    />
    <path
      d="M28.028 65.5h6.035V44.38h-6.035v21.12h.001zm10.74 0h6.036V44.38h-6.036v21.12h.001zm16.702-21.12v21.12h6.035V44.38h-6.035v.001zm-5.961 0v21.12h6.035V44.38h-6.035v.001z"
    />
    <defs>
        <path
            id="circleText"
            d="M 15, 50 a 35,35 0 1,1 70,0"
        />
    </defs>
    <text style={{ fontSize: '8px', letterSpacing: '.4em', textTransform: 'uppercase' }} fill="currentColor">
        <textPath href="#circleText">
            Muslimische Hochschulgruppe
        </textPath>
    </text>
     <text x="50" y="80" textAnchor="middle" style={{ fontSize: '7px', letterSpacing: '.2em', textTransform: 'uppercase' }} fill="currentColor">
      Erlangen
    </text>
  </svg>
);
