import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { setLoading, resetLoading, setToken, } from '../../store/slices/authSlice'
import axios from "axios"
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangePassword = ({ isPasswordVisible, setPasswordVisible }) => {
    const { user, token, loading } = useSelector((state) => { return state.auth; })
    const [password, setPassword] = useState(null)
    const [cpassword, setCPassword] = useState(null);
    const dispatch = useDispatch()


    const handleSubmit = async () => {
            dispatch(setLoading())
            const { _id } = user
            const data = { current: password, newPassword: cpassword, _id }
            const config =
            {
                headers: {
                    Authorizaton: 'Bearer ' + token
                }
            }
            try {
                const response = await axios.post('https://nssjmieti.onrender.com/user/updatePassword', data, config)
                // setPasswordVisible(!isPasswordVisible)
                Toast.show({
                    type: "success",
                    text1: response.data.msg
                })
                dispatch(resetLoading())
            } catch (error) {
                error.response.data.errors.map((data)=>
                {
                    Toast.show({
                        type: "error",
                        text1: data.msg
                    })
                })
                dispatch(resetLoading());
            }
        
    }

    return (
        <View style={style.fullDisplay}>
            <Toast />
            <View style={style.sub}>
                <View style={{ padding: 10, width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>Change Password</Text>
                    <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                        <Icon name="close-outline" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <TextInput placeholder='Enter current Password' onChangeText={(text) => setPassword(text)} style={{ width: "80%" }} secureTextEntry={true} value={password}></TextInput>
                <TextInput placeholder='Enter New Password' onChangeText={(text) => setCPassword(text)} style={{ width: "80%" }} secureTextEntry={true} value={cpassword}></TextInput>
                <TouchableOpacity style={style.secondBtn}><Text style={{ color: "white", fontWeight: "bold" }} onPress={handleSubmit}>{loading ? "....." : "Submit"}</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePassword

const style = StyleSheet.create({
    fullDisplay: {
        zIndex: 100,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        alignItems: "center",
        justifyContent: "center"
    },
    sub: {
        width: "70%",
        // height:"10%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    secondBtn: {
        width: "80%",
        backgroundColor: "#303983",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#303983",
        margin: 10,
    },
})