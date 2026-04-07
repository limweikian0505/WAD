import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { InputWithLabel, PickerWithLabel } from './UI';

const Animals = [
  {key: 'dog', value: 'Dog'},
  {key: 'cat', value: 'Cat'},
  {key: 'hamster', value: 'Hamster'},
];

const App = () => {
  const [animal, setAnimal] = React.useState('dog');
  return (
    <SafeAreaView style={styles.screen}>
      <PickerWithLabel
        selectedValue={animal}
        onValueChange={(value) => setAnimal(value)}
        label="Select an animal"
        items={Animals}
      />
      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>My Favourite Animal</Text>
        <Text style={styles.resultValue}>
          {Animals.find(a => a.key === animal)?.value ?? animal}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 16,
  },
  resultCard: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#b6e7ed',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    elevation: 1,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});

export default App;