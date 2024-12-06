import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import { metaData } from "./config";
import DotPattern from "./components/dotpattern";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeSwitch } from './components/theme-switch';
import { Command } from 'lucide-react';
import { AppSidebar } from './components/app-sidebar';
import { Dock, DockIcon } from './components/ui/dock';
import { cn } from './lib/utils';
export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: metaData.name,
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cx(GeistSans.variable, GeistMono.variable)}>
      <head>
        <link
          rel='alternate'
          type='application/rss+xml'
          href='/rss.xml'
          title='RSS Feed'
        />
        <link
          rel='alternate'
          type='application/atom+xml'
          href='/atom.xml'
          title='Atom Feed'
        />
        <link
          rel='alternate'
          type='application/feed+json'
          href='/feed.json'
          title='JSON Feed'
        />
      </head>
      <body className='antialiased flex flex-col min-h-screen items-center justify-center mx-auto mt-2 lg:mt-8 lg:mb-40'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className='flex-auto min-w-0 mt-2 md:mt-6 flex flex-col px-6 sm:px-4 md:px-0 max-w-[640px] w-full'>
              <div className='flex content-center justify-end'>
                <ThemeSwitch />
                <SidebarTrigger className='ml-4' />
              </div>
              <div className='mt-10'>{children}</div>

              <Footer />
              <Analytics />
              <SpeedInsights />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
