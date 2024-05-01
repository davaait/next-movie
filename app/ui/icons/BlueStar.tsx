import { rem } from '@mantine/core';

interface BlueStarIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function BlueStarIcon({ size, style, ...others }: BlueStarIconProps) {
  return (
    <svg style={{ width: rem(size), height: rem(size), ...style }} viewBox="0 0 28 28" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 20.7083L6.79929 24.4941L8.17479 16.4756L2.34146 10.7974L10.3915 9.63078L13.9918 2.33561L17.5921 9.63078L25.6421 10.7974L19.8088 16.4756L21.1843 24.4941L14 20.7083Z"
        fill="#9854F6" stroke="#9854F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}