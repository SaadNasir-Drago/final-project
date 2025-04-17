
import { Providers } from '@/components/Providers';
import './globals.css';

export const metadata = {
  title: 'Pharmacy ERP System',
  description: 'A comprehensive ERP system for pharmacies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
