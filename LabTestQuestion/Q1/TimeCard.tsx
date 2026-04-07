import { View, Text, StyleSheet } from 'react-native';
import { styles } from './ShareStyle';

type TimeCardProps = {
  value: number;
  label: string;
  backgroundColor?: string;
};

const TimeCard = ({ value, label, backgroundColor }: TimeCardProps) => {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default TimeCard
