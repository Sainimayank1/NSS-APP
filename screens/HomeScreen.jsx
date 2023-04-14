import React from 'react';
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../components/home/Home"
import Post from "../components/post/Post"
import Notification from '../components/notificarion/Notification';
import User from '../components/user/User';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


const HomeScreen = () => {
    const { user } = useSelector((state) => { return state.auth; })

    return (
        <Tab.Navigator screenOptions={
            {
                headerShown: false,
                // tabBarShowLabel:false,
                tabBarActiveTintColor: "#303983",
                tabBarStyle: {
                    height: 45,
                    position: "absolute",
                    margin: 20,
                    borderRadius: 20,
                    padding: 0,
                    alignItems: "center"
                }
            }
        }
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size, focused }) => <Icon
                    name={focused ? "home" : "home-outline"}
                    color={focused ? "#303983" : "black"}
                    size={20} />
            }} />
            <Tab.Screen name="Post" component={Post} options={{
                tabBarIcon: ({ color, size, focused }) => <Icon
                    name={focused ? "add-circle" : "add-circle-outline"}
                    color={focused ? "#303983" : "black"}
                    size={20} />
            }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarIcon: ({ color, size, focused }) => <Icon
                    name={focused ? "notifications" : "notifications-outline"}
                    color={focused ? "#303983" : "black"}
                    size={20} />
            }} />
            <Tab.Screen name="User" component={User} options={{
                tabBarIcon: ({ color, size, focused }) => <Icon
                    name={focused ? "person" : "person-outline"}
                    color={focused ? "#303983" : "black"}
                    size={20} />
            }} />
        </Tab.Navigator>
    )
}

export default HomeScreen