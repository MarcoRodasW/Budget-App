export type CustomButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type CustomButtonSize = 'md' | 'sm';

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
  disabled?: boolean;
};
