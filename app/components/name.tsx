import Link from "next/link";

export function NameTransition() {
  return (
    <h1 className=' transition-element '>
      <span className='sr-only'>Thien</span>
      <span aria-hidden='true' className='block overflow-hidden group relative'>
        <span className='inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full'>
          {'Thien Tran'.split('').map((letter, index) => (
            <span
              key={index}
              className='inline-block'
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
        <span className='inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0'>
          {'thientran.io'.split('').map((letter, index) => (
            <span
              key={index}
              className='inline-block'
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
}
