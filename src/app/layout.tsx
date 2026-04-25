
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';
import MockAuthProvider from '@/components/providers/MockAuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'WaxingSetudios - Plataforma Luxury para Estudios de Waxing',
  description: 'La plataforma premium para estudios de waxing. Gestiona citas, servicios y pagos con una estética única y sofisticada.',
  keywords: 'waxing, beauty services, luxury waxing, studio management, appointment booking',
  openGraph: {
    title: 'WaxingSetudios - Plataforma Luxury para Estudios de Waxing',
    description: 'La plataforma premium para estudios de waxing. Gestiona citas, servicios y pagos con una estética única y sofisticada.',
    type: 'website',
    locale: 'es_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://waxingsetudios.com',
    siteName: 'WaxingSetudios',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Luxury fonts: Playfair Display (serif elegant) + Inter (clean sans) */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning={true}>
        <ThemeProvider>
          <MockAuthProvider>
            <GoogleAnalytics />
            {children}
            <Toaster />
          </MockAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
