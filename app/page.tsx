import Image from "next/image";
import { socialLinks } from "./config";
import { NameTransition } from './components/name';
import { HeroTabs } from "./components/hero-tabs";

export default function Page() {
  return (
    <section>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>Hello, I'm Thien, a tennis coach from Connecticut.</p>
        
      </div>
    </section>
  );
}
