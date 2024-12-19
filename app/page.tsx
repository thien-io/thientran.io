import Image from "next/image";
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
        <p className="text-lg tracking-tight font-medium mt-10">Thien Tran</p>
        <HeroTabs />
      </div>
    </SidebarProvider>
  );
}
