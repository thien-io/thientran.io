import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <>
      <Tabs defaultValue='about' className=''>
        <TabsList className='grid w-full grid-cols-4 mb-20 bg-transparent'>
          <TabsTrigger value='about'>About</TabsTrigger>
          <TabsTrigger value='blog'>Blog</TabsTrigger>
          <TabsTrigger value='photos'>Photos</TabsTrigger>
          <TabsTrigger value='contact'>Contact</TabsTrigger>
        </TabsList>
        <TabsContent value='about'>
          <div>Hello, I'm Thien, a tennis coach from Connecticut.</div>
        </TabsContent>
        <TabsContent value='blog'>
          <div>
            {allBlogs
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post) => (
                <BlurFade delay={0.09 * 4 + 0.05}>
                  <Link
                    key={post.slug}
                    className='flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80'
                    href={`/blog/${post.slug}`}
                  >
                    <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2'>
                      <p className='text-black dark:text-white tracking-tight'>
                        {post.metadata.title}
                      </p>
                      <p className='text-neutral-600 dark:text-neutral-400 tabular-nums text-sm'>
                        {formatDate(post.metadata.publishedAt, false)}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
          </div>
        </TabsContent>
        <TabsContent value='photos'>
          <ImageGrid
            columns={3}
            images={[
              {
                src: '/photos/retro-tennis-court-1.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
              {
                src: '/photos/retro-tennis-court-2.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
              {
                src: '/photos/retro-tennis-court-3.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
              {
                src: '/photos/retro-tennis-court-4.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
              {
                src: '/photos/retro-tennis-court-5.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
              {
                src: '/photos/retro-tennis-court-6.jpg',
                alt: 'tennis',
                href: 'https://thientran.io',
              },
            ]}
          />

          <ImageGrid
            columns={2}
            images={[
              { src: '/photos/tenniscourt1.jpg', alt: 'Tennis' },
              { src: '/photos/tenniscourt2.jpg', alt: 'Tennis' },
              { src: '/photos/tenniscourt3.jpg', alt: 'Tennis' },
              { src: '/photos/tenniscourt4.jpg', alt: 'Tennis' },
            ]}
          />
        </TabsContent>
        <TabsContent value='contact'>
          <div className='space-y-6'>
            {contact.map((contact, index) => (
              <div className='border-none'>
                <div>
                  <a
                    key={index}
                    href={contact.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group hover:opacity-80 transition-opacity duration-200 flex flex-row justify-between items-center '
                  >
                    {contact.social}
                    <CardDescription>{contact.username}</CardDescription>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
