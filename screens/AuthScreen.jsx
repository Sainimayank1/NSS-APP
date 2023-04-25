import React, { setInterval } from 'react';
import Login from '../components/auth/Login.js';
import Register from '../components/auth/Register.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from "./HomeScreen.jsx"
import Splash from '../components/splash/Splash.js';
const Stack = createStackNavigator();

const AuthScreen = () => {
  
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {/* <Stack.Screen name="splash" component={Splash} /> */}
          {/* <Stack.Screen name="login" component={Login} /> */}
          {/* <Stack.Screen name="register" component={Register} />  */}
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AuthScreen