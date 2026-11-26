import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { TextInputProps } from 'react-native';

export type CustomInputProps = TextInputProps & {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: ComponentProps<typeof Ionicons>['name'];
  // Adds an eye button that toggles password visibility
  password?: boolean;
};
