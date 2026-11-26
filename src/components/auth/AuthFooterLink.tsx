import { StyleSheet, Text } from 'react-native';
import { colors, fonts, typography } from '../../theme';

type Props = {
  question: string;
  action: string;
  onPress: () => void;
};

export default function AuthFooterLink({ question, action, onPress }: Props) {
  return (
    <Text style={styles.text}>
      {question}{' '}
      <Text style={styles.link} onPress={onPress} accessibilityRole="link" suppressHighlighting>
        {action}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.bodyMd,
    color: colors.charcoal,
    textAlign: 'center',
  },
  link: {
    fontFamily: fonts.bold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
