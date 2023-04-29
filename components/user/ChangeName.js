import { StyleSheet, Text, View , TextInput } from 'react-native'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { setLoading, resetLoading , setToken,} from '../../store/slices/authSlice'
import axios from "axios"
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import AsyncStorage from '@react-native-async-storage/async-storage';


const ChangeName = ({isNameVisible , setNameVisible}) => {
  const { user, token , loading } = useSelector((state) => { return state.auth; })
  const [name,setName] = useState(user.name)
  const dispatch  = useDispatch()

 const handleName = (text) =>
 {
    setName(text);
 }

 const handleSubmit = async () =>
 {
    dispatch(setLoading())
    const {_id} = user 
    const data = {name,_id}
    const config =
    {
        headers: {
            Authorizaton: 'Bearer ' + token
        }
    }
    try {
        const response = await axios.post('https://nssjmieti.onrender.com/user/updateNames',data ,  config)
        dispatch(setToken(response.data.token))
        AsyncStorage.setItem("NSSTOKEN",response.data.token)
        setNameVisible(!isNameVisible)
        Toast.show({
            type: "success",
            text1: response.data.msg
        })
        dispatch(resetLoading())
    } catch (error) {
        Toast.show({
            type: "error",
            text1: error.response.data.error[0].msg
        })
        dispatch(resetLoading());
    }
 }

  return (
    <View style={style.fullDisplay}>
    <Toast />
    <View style={style.sub}>
    <View style={{ padding:10 , width:"100%" , flexDirection:"row" , justifyContent:"space-between"}}>
    <Text style={{fontSize:20 , color:"black" , fontWeight:"bold"}}>Change Name</Text>
    <TouchableOpacity  onPress={()=>setNameVisible(!isNameVisible)}>
     <Icon name="close-outline" size={35} color="black" />
    </TouchableOpacity>
    </View>
      <TextInput placeholder='Change Name' onChangeText={handleName} style={{width:"80%"}} value={name}></TextInput>
      <TouchableOpacity style={style.secondBtn}><Text style={{color:"white",fontWeight:"bold"}} onPress={handleSubmit}>{loading ? "....." : "Submit"}</Text></TouchableOpacity>
    </View>
  </View>
  )
}

export default ChangeName

const style = StyleSheet.create({
    fullDisplay:{
        zIndex:100,
        position:"absolute",
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.7)",
        alignItems:"center",
        justifyContent:"center"
      },
      sub:{
        width:"70%",
        // height:"10%",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center"
      },  
      secondBtn:{
        width:"80%",
        backgroundColor:"#303983",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#303983",
        margin:10,
      },
})