import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import { multiplication } from './Calculation'

const App = () => {
  const [x,setX] = useState<string>('0');
  const [y,setY] = useState<string>('0');
  const [z,setZ] = useState<string>('0');
  const [sum,setSum] = useState<string>('0');
  const [difference,setDifference] = useState<string>('0');
  const [multiply, setMultiply] = useState<string>('0');

  const calculation = (inputX:string, inputY:string, inputZ:string) => {
    setSum((Number(inputX)+Number(inputY)+Number(inputZ)).toString());
    setDifference((Number(inputX)-Number(inputY)-Number(inputZ)).toString());
    setMultiply(multiplication(inputX,inputY,inputZ));
  }

    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Simple Calculator</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            First Number X
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
                setX(input);
                calculation(input,y,z);
                }
              }
            value={x}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            Second Number Y
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              setY(input);
              calculation(x,input,z);
              }
            }
            value={y}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            Third Number Z
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              setZ(input);
              calculation(x,y,input);
              }
            }
            value={z}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={[styles.container,{paddingTop: 50}]}>
          <Text style={[styles.label,{color:'#B71C1C'}]}>
            Sum
          </Text>
          <TextInput
            style={styles.result}
            value={sum}
            editable={false}
          />
        </View>
        <View style={styles.container}>
          <Text style={[styles.label,{color:'#B71C1C'}]}>
            Difference
          </Text>
          <TextInput
            style={styles.result}
            value={difference}
            editable={false}
          />
        </View>
        <View style={styles.container}>
          <Text style={[styles.label,{color:'#B71C1C'}]}>
            Multiplication
          </Text>
          <TextInput
            style={styles.result}
            value={multiply}
            editable={false}
          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30
  },
  label: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 24,
    margin: 5,

  },
  input: {
    color: 'black',
    fontSize: 24,
    margin: 5,
    textAlign: 'right',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
  },
  result: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default App;