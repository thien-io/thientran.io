'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname } from 'next/navigation';

export default function Pathname() {
  const pathname = usePathname();
  const pathnamewseperator =
    pathname == '/' ? (
      ''
    ) : (
      <Breadcrumb className='flex items-center gap-2'>
        <BreadcrumbSeparator className='block'></BreadcrumbSeparator>
        <>
          <>{pathname.slice(1)}</>
        </>
      </Breadcrumb>
    );

  return <>{pathnamewseperator}</>;
}