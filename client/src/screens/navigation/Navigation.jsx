import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext} from '../../../context/authContext';

// Screens
import Home from '../tabs/Home';
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';
import SplashScreen from '../utils/SplashScreen';
import Register from '../auth/Register';
import Scheduler from '../tabs/Scheduler';
import DailyReport from '../tabs/DailyReport';
import MonthlyReport from '../tabs/MonthlyReport';
import Profile from '../tabs/Profile';
import EditProfile from '../utils/EditProfile';
import AddSchedule from '../utils/AddSchedule';

// Monthly Report Category Screens

import AllMonthlyReport from '../monthlyReportCategory/AllMonthlyReports';
import FYITMonthlyReport from '../monthlyReportCategory/FYITMonthlyReport';
import FYCSMonthlyReport from '../monthlyReportCategory/FYCSMonthlyReport';
import SYITMonthlyReport from '../monthlyReportCategory/SYITMonthlyReport';
import SYCSMonthlyReport from '../monthlyReportCategory/SYCSMonthlyReport';
import TYITMonthlyReport from '../monthlyReportCategory/TYITMonthlyReport';
import TYCSMonthlyReport from '../monthlyReportCategory/TYCSMonthlyReport';

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
        tabBarHideOnKeyboard: true,
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
        name="Daily Report"
        component={DailyReport}
        options={{
          headerShown: true,
          headerTitle: 'Daily Report',
          headerStyle: {backgroundColor: 'white'},
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
  const [state] = useContext(AuthContext);
  const authenticatedUser = state?.user && state?.token;

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      {authenticatedUser ? (
        <>
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen
            options={{
              headerShown: true,
              headerTitle: 'Edit Profile',
              headerStyle: {backgroundColor: 'white'},
            }}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen name="AddSchedule" component={AddSchedule} />
          <Stack.Screen name="AllMonthlyReport" component={AllMonthlyReport} />
          <Stack.Screen
            name="FYITMonthlyReport"
            component={FYITMonthlyReport}
          />
          <Stack.Screen
            name="FYCSMonthlyReport"
            component={FYCSMonthlyReport}
          />
          <Stack.Screen
            name="SYITMonthlyReport"
            component={SYITMonthlyReport}
          />
          <Stack.Screen
            name="SYCSMonthlyReport"
            component={SYCSMonthlyReport}
          />
          <Stack.Screen
            name="TYITMonthlyReport"
            component={TYITMonthlyReport}
          />
          <Stack.Screen
            name="TYCSMonthlyReport"
            component={TYCSMonthlyReport}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}
