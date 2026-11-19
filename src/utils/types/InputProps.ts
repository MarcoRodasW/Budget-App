import { TextInputProps } from 'react-native';

export type CustomInputProps = TextInputProps & {
  label?: string;
  error?: string;
};
