import BlurFade from '@/components/ui/blur-fade';
import About from '@/about/about';
import { AppSidebar } from '@/components/app-sidebar';
import Pathname from '@/components/pathname';
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
import { NowPlaying } from '@/components/now-playing';
import { TopTracks } from '@/components/top-tracks';

export default function MusicPage() {
  return (
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

              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Pathname />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='mt-10 mb-40'>
            <BlurFade delay={0.09}>
              <h1 className='font-medium text-2xl mb-8 tracking-tighter'>
                Music
              </h1>
            </BlurFade>
            <BlurFade className='mb-10'>
              <NowPlaying />
            </BlurFade>
            <h1 className='font-medium text-xl mb-8 tracking-tighter'>
              Top Tracks
            </h1>
            <TopTracks />

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
