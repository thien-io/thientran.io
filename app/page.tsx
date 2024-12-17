import Image from "next/image";
import { socialLinks } from "./config";
import { NameTransition } from './components/name';
import { HeroTabs } from "./components/tabs/hero-tabs";

export default function Page() {
  return (
    <section>
      <div className='prose prose-neutral dark:prose-invert'>
     
        <HeroTabs />
      </div>
    </section>
  );
}
