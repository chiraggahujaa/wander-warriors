import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wander Warriors - Nepal Trekking Guides & Tour Services',
  description:
    'Professional trekking guide services in Nepal. Expert guides for Everest Base Camp, Annapurna Circuit, Manaslu, and more. Complete trek management with best rates.',
  keywords: [
    'Nepal trekking',
    'Everest Base Camp',
    'Annapurna trek',
    'trekking guide Nepal',
    'Manaslu circuit',
    'Langtang trek',
    'Himalayan trekking',
    'Nepal tour guide',
  ],
  authors: [{ name: 'Wander Warriors' }],
  openGraph: {
    title: 'Wander Warriors - Nepal Trekking Guides & Tour Services',
    description:
      'Professional trekking guide services in Nepal. Expert guides for Everest Base Camp, Annapurna, Manaslu, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Wander Warriors',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
