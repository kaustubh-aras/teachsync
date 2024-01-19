import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Home from '../tabs/Home';
import Login from '../auth/Login';
import SplashScreen from '../utils/SplashScreen';
import Register from '../auth/Register';
import Scheduler from '../tabs/Scheduler';
import DailyReport from '../tabs/DailyReport';
import MonthlyReport from '../tabs/MonthlyReport';
import Profile from '../tabs/Profile';
import EditProfile from '../utils/EditProfile';

//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

// Navigation Initialization
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scheduler"
        component={Scheduler}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DailyReport"
        component={DailyReport}
        options={{
          tabBarLabel: 'Daily Report',
          tabBarIcon: ({color, size}) => (
            <Entypo name="text-document" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MonthlyReport"
        component={MonthlyReport}
        options={{
          tabBarLabel: 'Monthly Report',
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="graph" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
