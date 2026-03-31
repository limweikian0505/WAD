import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { InputWithLabel, AppButton } from './UI'
import calculateDistance, { calculateMidPoint } from './Calculation'

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

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <InputWithLabel
            label={'X1:'}
            orientation={'horizontal'}
            placeholder="type here"
            inputStyle={styles.input}
            keyboardType='numeric'
            value={x1}
            onChangeText={(x1:string) =>
              setX1(x1)
            }
          />
          <InputWithLabel
            label={'X2:'}
            orientation={'horizontal'}
            inputStyle={styles.input}
            keyboardType='numeric'
            value={x2}
            onChangeText={(x2:string) =>
              setX2(x2)
            }
          />
        </View>

        <View style={styles.row}>
          <InputWithLabel
            label={'Y1:'}
            orientation={'horizontal'}
            inputStyle={styles.input}
            keyboardType='numeric'
            value={y1}
            onChangeText={(y1:string) =>
              setY1(y1)
            }
          />
          <InputWithLabel
            label={'Y2:'}
            orientation={'horizontal'}
            inputStyle={styles.input}
            keyboardType='numeric'
            value={y2}
            onChangeText={(y2:string) =>
              setY2(y2)
            }
          />
        </View>

        <AppButton 
          onPress={ () => {
            setMidPoint(calculateMidPoint(x1,y1,x2,y2));
            setDistance(calculateDistance(x1,y1,x2,y2));
          }
          }
          title='Click Me'
        />

        <Text style={styles.output}>
          Mid Point: {midPoint}
        </Text>
        <Text style={styles.output}>
          Distance: {distance}
        </Text>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  text: {
    fontSize: 48,
    color: 'black',
  },
  input: {
    textAlign: 'center',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#286090',
    alignSelf: 'stretch',
    alignItems:'center',
    justifyContent:'center',
    height: 60,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  output: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});

export default App;