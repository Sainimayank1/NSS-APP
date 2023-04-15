import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { setAllPosts } from '../../store/slices/postSlice';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';



const Splash = () => {
        const navigate = useNavigation();
        const dispatch = useDispatch();
        setTimeout( async () => {
            const response  = await AsyncStorage.getItem("NSSTOKEN");
            dispatch(setToken(response));

            if(response)
            {
                
                const data = await axios.get("https://nssjmieti.onrender.com/post/posts")
                dispatch(setAllPosts(data.data.data))
                navigate.navigate('home');
            }
            else
            {
                navigate.navigate("login");
            }
        }, 3000)
        return (
            <>
                <View style={styles.main}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image style={styles.img} source={require("../../assests/imges/nss.png")}></Image>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Welcome To NSS JMIETI</Text>
                    </View>
                </View>
                <View style={styles.sub_main}>
                    <Text >Made By Mayank</Text>

                </View>
            </>
        )
    }

    const styles = StyleSheet.create({
        main: {
            alignItems: "center",
            flex: 1,
            justifyContent: "space-around"
        },
        sub_main: {
            flex: 0.2,
            alignItems: "center",
            justifyContent: "center"
        },
        img: {
            height: 120,
            width: 120,
            marginBottom: 10
            // aspectRatio:1
        }
    })

    export default Splash