/**
 * Design Tokens
 * 
 * Centralização de todos os valores de design do sistema.
 * NUNCA use valores hardcoded diretamente nos componentes.
 * Sempre importe e utilize estes tokens.
 * 
 * Paleta de cores: Laranja (primária), Preto, Branco
 */

export const designTokens = {
  /**
   * Colors - Based on HSL format for better manipulation
   */
  colors: {
    primary: {
      DEFAULT: 'hsl(24, 100%, 50%)',      // Vibrant Orange
      foreground: 'hsl(0, 0%, 100%)',     // White
      light: 'hsl(24, 100%, 60%)',        // Lighter orange
      dark: 'hsl(24, 100%, 40%)',         // Darker orange
    },
    secondary: {
      DEFAULT: 'hsl(0, 0%, 10%)',         // Almost Black
      foreground: 'hsl(0, 0%, 100%)',     // White
    },
    background: {
      DEFAULT: 'hsl(0, 0%, 100%)',        // Pure White
      muted: 'hsl(0, 0%, 96%)',           // Very light gray
    },
    text: {
      primary: 'hsl(0, 0%, 10%)',         // Dark text
      secondary: 'hsl(0, 0%, 40%)',       // Gray text
      muted: 'hsl(0, 0%, 60%)',           // Light gray text
    },
    border: {
      DEFAULT: 'hsl(0, 0%, 90%)',         // Light gray
      dark: 'hsl(0, 0%, 80%)',            // Medium gray
    },
    status: {
      success: 'hsl(142, 71%, 45%)',      // Green
      warning: 'hsl(38, 92%, 50%)',       // Yellow
      error: 'hsl(0, 84%, 60%)',          // Red
      info: 'hsl(199, 89%, 48%)',         // Blue
    },
  },

  /**
   * Spacing - Following 8px grid system
   */
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  /**
   * Typography
   */
  typography: {
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
  },

  /**
   * Border Radius
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    full: '9999px',   // Circle
  },

  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  /**
   * Z-index Scale
   */
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  /**
   * Transitions
   */
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  /**
   * Breakpoints for responsive design
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

/**
 * Type-safe access to design tokens
 */
export type DesignTokens = typeof designTokens
export type ColorToken = keyof typeof designTokens.colors
export type SpacingToken = keyof typeof designTokens.spacing
export type FontSizeToken = keyof typeof designTokens.typography.fontSize
