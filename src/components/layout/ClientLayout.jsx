'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LayerProvider } from '@/components/providers/LayerProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DotGridBg from '@/components/common/DotGridBg';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <LayerProvider>
        <LoadingScreen />
        <DotGridBg />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full max-w-[1120px] mx-auto px-6 sm:px-8 py-2 md:py-6">
            {children}
          </main>
          <Footer />
        </div>
      </LayerProvider>
    </ThemeProvider>
  );
}
