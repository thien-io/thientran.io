'use client'
 
import { usePathname } from 'next/navigation'
 
export default function Pathname() {
  const pathname = usePathname()
  return <p>{pathname.slice(1)}</p>
}