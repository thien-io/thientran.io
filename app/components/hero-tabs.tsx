import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import About from './about';
import Blog from './blog';
import Photos from './photos';
import Contact from './contact';
import { contact } from '@/data/contact';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { formatDate, getBlogPosts } from 'app/lib/posts';
import BlurFade from 'app/components/ui/blur-fade';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageGrid } from '@/components/image-grid';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  customID?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};

export function HeroTabs() {
  let allBlogs = getBlogPosts();

  return (

      <Tabs defaultValue='about' className='pr-'>
        <TabsList className='grid w-full grid-cols-4 mb-20 bg-transparent -ml-4 '>
          <TabsTrigger value='about'>About</TabsTrigger>
          <TabsTrigger value='blog'>Blog</TabsTrigger>
          <TabsTrigger value='photos'>Photos</TabsTrigger>
          <TabsTrigger value='contact'>Contact</TabsTrigger>
        </TabsList>
        <TabsContent value='about'>
          <About />
        </TabsContent>
        <TabsContent value='blog'>
          <Blog />
        </TabsContent>
        <TabsContent value='photos'>
          <Photos />
        </TabsContent>
        <TabsContent value='contact'>
          <Contact />
        </TabsContent>
      </Tabs>

  );
}
