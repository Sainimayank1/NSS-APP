import React, { setInterval } from 'react';
import editPost from "../components/edit-post/EditPost"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PerEditPosts from '../components/edit-post/PerEditPosts';
const Stack = createStackNavigator();

const AuthScreen = () => {
  
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName="edit-post">
          <Stack.Screen name="edit-post" component={editPost} />
          <Stack.Screen name="edit-per-post" component={PerEditPosts} options={{presentation: 'modal'}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default AuthScreen