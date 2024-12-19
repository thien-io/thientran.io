import BlurFade from '@/components/ui/blur-fade';

export default function About() {
  return (
    <BlurFade delay={0.2}>
      <p className='text-sm mb-4'>
        I'm a USPTA-certified tennis coach and passionate web
        developer/designer. With over 20 years of experience on the court, I
        specialize in helping players of all levels improve their skills, build
        confidence, and enjoy the game.
      </p>
    </BlurFade>
  );
}
