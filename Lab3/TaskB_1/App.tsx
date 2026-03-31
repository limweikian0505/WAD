import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';
import WelcomeScreen from './WelcomeScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Welcome1" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;