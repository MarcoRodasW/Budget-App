export type CustomButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: CustomButtonVariant;
  disabled?: boolean;
};
