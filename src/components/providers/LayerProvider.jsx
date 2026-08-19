'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LayerContext = createContext({ activeLayer: 'all', setActiveLayer: () => {}, accentColor: '--fe' });

export function LayerProvider({ children }) {
  const [activeLayer, setActiveLayer] = useState('all'); // all, fe, be, ai

  useEffect(() => {
    const root = document.documentElement;
    if (activeLayer === 'all' || activeLayer === 'fe') {
      root.style.setProperty('--active', 'var(--fe)');
    } else if (activeLayer === 'be') {
      root.style.setProperty('--active', 'var(--be)');
    } else if (activeLayer === 'ai') {
      root.style.setProperty('--active', 'var(--ai)');
    }
  }, [activeLayer]);

  const accentColor = activeLayer === 'be' ? 'var(--be)' : activeLayer === 'ai' ? 'var(--ai)' : 'var(--fe)';

  return (
    <LayerContext.Provider value={{ activeLayer, setActiveLayer, accentColor }}>
      {children}
    </LayerContext.Provider>
  );
}

export function useLayer() {
  return useContext(LayerContext);
}
