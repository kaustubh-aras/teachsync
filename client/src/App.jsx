import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import Login from './screens/Login'
import Register from './screens/Register'
import SplashScreen from './screens/SplashScreen'
import Home from './screens/Home'

const Stack = createNativeStackNavigator();

const App = () => {
  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{headerShown : false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App
