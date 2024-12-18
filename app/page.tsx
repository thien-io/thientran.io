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

      <SidebarTrigger className='fixed bottom-5 right-5 z-50' />

      <div className='mt-10 w-full ml-2'><HeroTabs/></div>
    </SidebarProvider>
  );
}
