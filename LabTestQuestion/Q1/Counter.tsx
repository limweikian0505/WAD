import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from './ShareStyle';
import TimeCard from './TimeCard';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
   setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
   
  });

  

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <View style={styles.row}>
      <TimeCard
        value={minutes}
        label="minutes"
        backgroundColor="#ADD8E6"
      />
      <TimeCard
        value={seconds}
        label="seconds"
        backgroundColor="#FFB6C1"
      />
    </View>
  );
};


export default Counter