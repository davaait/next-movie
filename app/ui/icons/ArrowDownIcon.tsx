import { rem } from '@mantine/core';

interface ArrowDownIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function ArrowDownIcon({ size, style, ...others }: ArrowDownIconProps) {
  return (
    <svg style={{ width: rem(size), height: rem(size), ...style }} viewBox="0 0 12 6" fill="none"
         xmlns="http://www.w3.org/2000/svg" {...others}>
      <path d="M1.33325 1L5.47929 4.55374C5.77888 4.81054 6.22096 4.81054 6.52055 4.55374L10.6666 1" stroke="#ACADB9"
            strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}