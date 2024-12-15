import Image from "next/image";
import { socialLinks } from "./config";
import { NameTransition } from './components/name';

export default function Page() {
  return (
    <section>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          Hello, I'm Thien, a tennis coach and web developer from Connecticut.
        </p>
      </div>
    </section>
  );
}
