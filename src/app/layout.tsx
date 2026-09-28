import type { Metadata } from 'next';
import './globals.css';
import { DcimProvider } from '@/context/DcimContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'DataCenter DCIM — Hyperscale Infrastructure & 42U Server Rack Telemetry',
  description:
    'Titan #47: Data center infrastructure management system, Movement #14 Dark Mode-First, 42U server rack allocation, liquid immersion CFD cooling, and 2N UPS power redundancy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#030712] text-[#e2e8f0]">
        <DcimProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </DcimProvider>
      </body>
    </html>
  );
}
