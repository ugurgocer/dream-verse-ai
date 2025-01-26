export const colors = {
  primary: {
    main: 'var(--color-accent)',
    light: 'var(--color-blur)',
  },
  background: {
    primary: 'var(--color-secondary)',
    secondary: 'var(--color-primary)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.9)',
    muted: 'rgba(255, 255, 255, 0.8)',
  },
  gradient: {
    overlay: {
      start: 'var(--gradient-start)',
      end: 'var(--gradient-end)',
    },
    radial: {
      start: 'rgba(45, 27, 105, 0.7)',
      middle: 'rgba(26, 16, 55, 0.8)',
      end: 'rgba(26, 16, 55, 0.9)',
    },
  },
} as const

// Tailwind'in safelist'ine eklenecek sabit class'lar
export const gradientClasses = {
  primary: 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-blur)]',
  background: {
    linear: 'bg-gradient-to-b from-[var(--gradient-start)] via-transparent to-[var(--gradient-end)]',
    radial: 'bg-gradient-radial from-theme-secondary/70 via-theme-primary/80 to-theme-primary/90',
  },
} as const

export const gradients = {
  primary: `bg-gradient-to-r from-[${colors.primary.main}] to-[${colors.primary.light}]`,
  background: {
    linear: `bg-gradient-to-b from-[${colors.gradient.overlay.start}] via-[${colors.gradient.overlay.middle}] to-[${colors.gradient.overlay.end}]`,
    radial: `bg-gradient-radial from-[${colors.gradient.radial.start}] via-[${colors.gradient.radial.middle}] to-[${colors.gradient.radial.end}]`,
  },
} as const 