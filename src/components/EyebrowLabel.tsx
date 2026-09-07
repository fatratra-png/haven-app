import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/color';

export default function EyebrowLabel({ children }: { children: string }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.inkMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});