import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
 
import HomeScreen from "./screens/HomeScreen";
import ChickenScreen from "./screens/ChickenScreen";
import KoalaScreen from "./screens/KoalaScreen";

export type RootStackParamList = {
  Home: undefined;
  Chicken: undefined;
  Koala: undefined;
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
          name="Chicken" 
          component={ChickenScreen} 
          options={styles}>
        </Stack.Screen>
        <Stack.Screen 
          name="Koala"
          component={KoalaScreen}
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
    fontWeight: 'bold',
  }
})

export default App;