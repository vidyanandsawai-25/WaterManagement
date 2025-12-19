import type { Metadata } from 'next';
import { Toaster } from 'sonner@2.0.3';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Panvel Municipal Corporation - CRM System',
  description: 'Water Tax Management Portal - Panvel Municipal Corporation',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={false}
          duration={4000}
        />
      </body>
    </html>
  );
}