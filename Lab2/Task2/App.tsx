import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AnimalScreen from "./screens/AnimalScreen"


export type RootStackParamList = {
  Home: undefined;
   Animal:{img:any};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title:'HomeScreen', ...styles}}>
        </Stack.Screen>
        <Stack.Screen 
          name="Animal" 
          component={AnimalScreen} 
          options={styles}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles: StackNavigationOptions = ({
  headerTitleAlign:'center',
  headerStyle: {
      backgroundColor: '#f4511e',
    },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'Anta-Regular'
  }
})

export default App;