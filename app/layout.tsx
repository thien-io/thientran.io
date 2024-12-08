import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from './components/nav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Footer from './components/footer';
import { ThemeProvider } from './components/theme-switch';
import { metaData } from './config';
import DotPattern from './components/dotpattern';
import Pathname from './components/pathname';
import { ThemeSwitch } from './components/theme-switch';
import { Command } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Dock, DockIcon } from './components/ui/dock';
import { cn } from './lib/utils';
import { usePathname } from 'next/navigation';

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
      <body className='flex h-screen items-center justify-center flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-screen'>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                  <SidebarTrigger className='-ml-1' />
                  <Separator orientation='vertical' className='mr-2 h-4' />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className='block'>
                        <BreadcrumbLink href='/'>thien</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='block' />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          <Pathname />
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                  <div className='mt-10'>{children}</div>

                </div>
              </SidebarInset>
            </SidebarProvider>

            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
