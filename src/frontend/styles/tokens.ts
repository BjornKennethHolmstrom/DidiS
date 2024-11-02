// src/styles/tokens.ts
export const tokens = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'].join(', '),
    mono: ['JetBrains Mono', 'monospace'].join(', '),
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
  },
  colors: {
    // Swedish flag colors as base
    primary: {
      50: '#f0f7ff',
      100: '#e0efff',
      200: '#b9ddff',
      300: '#7cc2ff',
      400: '#3aa0ff',
      500: '#006AA7', // Swedish blue
      600: '#0054a7',
      700: '#003f7f',
      800: '#002a66',
      900: '#001a40',
    },
    accent: {
      50: '#fff4e5',
      100: '#ffe4bb',
      200: '#ffd588',
      300: '#ffc44d',
      400: '#FECC00', // Swedish yellow
      500: '#e6b800',
      600: '#b38f00',
      700: '#806600',
      800: '#4d3d00',
      900: '#1a1400',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  spacing: {
    // ... spacing tokens
  },
  // ... other design tokens
}
