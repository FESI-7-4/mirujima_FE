import type { IconSvgProps } from './iconSvgProps.type';

export const ThumbnailIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="79" height="79" rx="15.5" fill="white" />
      <rect x="0.5" y="0.5" width="79" height="79" rx="15.5" stroke="#F2EFEF" />
      <g clipPath="url(#clip0_2231_49545)">
        <circle cx="39.9996" cy="41.1764" r="17.6471" fill="url(#paint0_linear_2231_49545)" />
        <path
          d="M32.1323 21.8055C32.5114 20.7812 33.96 20.7812 34.3391 21.8055L35.3445 24.5228C35.8212 25.8109 36.8368 26.8265 38.1249 27.3031L40.8422 28.3086C41.8664 28.6876 41.8664 30.1363 40.8422 30.5153L38.1249 31.5208C36.8368 31.9975 35.8212 33.013 35.3445 34.3011L34.3391 37.0184C33.96 38.0427 32.5114 38.0427 32.1323 37.0184L31.1268 34.3011C30.6502 33.013 29.6346 31.9975 28.3465 31.5208L25.6292 30.5153C24.605 30.1363 24.605 28.6876 25.6292 28.3086L28.3465 27.3031C29.6346 26.8265 30.6502 25.8109 31.1268 24.5228L32.1323 21.8055Z"
          fill="#18491D"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2231_49545"
          x1="40.1038"
          y1="23.5293"
          x2="40.1038"
          y2="58.8234"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F86969" />
          <stop offset="1" stopColor="#EF3E3E" />
        </linearGradient>
        <clipPath id="clip0_2231_49545">
          <rect width="40" height="40" fill="white" transform="translate(20 20)" />
        </clipPath>
      </defs>
    </svg>
  );
};
