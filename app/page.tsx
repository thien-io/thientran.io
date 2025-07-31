import Image from "next/image";
import Link from 'next/link';
import { socialLinks } from "./config";
import { NameTransition } from './components/name';
import { HeroTabs } from "./components/hero-tabs";
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger className='fixed top-14 left-6 z-50 md:hidden' />

      <div className='mt-10 w-full px-10 py-40'>
      <Link
          href='/'
          className=' items-center justify-center mt-3 ml-2 text-base font-semibold'
        ><p className="font-serif tracking-wide text-4xl">thien.</p></Link>
        <HeroTabs />
      </div>
    </SidebarProvider>
  );
}
