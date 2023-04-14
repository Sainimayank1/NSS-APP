import { useNavigation } from '@react-navigation/native';
import React, { useState , useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import axios from "axios"
import { setLoading, setRegisterMessage, setRegisterError ,resetLoading, resetRegisterError,  resetRegisterMessage , setToken,  } from '../../store/slices/authSlice'
import { useDispatch , useSelector} from 'react-redux';

function Register() {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const { loading, RegisterError ,RegisterMessage } = useSelector((state) => { return state.auth; })
    const [imgData,setImgData] = useState({
            url:"",
            public_id:""
    })
    const [state, setState] = useState(
        {
            isTeacher: false,
            name: "",
            email: "",
            rollno: "",
            phone: "",
            password: "",
            cpassword: ""
        }
    );

    useEffect(() => {
        if (RegisterError.length > 0) {
            RegisterError.map((error) => {
                Toast.show({
                    type: "error",
                    text1: error.msg
                })
            })
            dispatch(resetRegisterError())
        }

    }, [RegisterError])

    useEffect(() => {
        if (RegisterMessage !== "") {
            Toast.show({
                type: "success",
                text1: RegisterMessage
            })
            dispatch(resetRegisterMessage())
            navigate.navigate('login')
        }
    }, [RegisterMessage])


     const handleSubmit = async () => {
        if (state.password !== state.cpassword) {
            Toast.show({
                type: "error",
                text1: "Password don't match"
            })
        }
        else {
            const config = {
                header: {
                    "Content-type": "application/json",
                },
            };

            const details = { state , imgData }
            dispatch(setLoading());
            try {
                    const response = await axios.post("https://nssjmieti.onrender.com/register",details,config );
                    if (!response)
                      dispatch(setRegisterError(response.data.errors));
                    else
                    dispatch(setRegisterMessage(response.data.message))
                    dispatch(resetLoading());
                  }
             catch (error) {
                    dispatch(resetLoading());
                    dispatch(setRegisterError(error.response.data.errors));
            }
        }
    }

        return (
            <View style={styles.main}>
                <Toast />
                <View style={styles.sub}>
                    <View style={styles.left}>
                        <Text style={styles.register_bg}>Register</Text>
                        <View style={styles.select}>
                            <TouchableOpacity style={styles.touch} onPress={() => { setState({ ...state, isTeacher: false }) }}>
                                <Text style={{ color: "black" }}>Student</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.touch} onPress={() => { setState({ ...state, isTeacher: true }) }}>
                                <Text style={{ color: "black" }}>Staff</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput style={styles.inp} placeholder='Name' onChangeText={(name) => setState({ ...state, name })} placeholderTextColor={"black"}></TextInput>

                        <TextInput style={styles.inp} placeholder='Email' placeholderTextColor={"black"} onChangeText={(email) => setState({ ...state, email })} ></TextInput>

                        {
                            !state.isTeacher && <TextInput style={styles.inp} placeholder='Rollno' onChangeText={(rollno) => setState({ ...state, rollno })} placeholderTextColor={"black"}></TextInput>
                        }
                        <TextInput style={styles.inp} placeholder='Mobile No' placeholderTextColor={"black"} onChangeText={(phone) => setState({ ...state, phone })} ></TextInput>

                        <TextInput style={styles.inp} placeholder='Password' secureTextEntry={true} placeholderTextColor={"black"} onChangeText={(password) => setState({ ...state, password })} ></TextInput>

                        <TextInput style={styles.inp} placeholder='Re-Enter Password' secureTextEntry={true} placeholderTextColor={"black"} onChangeText={(cpassword) => setState({ ...state, cpassword })} ></TextInput>

                        <TouchableOpacity style={styles.btn} onPress={handleSubmit}><Text style={{ color: "white", }}>{loading ? "...." : "Register"}</Text></TouchableOpacity>

                        <Text style={{ color: "black" }}>Or</Text>
                        <Text style={{ color: "black" }}>Already a student ?</Text>

                        <TouchableOpacity onPress={() => { navigate.navigate("login") }}><Text style={{ color: "red" }}>Login</Text></TouchableOpacity>

                    </View>
                    <Image style={styles.img} source={require("../../assests/3d-logo/register.png")}></Image>
                </View>
            </View>
        )
    }

export default Register


const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
    },
    sub: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    img: {
        width: 150,
        height: 400,
        margin: 10
    },
    inp: {
        borderColor: "#303983",
        borderBottomWidth: 1,
        width: "80%",
        padding: 0,
        paddingHorizontal: 5,
        paddingVertical: 4,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        marginTop: 10,
    },
    left: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    select: {
        flexDirection: "row"
    },
    touch: {
        margin: 10,
        borderColor: "#303983",
        borderWidth: 1,
        padding: 5,
        borderRadius: 20
    },
    register_bg: {
        color: "#303983",
        fontSize: 32,
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
    },
});
