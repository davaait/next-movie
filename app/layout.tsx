import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import SidebarComponent from './ui/sidebar/sidebarComponent';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Movies',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
    <head>
      <ColorSchemeScript />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
    </head>
    <body className={inter.className}>
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
    </body>
    </html>
  );
}
