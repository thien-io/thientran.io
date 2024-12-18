import BlurFade from '@/components/ui/blur-fade';

export default function About() {
  return (
    <section>

      <BlurFade delay={0.2}>
        <p className='text-sm mb-4'>
          Hello! I'm a USPTA-certified tennis coach and passionate web
          developer/designer. With over 20 years of experience on the court, I
          specialize in helping players of all levels improve their skills,
          build confidence, and enjoy the game. My coaching philosophy centers
          on personalized training to ensure each player reaches their full
          potential while having fun.
        </p>
        <p className='text-sm mb-4'>
          In addition to coaching, I have a strong background in web development
          and design. I focus on creating dynamic, user-friendly websites that
          enhance the online presence of businesses and individuals. My blend of
          technical expertise and creative vision allows me to craft engaging
          digital experiences.
        </p>
        <p className='text-sm mb-4'>
          Whether I'm on the court or behind the screen, I thrive on challenges
          and enjoy connecting with people. Let’s elevate both your game and
          your online presence!
        </p>
      </BlurFade>
    </section>
  );
}
