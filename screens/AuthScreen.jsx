import React from 'react';
import Login from '../components/auth/Login.js';
import Register from '../components/auth/Register.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />    
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default AuthScreen