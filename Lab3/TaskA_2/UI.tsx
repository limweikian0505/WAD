import React, {Component} from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
/**
 * InputWithLabel
 */
const InputWithLabel = ( props: any ) => {

  const orientationDirection = (props.orientation == 'horizontal') ? 'row': 'column';

  return (
    <View style={[inputStyles.container, {flexDirection: orientationDirection}]}>
      <Text style={inputStyles.label}>{props.label}</Text>
      <TextInput
        style={[inputStyles.input, props.style]}
        {...props}
      />
    </View>
  );
}


/**
 * AppButton
 */
const AppButton = ( props: any ) => {

  let backgroundColorTheme = '';

  if(props.theme) {
      switch(props.theme) {
          case 'success':
              backgroundColorTheme = '#449d44';
              break;
          case 'info':
              backgroundColorTheme = '#31b0d5';
              break;
          case 'warning':
              backgroundColorTheme = '#ec971f';
              break;
          case 'danger':
              backgroundColorTheme = '#c9302c';
              break;
          case 'primary':
              backgroundColorTheme = '#60717d';
              break;
          default:
              backgroundColorTheme = '#286090';
      }
  }
  else {
      backgroundColorTheme = '#286090';
  }

  return (
      <TouchableNativeFeedback
          onPress={props.onPress}
          onLongPress={props.onLongPress}
      >
          <View style={[buttonStyles.button, {backgroundColor: backgroundColorTheme}]}>
              <Text style={buttonStyles.buttonText}>{props.title}</Text>
          </View>
      </TouchableNativeFeedback>
  )
}

const buttonStyles = StyleSheet.create({
  button: {
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    fontSize: 20,
    color: 'white',
  },
});

const inputStyles = StyleSheet.create({
  container: {
    height: 100,
    flex:1,                  
    borderTopWidth:1,
    borderBottomWidth:1
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  input: {
    flex: 3,
    fontSize: 20,
    color: 'blue',
  },
});



type PickerWithLabelProps = {
  label: string;
  items: any[];
  selectedValue: string
  onValueChange: (input:string)=>void
  orientation?:string
};


const PickerWithLabel = (props: PickerWithLabelProps) => {


  return (
    <View style={{margin: 10,  flexDirection:( props.orientation=='horizontal')?"row":"column"  }}>
      <Text
        style={{fontWeight: 'bold', fontSize: 20, textAlignVertical: 'center', height:50}}>
        {props.label} :
      </Text >
      <Picker   style={{width:'60%',textAlignVertical:'center' , height:50, fontSize:20}} {...props}>
        {props.items.map((item: any) => {
          return <Picker.Item label={item.value} value={item.key} key={item.key} />;
        })}
      </Picker>
    </View>
  );
};

export {
  InputWithLabel,
  AppButton,
  PickerWithLabel
}