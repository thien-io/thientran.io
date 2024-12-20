import { TopTracks } from '@/components/top-tracks';
import { NowPlaying } from '@/components/now-playing';

export const metadata = {
  title: 'Music',
  description: 'Check out my top tracks on Spotify',
};

export default function MusicPage2() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-8'>My Top Tracks</h1>
      <div className='mb-10'>
        <NowPlaying />
      </div>
      <TopTracks />
    </div>
  );
}
