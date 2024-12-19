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

      <SidebarTrigger className='fixed bottom-5 left-4 z-50 md:hidden' />

      <div className='mt-10 w-full ml-2'>
      <Link
          href='/'
          className=' items-center justify-center mt-3 ml-2 text-base font-semibold'
        ><NameTransition /></Link>
        <HeroTabs />
      </div>
    </SidebarProvider>
  );
}
