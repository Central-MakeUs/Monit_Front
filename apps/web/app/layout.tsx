import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '@/providers/Providers';
import '@/shared/styles/global.css';

const suit = localFont({
  src: '../public/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '질소 가계부',
  description: '내 소비의 거품을 빼다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang='ko'>
      <body className={suit.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
