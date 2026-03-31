import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {ReactNode, useState} from 'react';
import { PickerWithLabel } from './UI';

const Animals = [
  {key: '01', value: 'cat'},
  {key: '02', value: 'dog'},
  {key: '03', value: 'mouse'},
  {key: '04', value: 'bird'},
];

const Fruits = [
  {key: '01', value: 'Watermelon'},
  {key: '02', value: 'Graps'},
  {key: '03', value: 'Papaya'},
  {key: '04', value: 'Orange'},
];

const App = () => {
  
  const [animal, setanimal] = useState('02');
  const [fruit, setfruit] = useState('01'); 
   console.log(animal)
  return (
    <View>
      <PickerWithLabel
        items={Animals}
        label="Animals"
        selectedValue={animal}
        onValueChange={(item: any) => setanimal(item)}
      />
    </View>
  );
};

 
 
export default App;
