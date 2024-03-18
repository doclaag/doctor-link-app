import { StyleSheet, Text } from 'react-native';

interface TitleProps {
  label: string;
  labelBold: string;
  subtitle?: string;
}

export const TitleShared = ({ label, labelBold, subtitle }: TitleProps) => (
  <>
    <Text style={styles.title}>
      {`${label} `}
      <Text style={styles.title_bold}>{labelBold}</Text>
    </Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </>
);

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 50,
    color: '#36CFC9',
    fontWeight: '600',
  },
  title_bold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#374151',
  },
});