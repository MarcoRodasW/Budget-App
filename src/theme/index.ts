import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { TextStyle, ViewStyle } from 'react-native';


export const fontAssets = {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
};

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const colors = {
  canvas: '#F7F5F0',
  surface: '#FFFFFF',
  muted: '#EFECE6',
  ink: '#1D1E20',
  charcoal: '#6B6D72',
  hairline: 'rgba(29, 30, 32, 0.06)',
  outline: '#D4C4AF',

  primary: '#7C5800',
  mustard: '#F4B840',
  mustardLight: '#F3C653',
  mustardSoft: '#FFDEA8',

  sage: '#88C057',
  sageLight: '#B8E086',

  coral: '#FF8066',
  coralLight: '#F8A99B',

  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
} as const;

export const radii = {
  sm: 8,
  md: 16,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  margin: 20,
  gutter: 12,
} as const;

const type = (fontFamily: string, fontSize: number, lineHeight: number, letterSpacingEm: number): TextStyle => ({
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing: fontSize * letterSpacingEm,
  color: colors.ink,
});

export const typography = {
  displayLg: type(fonts.extrabold, 36, 44, -0.03),
  displayMobile: type(fonts.extrabold, 28, 36, -0.025),
  headlineLg: type(fonts.bold, 24, 32, -0.02),
  headlineMd: type(fonts.bold, 20, 28, -0.015),
  headlineSm: type(fonts.semibold, 18, 24, -0.01),
  titleMd: type(fonts.semibold, 16, 22, -0.005),
  bodyLg: type(fonts.medium, 15, 22, 0),
  bodyMd: type(fonts.regular, 14, 20, 0),
  labelLg: type(fonts.semibold, 13, 18, 0.01),
  labelMd: type(fonts.semibold, 12, 16, 0.01),
  labelSm: type(fonts.medium, 11, 14, 0.02),
} satisfies Record<string, TextStyle>;

export const elevation = {
  level1: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  level2: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
} satisfies Record<string, ViewStyle>;
