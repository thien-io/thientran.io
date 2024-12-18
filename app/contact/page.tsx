import React from 'react';
import type { Metadata } from 'next';
import { contact } from '@/data/contact';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'My Contacts',
};
import Contact from '@/components/contact';

export default function ContactPage() {
  return (
    <Contact/>
  );
}
