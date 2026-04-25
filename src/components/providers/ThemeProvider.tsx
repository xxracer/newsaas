'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { hexToHsl, getContrastColor } from '@/lib/utils';
import { THEME_COLORS, ThemeColors, LuxuryThemeId } from '@/lib/firebase';

export type ThemeId = LuxuryThemeId | 'default';

interface ThemeContextType {
  theme: ThemeId;
  colors: ThemeColors;
  setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function parseColors(studioColors: string | null | undefined): ThemeColors | null {
  if (!studioColors) return null;
  try {
    const parsed = JSON.parse(studioColors);
    if (parsed.primary) return parsed as ThemeColors;
  } catch {
    // ignore
  }
  return null;
}

async function fetchStudioByDomain(hostname: string): Promise<{ themeId: string; colors: ThemeColors } | null> {
  try {
    const normalized = hostname.toLowerCase().replace('www.', '');
    const res = await fetch(`/api/studios/lookup?domain=${encodeURIComponent(normalized)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.studio?.themeId) {
      const colors = parseColors(data.studio.colors) || THEME_COLORS[data.studio.themeId] || THEME_COLORS['waxing-rose-gold'];
      return { themeId: data.studio.themeId, colors };
    }
  } catch {
    // ignore
  }
  return null;
}

async function fetchUserStudio(): Promise<{ themeId: string; colors: ThemeColors } | null> {
  try {
    const res = await fetch('/api/studios/me');
    if (!res.ok) return null;
    const data = await res.json();
    if (data.studio?.themeId) {
      const colors = parseColors(data.studio.colors) || THEME_COLORS[data.studio.themeId] || THEME_COLORS['waxing-rose-gold'];
      return { themeId: data.studio.themeId, colors };
    }
  } catch {
    // ignore
  }
  return null;
}

function findStudioInLocalStorage(): { themeId: string; colors: ThemeColors } | null {
  if (typeof window === 'undefined') return null;
  try {
    const normalizedHost = window.location.hostname.toLowerCase().replace('www.', '');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mock_studio_')) {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        if (data.domain) {
          const studioDomain = data.domain.toLowerCase().replace('www.', '');
          if (studioDomain === normalizedHost && data.theme?.id) {
            return {
              themeId: data.theme.id,
              colors: data.colors || THEME_COLORS[data.theme.id],
            };
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function findUserStudioInLocalStorage(): { themeId: string; colors: ThemeColors } | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = JSON.parse(localStorage.getItem('mock_user') || '{}');
    if (user?.studioId) {
      const studioData = JSON.parse(localStorage.getItem('mock_studio_' + user.studioId) || '{}');
      if (studioData.theme?.id) {
        return {
          themeId: studioData.theme.id,
          colors: studioData.colors || THEME_COLORS[studioData.theme.id],
        };
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function applyThemeToDocument(colors: ThemeColors) {
  const root = document.documentElement;

  const primaryHsl = hexToHsl(colors.primary);
  const secondaryHsl = hexToHsl(colors.secondary);
  const accentHsl = hexToHsl(colors.accent);
  const backgroundHsl = hexToHsl(colors.background);
  const surfaceHsl = hexToHsl(colors.surface);
  const textHsl = hexToHsl(colors.text);
  const textMutedHsl = hexToHsl(colors.textMuted);
  const borderHsl = hexToHsl(colors.border);

  const primaryFg = colors.primaryForeground || getContrastColor(colors.primary);
  const secondaryFg = getContrastColor(colors.secondary);
  const accentFg = getContrastColor(colors.accent);
  const surfaceFg = getContrastColor(colors.surface);

  root.style.setProperty('--background', backgroundHsl);
  root.style.setProperty('--foreground', textHsl);

  root.style.setProperty('--card', surfaceHsl);
  root.style.setProperty('--card-foreground', surfaceFg === '#ffffff' ? '0 0% 100%' : '0 0% 10%');

  root.style.setProperty('--popover', surfaceHsl);
  root.style.setProperty('--popover-foreground', surfaceFg === '#ffffff' ? '0 0% 100%' : '0 0% 10%');

  root.style.setProperty('--primary', primaryHsl);
  root.style.setProperty('--primary-foreground', primaryFg === '#ffffff' ? '0 0% 100%' : '0 0% 5%');

  root.style.setProperty('--secondary', secondaryHsl);
  root.style.setProperty('--secondary-foreground', secondaryFg === '#ffffff' ? '0 0% 100%' : '0 0% 5%');

  root.style.setProperty('--muted', backgroundHsl);
  root.style.setProperty('--muted-foreground', textMutedHsl);

  root.style.setProperty('--accent', accentHsl);
  root.style.setProperty('--accent-foreground', accentFg === '#ffffff' ? '0 0% 100%' : '0 0% 5%');

  root.style.setProperty('--border', borderHsl);
  root.style.setProperty('--input', borderHsl);
  root.style.setProperty('--ring', primaryHsl);

  root.style.setProperty('--sidebar-background', backgroundHsl);
  root.style.setProperty('--sidebar-foreground', textHsl);
  root.style.setProperty('--sidebar-primary', primaryHsl);
  root.style.setProperty('--sidebar-primary-foreground', primaryFg === '#ffffff' ? '0 0% 100%' : '0 0% 5%');
  root.style.setProperty('--sidebar-accent', secondaryHsl);
  root.style.setProperty('--sidebar-accent-foreground', secondaryFg === '#ffffff' ? '0 0% 100%' : '0 0% 5%');
  root.style.setProperty('--sidebar-border', borderHsl);
  root.style.setProperty('--sidebar-ring', primaryHsl);

  root.style.setProperty('--chart-1', primaryHsl);
  root.style.setProperty('--chart-2', accentHsl);
  root.style.setProperty('--chart-3', secondaryHsl);
  root.style.setProperty('--chart-4', textMutedHsl);
  root.style.setProperty('--chart-5', borderHsl);

  root.classList.forEach((cls) => {
    if (cls.startsWith('theme-')) root.classList.remove(cls);
  });
}

export function ThemeProvider({ children, defaultTheme = 'default' }: { children: React.ReactNode; defaultTheme?: ThemeId }) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [appliedColors, setAppliedColors] = useState<ThemeColors>(THEME_COLORS['waxing-rose-gold']);

  const resolveColors = useCallback(async (): Promise<ThemeColors> => {
    // 1. Try API by domain
    const studioByDomain = await fetchStudioByDomain(typeof window !== 'undefined' ? window.location.hostname : '');
    if (studioByDomain?.colors) return studioByDomain.colors;

    // 2. Try API for logged-in user
    const userStudio = await fetchUserStudio();
    if (userStudio?.colors) return userStudio.colors;

    // 3. Fallback to localStorage (dev/demo)
    const lsDomain = findStudioInLocalStorage();
    if (lsDomain?.colors) return lsDomain.colors;

    const lsUser = findUserStudioInLocalStorage();
    if (lsUser?.colors) return lsUser.colors;

    // 4. Fallback to saved global theme
    const savedTheme = typeof window !== 'undefined'
      ? (localStorage.getItem('waxing-studio-theme') as ThemeId)
      : null;
    if (savedTheme && savedTheme !== 'default' && THEME_COLORS[savedTheme]) {
      return THEME_COLORS[savedTheme];
    }

    return THEME_COLORS['waxing-rose-gold'];
  }, []);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('waxing-studio-theme') as ThemeId;
    if (savedTheme && savedTheme !== 'default' && THEME_COLORS[savedTheme]) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    resolveColors().then((colors) => {
      setAppliedColors(colors);
      applyThemeToDocument(colors);
    });
  }, [mounted, resolveColors]);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    localStorage.setItem('waxing-studio-theme', newTheme);
    if (newTheme !== 'default' && THEME_COLORS[newTheme]) {
      const colors = THEME_COLORS[newTheme];
      setAppliedColors(colors);
      applyThemeToDocument(colors);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: appliedColors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
