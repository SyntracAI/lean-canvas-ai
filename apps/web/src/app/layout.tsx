import { Viewport } from 'next';
import { Roboto, Inter } from 'next/font/google';

import '@syntrac/frontend-web-theme/tailwind.scss';
import { Providers } from './_ui/components/Providers';

import './global.css';

const fontHead = Inter({
  weight: '400',
  subsets: ['latin'],
  variable: '--fonts-head',
});

const fontMain = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  variable: '--fonts-main',
});

export const metadata = () => {
  return {
    icon: [
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  };
};

export const viewport: Viewport = {
  themeColor: '#fff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontMain.variable} ${fontHead.variable} scroll-smooth`}
    >
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
