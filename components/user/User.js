import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { setLogout } from '../../store/slices/authSlice'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, TabActions, useNavigation } from '@react-navigation/native'

const User = () => {
  const [isNameVisible , setNameVisible] = useState(false)
  const dispatch = useDispatch();
  const [isPasswordVisible , setPasswordVisible] = useState(false)
  const navigate = useNavigation();
  const { user, token } = useSelector((state) => { return state.auth; })

  const handleNotActive = () =>
  {
    Toast.show({
      type: "error",
      text1: "Sorry these feature is currently not available ",
      text2:"Please use Web-version "
    })
  }


  return (
    <View style={style.main}>
      <Toast />
      <View style={style.upper}>
        <Image style={style.img} source={user.url === "" ? require("../../assests/imges/user1.png") : { uri: user.url }}></Image>
        <Text style={style.name}>Hello , {user.name}</Text>
      </View>
      <View style={style.down}>
        <View style={style.first}>
          <TouchableOpacity style={style.firstBtn} onPress={()=>{setNameVisible(!isNameVisible)}}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.firstBtn} onPress={()=>handleNotActive()}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Image</Text>
          </TouchableOpacity>
        </View>
        <View  style={style.first}>
          <TouchableOpacity style={style.firstBtn} onPress={()=>{setPasswordVisible(!isPasswordVisible)}}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.logout} onPress={()=>{
              dispatch(setLogout());
              AsyncStorage.removeItem("NSSTOKEN");
              navigate.dispatch(StackActions.replace('login'))
          }}>
            <Text style={{color:"white",fontWeight:"bold"}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View> 
      {/* Chage Name  */}
      {isNameVisible ? <ChangeName isNameVisible={isNameVisible} setNameVisible={setNameVisible} /> : null}

      {/* Change password */}
      {isPasswordVisible ? <ChangePassword  isPasswordVisible={isPasswordVisible} setPasswordVisible={setPasswordVisible}/> : null }

    </View>
  )
}

const style = StyleSheet.create({
  main: {
    flex: 1
  },
  upper: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: "20%",
    height: "20%",
    resizeMode: "contain"
  },
  name: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    margin: 10
  },
  down:{
    width:"100%",
    alignItems:"center",
    // borderColor: "black",
    // borderWidth: 2,
    height:"100%"
  },
  first:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",

  },
  firstBtn:{
    width:"40%",
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#303983",
    margin:10,
  },
  second:{
    width:"80%",
    alignItems:"center",
    justifyContent:"center"
  },
  logout:{
    backgroundColor:"red",
    width:"40%",
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor:"#303983",
    margin:10,
  }
  
})

export default User