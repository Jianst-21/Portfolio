'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LayerProvider } from '@/components/providers/LayerProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <LayerProvider>
        <LoadingScreen />
        
        {/* Smooth Fixed Ambient Breathing Glow in Center of Screen */}
        <div 
          className="fixed top-1/2 left-1/2 w-[700px] sm:w-[950px] md:w-[1200px] h-[500px] sm:h-[700px] md:h-[900px] rounded-full pointer-events-none -z-0 animate-ambient-breathe will-change-transform"
          style={{
            background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--active) 40%, transparent) 0%, color-mix(in srgb, var(--active) 22%, transparent) 32%, color-mix(in srgb, var(--active) 8%, transparent) 58%, transparent 78%)',
            filter: 'blur(100px)',
          }}
        />

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
