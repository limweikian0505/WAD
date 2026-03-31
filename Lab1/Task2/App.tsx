import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import calculateDistance, { calculateMidPoint } from './Calculation';

const random = (min:number, max:number) => {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num.toString();
}

const App = () => {
  const [x1,setX1] = useState<string>(random(-10,10));
  const [y1,setY1] = useState<string>(random(-10,10));
  const [x2,setX2] = useState<string>(random(-10,10));
  const [y2,setY2] = useState<string>(random(-10,10));
  const [midPoint, setMidPoint] = useState<string>(calculateMidPoint(x1,y1,x2,y2));
  const [distance, setDistance] = useState<string>(calculateDistance(x1,y1,x2,y2));

  const calculation = (inputX1:string, inputY1:string, inputX2:string, inputY2:string) => {
    setMidPoint(calculateMidPoint(inputX1, inputY1, inputX2, inputY2));
    setDistance(calculateDistance(inputX1, inputY1, inputX2, inputY2));
  }

    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Coordinate Calculator</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            X1
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
                setX1(input);
                calculation(input,y1,x2,y2);
                }
              }
            value={x1}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            Y1
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              setY1(input);
              calculation(x1,input,x2,y2);
              }
            }
            value={y1}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            X2
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              setX2(input);
              calculation(x1,y1,input,y2);
              }
            }
            value={x2}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>
            Y2
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(input) => {
              setY2(input);
              calculation(x1,y1,x2,input);
              }
            }
            value={y2}
            keyboardType={'numeric'}
            selectTextOnFocus={true}
          />
        </View>
        <View style={[styles.container,{paddingTop: 50}]}>
          <Text style={[styles.label,{color:'#B71C1C'}]}>
            Midpoint
          </Text>
          <TextInput
            style={styles.result}
            value={midPoint}
            editable={false}
          />
        </View>
        <View style={styles.container}>
          <Text style={[styles.label,{color:'#B71C1C'}]}>
            Distance
          </Text>
          <TextInput
            style={styles.result}
            value={distance}
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