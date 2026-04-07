import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Counter from './Counter';
import { styles } from './ShareStyle';

const App = () => {
  const [showCounter, setShowCounter] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowCounter(prev => !prev)}>
        <Text style={styles.buttonText}>
          {showCounter ? 'Hide Counter' : 'Show Counter'}
        </Text>
      </TouchableOpacity>
      {showCounter && <Counter />}
    </View>
  );
};

export default App;
