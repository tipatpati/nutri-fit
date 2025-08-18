// Material Design 3 Tailwind Aliases for consistent theming
export const md3Colors = {
  // Surface Colors
  surface: "bg-[hsl(var(--md-sys-color-surface))] text-[hsl(var(--md-sys-color-on-surface))]",
  surfaceVariant: "bg-[hsl(var(--md-sys-color-surface-variant))] text-[hsl(var(--md-sys-color-on-surface-variant))]",
  surfaceContainer: "bg-[hsl(var(--md-sys-color-surface-container))] text-[hsl(var(--md-sys-color-on-surface))]",
  surfaceContainerLow: "bg-[hsl(var(--md-sys-color-surface-container-low))] text-[hsl(var(--md-sys-color-on-surface))]",
  surfaceContainerHigh: "bg-[hsl(var(--md-sys-color-surface-container-high))] text-[hsl(var(--md-sys-color-on-surface))]",
  surfaceContainerHighest: "bg-[hsl(var(--md-sys-color-surface-container-highest))] text-[hsl(var(--md-sys-color-on-surface))]",
  
  // Primary Colors
  primary: "bg-[hsl(var(--md-sys-color-primary))] text-[hsl(var(--md-sys-color-on-primary))]",
  primaryContainer: "bg-[hsl(var(--md-sys-color-primary-container))] text-[hsl(var(--md-sys-color-on-primary-container))]",
  
  // Secondary Colors
  secondary: "bg-[hsl(var(--md-sys-color-secondary))] text-[hsl(var(--md-sys-color-on-secondary))]",
  secondaryContainer: "bg-[hsl(var(--md-sys-color-secondary-container))] text-[hsl(var(--md-sys-color-on-secondary-container))]",
  
  // Tertiary Colors
  tertiary: "bg-[hsl(var(--md-sys-color-tertiary))] text-[hsl(var(--md-sys-color-on-tertiary))]",
  tertiaryContainer: "bg-[hsl(var(--md-sys-color-tertiary-container))] text-[hsl(var(--md-sys-color-on-tertiary-container))]",
  
  // Error Colors
  error: "bg-[hsl(var(--md-sys-color-error))] text-[hsl(var(--md-sys-color-on-error))]",
  errorContainer: "bg-[hsl(var(--md-sys-color-error-container))] text-[hsl(var(--md-sys-color-on-error-container))]",
} as const;

export const md3Text = {
  // Primary Text Colors
  onSurface: "text-[hsl(var(--md-sys-color-on-surface))]",
  onSurfaceVariant: "text-[hsl(var(--md-sys-color-on-surface-variant))]",
  onPrimary: "text-[hsl(var(--md-sys-color-on-primary))]",
  onPrimaryContainer: "text-[hsl(var(--md-sys-color-on-primary-container))]",
  onSecondary: "text-[hsl(var(--md-sys-color-on-secondary))]",
  onSecondaryContainer: "text-[hsl(var(--md-sys-color-on-secondary-container))]",
  onTertiary: "text-[hsl(var(--md-sys-color-on-tertiary))]",
  onTertiaryContainer: "text-[hsl(var(--md-sys-color-on-tertiary-container))]",
  onError: "text-[hsl(var(--md-sys-color-on-error))]",
  onErrorContainer: "text-[hsl(var(--md-sys-color-on-error-container))]",
  primary: "text-[hsl(var(--md-sys-color-primary))]",
  secondary: "text-[hsl(var(--md-sys-color-secondary))]",
  tertiary: "text-[hsl(var(--md-sys-color-tertiary))]",
  error: "text-[hsl(var(--md-sys-color-error))]",
} as const;

export const md3Borders = {
  outline: "border-[hsl(var(--md-sys-color-outline))]",
  outlineVariant: "border-[hsl(var(--md-sys-color-outline-variant))]",
  primary: "border-[hsl(var(--md-sys-color-primary))]",
  secondary: "border-[hsl(var(--md-sys-color-secondary))]",
  tertiary: "border-[hsl(var(--md-sys-color-tertiary))]",
  error: "border-[hsl(var(--md-sys-color-error))]",
} as const;

export const md3Typography = {
  displayLarge: "md-display-large",
  displayMedium: "md-display-medium", 
  displaySmall: "md-display-small",
  headlineLarge: "md-headline-large",
  headlineMedium: "md-headline-medium",
  headlineSmall: "md-headline-small",
  titleLarge: "md-title-large",
  titleMedium: "md-title-medium",
  titleSmall: "md-title-small",
  labelLarge: "md-label-large",
  labelMedium: "md-label-medium",
  labelSmall: "md-label-small",
  bodyLarge: "md-body-large",
  bodyMedium: "md-body-medium",
  bodySmall: "md-body-small",
} as const;

export const md3Elevation = {
  0: "md-elevation-0",
  1: "md-elevation-1",
  2: "md-elevation-2", 
  3: "md-elevation-3",
  4: "md-elevation-4",
  5: "md-elevation-5",
} as const;

export const md3Shape = {
  none: "rounded-none",
  extraSmall: "rounded-[4px]",
  small: "rounded-[8px]",
  medium: "rounded-[12px]",
  large: "rounded-[16px]",
  extraLarge: "rounded-[28px]",
  full: "rounded-full",
} as const;