import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen"
import ArticleScreen from "./screens/ArticleScreen";
import AuthorScreen from "./screens/AuthorScreen";


export type RootStackParamList = {
  Home: undefined;
   Author:{author:any};
   Article:{article:any};
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
          name="Article" 
          component={ArticleScreen} 
          options={styles}>
        </Stack.Screen>
        <Stack.Screen 
          name="Author"
          component={AuthorScreen}
          options={styles}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles: StackNavigationOptions = ({
  headerTitleAlign:'center',
  headerStyle: {
      backgroundColor: '#3846ab',
    },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
});

export default App;