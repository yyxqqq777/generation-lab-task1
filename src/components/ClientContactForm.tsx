"use client";

import dynamic from 'next/dynamic';

// Import ContactForm with dynamic to prevent hydration errors
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false, // Disable server-side rendering
});

export default function ClientContactForm() {
  return <ContactForm />;
}