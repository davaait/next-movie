import { rem } from '@mantine/core';

interface ArrowUpIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function ArrowUpIcon({ size, style, ...others }: ArrowUpIconProps) {
  return (
    <svg style={{ width: rem(size), height: rem(size), ...style }} viewBox="0 0 12 6" fill="none"
         xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M10.6667 5L6.52071 1.44626C6.22112 1.18946 5.77904 1.18946 5.47945 1.44626L1.33341 5" stroke="#ACADB9"
            strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}