import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, resetLoading, setLoginError, setToken, resetLoginError, setLoginMessage, resetLoginMessage } from '../../store/slices/authSlice'
import Icon from 'react-native-vector-icons/Ionicons';
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native';

const  Login =  () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading, LoginError, LoginMessage } = useSelector((state) => { return state.auth; })

    
    
    const [details, setDetails] = useState({ email: "", password: "" })
    const [isChange, setChange] = useState(false);
    const [isVisible, setVisible] = useState(false);


    const handleEmail = (email) => {
        setDetails({ ...details, email });
    }

    const handlePassword = (password) => {
        if (!isChange)
            setChange(true);
        setDetails({ ...details, password })
    }

    useEffect(() => {
        if (LoginError.length > 0) {
            LoginError.map((error) => {
                Toast.show({
                    type: "error",
                    text1: error
                })
            })
            dispatch(resetLoginError())
        }

    }, [LoginError])

    useEffect(() => {
        if (LoginMessage !== "") {
            Toast.show({
                type: "success",
                text1: LoginMessage
            })
            dispatch(resetLoginMessage())
        }
    }, [LoginMessage])

    const handleSubmit = async () => {
        if (details.email === "" || details.password === "") {
            Toast.show({
                type: "error",
                text1: "Please enter a valid detail."
            })
        }
        else {
            const config =
            {
                header: {
                    'Content-type': 'application/json'
                }
            }
            dispatch(setLoading())
            try {
                const response = await axios.post('https://nssjmieti.onrender.com/login', details, config)
                if (response) {
                    await AsyncStorage.setItem('NSSTOKEN', response.data.maintoken);
                    dispatch(setLoginMessage(response.data.msg))
                    dispatch(setToken(response.data.maintoken))
                    navigate.replace('register');
                }
                else
                    dispatch(setLoginError(response.data.errors))
                dispatch(resetLoading())

            } catch (error) {
                dispatch(resetLoading())
                dispatch(setLoginError(error.response.data.errors))
                // dispatch({ type: "LOGIN_ERRORS", payload: error.response.data.errors })
            }
        }
    }

    return (
        <View style={styles.login_main}>
            <Toast />
            <View style={styles.sub}>
                <View style={styles.sub1}>
                    <Text style={styles.login_bg}>Login</Text>
                    <View style={styles.inp_main}>
                        {/* Email */}
                        <TextInput style={styles.inp} placeholder='Email' placeholderTextColor={"black"} onChangeText={handleEmail}></TextInput>
                    </View>
                    <View style={styles.inp_main}>
                        {/* Password */}
                        <TextInput style={styles.inp} placeholder="Password" placeholderTextColor={"black"} onChangeText={handlePassword} secureTextEntry={isVisible ? false : true}></TextInput>
                        {isChange ? <Icon
                            name={isVisible ? "eye-outline" : "eye-off-outline"}
                            color={"black"}
                            size={20}
                            onPress={() => { setVisible(!isVisible); }}>

                        </Icon> : null}
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        {/* Submit */}
                        <Text style={{ color: "white" }}>{loading ? "...." : "Login"}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "black" }}>Or</Text>
                    <Text style={{ alignItems: "center", justifyContent: "center", color: "black" }}>New user ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("register")}>
                        {/* Register */}
                        <Text style={{ color: "red", alignItems: "center", justifyContent: "center" }}>Register here.</Text>
                    </TouchableOpacity>
                </View>
                <Image style={styles.img} source={require("../../assests/3d-logo/login.png")}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    login_main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "black",
    },
    sub: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sub1: {
        alignItems: "center",
    },
    img: {
        width: 150,
        height: 400,
    },
    login_bg: {
        color: "#303983",
        fontSize: 32,
    },
    inp_main: {
        width: 200,
        borderBottomColor: "#303983",
        borderBottomWidth: 1,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomRightRadius: 3,
    },
    inp: {
        padding: 0,
        fontSize: 15,
        color: "black"
    },
    btn: {
        backgroundColor: "#303983",
        width: 100,
        margin: 15,
        color: "white",
        fontWeight: "bold",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    }
})

export default Login