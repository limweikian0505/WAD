import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AndroidScreen from './AndroidScreen';
import HomeScreen from './HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import {TouchableHighlight} from 'react-native';
import { Children } from 'react';

export type RootTabParams = {
  Home: undefined;
  Android: undefined;
  Profile: undefined;
};

const CustomTabButton = (props:any) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: 100,
          backgroundColor: '#609146',
         
        }}>
        {props.children}
       
      </View>
    </TouchableNativeFeedback>
  );
};

const Tab = createBottomTabNavigator<RootTabParams>();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle:{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            position: 'absolute',
            backgroundColor: '#b3bab5',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Anta-Regular',
              fontSize: 30,
              color: '#efd6d6',
            },
            headerStyle: {backgroundColor: '#2b5684'},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="greenhouse"
                size={focused ? 30 : 20}
                color={focused ? 'red' : '#ffffff'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Android"
          component={AndroidScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Anta-Regular',
              fontSize: 30,
              color: '#e03737',
            },
            headerStyle: {backgroundColor: '#a5e6a4'},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="android"
                size={focused ? 30 : 20}
                color={focused ? '#364d2a' : '#ffffff'}
              />
            ),
            tabBarButton: props => <CustomTabButton {...props}  />,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Anta-Regular',
              fontSize: 30,
              color: '#e03737',
            },
            headerStyle: {backgroundColor: '#f3ee8c'},
            tabBarIcon: ({focused}) => (
              <MaterialCommunityIcons
                name="face-agent"
                size={focused ? 30 : 20}
                color={focused ? 'red' : '#ffffff'}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
