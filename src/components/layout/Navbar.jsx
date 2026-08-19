'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoText, setLogoText] = useState('J');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect on mount
  useEffect(() => {
    const target = 'Jinst.';
    let i = 1;
    const interval = setInterval(() => {
      if (i < target.length) {
        setLogoText(target.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Futuristic scramble hover effect
  const handleLogoHover = () => {
    const chars = '!@#$%^&*()_+{}:"<>?|[]\\,./;';
    const target = 'Jinst.';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setLogoText(
        target
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iterations += 1/3;
      if (iterations >= target.length) {
        setLogoText(target);
        clearInterval(interval);
      }
    }, 25);
  };

  const navLinks = [
    { name: 'Tentang', href: '#tentang' },
    { name: 'Kemampuan', href: '#kemampuan' },
    { name: 'Proyek', href: '#proyek' },
    { name: 'Pengalaman', href: '#pengalaman' },
    { name: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${scrolled ? 'bg-[var(--bg)]/90 backdrop-blur-md py-3 border-b border-[var(--line)] shadow-sm' : 'bg-transparent py-4'}`}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Title */}
        <a 
          href="#" 
          onMouseEnter={handleLogoHover}
          className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[var(--ink)] flex items-center gap-0.5"
        >
          <span>{logoText}</span>
          <span className="inline-block w-[2.5px] h-[0.7em] bg-[var(--active)] ml-0.5 animate-pulse align-middle" />
        </a>
        
        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-sm">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--active)] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full hover:bg-[var(--card)] text-[var(--ink)] border border-transparent hover:border-[var(--line)] transition-all" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <a 
            href="/cv.pdf" 
            className="hidden sm:inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-[8px] border border-[var(--active)] text-[var(--active)] hover:bg-[var(--active)] hover:text-[var(--bg)] transition-all font-semibold shadow-sm hover:shadow-[0_0_15px_rgba(232,163,61,0.3)]"
          >
            Unduh CV
          </a>
          
          <button 
            className="lg:hidden p-2 text-[var(--ink)]" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[var(--card)] border-b border-[var(--line)] py-5 px-8 flex flex-col gap-4 font-mono text-sm shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[var(--muted)] hover:text-[var(--ink)] py-2 border-b border-[var(--line)]/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/cv.pdf" 
            className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-[8px] border border-[var(--active)] text-[var(--active)] hover:bg-[var(--active)] hover:text-[var(--bg)] transition-colors font-semibold w-full mt-2"
          >
            Unduh CV
          </a>
        </div>
      )}
    </header>
  );
}
