import {LogBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import ViewScreen from './screens/ViewScreen';
import EditScreen from './screens/EditScreen';



const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6C63FF',
            elevation: 6,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{title: 'Add New Place'}}
        />
        <Stack.Screen
          name="View"
          component={ViewScreen}
          options={{title: 'Place Details'}}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{title: 'Edit Place'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
