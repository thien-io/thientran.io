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
import { PlaylistCarousel } from '@/components/playlist-carousel';
import { AlbumCarousel } from '@/components/album-carousel';

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
        <div className='flex flex-1 flex-col gap-4 p-4 '>
          <div className='mt-10 mb-40'>
            <BlurFade delay={0.09}>
              <h1 className='text-4xl font-bold text-zinc-900 dark:text-white mb-8'>
                Music
              </h1>
            
            <div className='mb-10'>
              <NowPlaying />
              <PlaylistCarousel />
            </div>
            <div className='bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-6 transition-colors duration-300'>
              <h1 className='text-2xl font-semibold text-zinc-900 dark:text-white mb-6'>
                Top Tracks
              </h1>
              <TopTracks />
            </div>
            </BlurFade>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
