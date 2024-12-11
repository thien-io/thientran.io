"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChevronRight,
  File,
  Folder,
  Forward,
  MoreHorizontal,
  Tent,
  Notebook,
  Image,
  BookType,
  FileType,
  Type,
  ClipboardType,
  Mailbox,
  Origami,
  Bone,
  Dog,
  Rocket,
  Trash2,
  FileUser,
  Contact,
  BookUser,
  Eclipse,
  CodeXml,
  Construction,
  Signpost,
  Donut,
  Feather,
  Ghost,
  Sword,
  Swords,
  Flower,
  Milestone,
  LampDesk,
  Sofa,
  Popcorn,
  Award,
  Quote,
  Music4,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { NavMain } from "@/components/nav-main"
import { NavPages } from "@/components/nav-pages"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeSwitch } from './theme-switch';

// This is sample data.
const data = {
  pages: [
    {
      name: 'About',
      url: '/about',
      icon: Origami,
    },
    {
      name: 'Now',
      url: '/now',
      icon: Signpost,
    },
    {
      name: 'Blog',
      url: '/blog',
      icon: Feather,
    },
    {
      name: 'Photos',
      url: '/photos',
      icon: Image,
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: Rocket,
    },
    {
      name: 'Projects',
      url: '/projects',
      icon: Swords,
    },
    {
      name: 'Movies',
      url: '/movies',
      icon: Popcorn,
    },
    {
      name: 'Music',
      url: '/music',
      icon: Music4,
    },
    {
      name: 'Quotes',
      url: '/quotes',
      icon: Quote,
    },
    {
      name: 'Game',
      url: '/game',
      icon: Ghost,
    },

    {
      name: 'Contact',
      url: '/contact',
      icon: Contact,
    },
  ],
  user: {
    name: 'thien tran',
    email: 'hello@thientran.io',
    avatar: '/',
  },

  navMain: [
    {
      title: 'About',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Now',
          url: '/now',
        },
        {
          title: 'Work',
          url: '/work',
        },
        {
          title: 'Education',
          url: '/edu',
        },
      ],
    },
    {
      title: 'Blog',
      url: '/blog',
      icon: Bot,
      items: [
        {
          title: 'Tennis',
          url: '/blog',
        },
        {
          title: 'Development',
          url: '/blog',
        },
        {
          title: 'Design',
          url: '/blog',
        },
      ],
    },
    {
      title: 'Hobbies',
      url: '/hobbies',
      icon: BookOpen,
      items: [
        {
          title: 'Books',
          url: '/books',
        },
        {
          title: 'Movies',
          url: '/movies',
        },
        {
          title: 'Music',
          url: '/music',
        },
      ],
    },
    {
      title: 'Projects',
      url: '/projects',
      icon: Settings2,
      items: [
        {
          title: 'thien.me',
          url: 'https://thien.me',
        },
        {
          title: 'Modern Pickle',
          url: 'https://modernpickle.com',
        },
      ],
    },
  ],

  changes: [
    {
      file: 'README.md',
      state: 'M',
    },
    {
      file: 'api/hello/route.ts',
      state: 'U',
    },
    {
      file: 'app/layout.tsx',
      state: 'M',
    },
  ],
  tree: [
    [
      'app',
      [
        'api',
        ['hello', ['route.ts']],
        'page.tsx',
        'layout.tsx',
        ['blog', ['page.tsx']],
      ],
    ],
    [
      'components',
      ['ui', 'button.tsx', 'card.tsx'],
      'header.tsx',
      'footer.tsx',
    ],
    ['lib', ['util.ts']],
    ['public', 'favicon.ico', 'vercel.svg'],
    '.eslintrc.json',
    '.gitignore',
    'next.config.js',
    'tailwind.config.js',
    'package.json',
    'README.md',
  ],
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <Link
          href='/'
          className='md:hidden items-center justify-center mt-3 ml-2 text-sm font-semibold'
        >
          thien
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={data.pages} />
 
        
      </SidebarContent>
      <SidebarFooter>
        <div className="ml-2 flex ">
          <ThemeSwitch /><p className="text-xs justify-center items-center content-center ml-2">theme</p>
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    )
  }
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={name === "components" || name === "ui"}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}