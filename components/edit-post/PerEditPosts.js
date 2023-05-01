import { Text, StyleSheet, View , ScrollView , TextInput,TouchableOpacity} from 'react-native'
import React, { Component , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetLoading, setLoading } from '../../store/slices/authSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import axios from 'axios';

export default function PerEditPosts() {
  const dispatch = useDispatch();
  const [title,setTitle]=useState("");
  const [desc , setDesc] = useState("");
  const {editPostId } = useSelector((state) => { return state.post; })
  const { user, loading, token } = useSelector((state) => { return state.auth; })

  const handleDesc = (text) =>
  {
    setDesc(text);
  }

  const handleTitle = (text) =>
  {
    setTitle(text);
  }

  const handleSubmit = async () =>
  {
        const values = {title:title,description:desc,id:editPostId} 
        const data = values;
        dispatch(setLoading())
        const config =
        {
            headers: {
                Authorizaton: 'Bearer ' + token
            }
        }
        try {
            const response = await axios.post('https://nssjmieti.onrender.com/post/update',data, config)
            Toast.show({
                type: "success",
                text1: response.data.msg
              })
            dispatch(resetLoading())
          } catch (error) {
          dispatch(resetLoading())
          Toast.show({
            type: "error",
            text1: error.response.data.errors.errors[0].msg
          })
        }

  }
    return (
      <ScrollView>
      <Toast/>
    <View style={style.main}>
      <View style={style.textTitle}>
        <Text style={style.text}>Title</Text>
        <TextInput placeholder='Enter tittle' style={style.input} placeholderTextColor="black" onChangeText={handleTitle}></TextInput>
      </View>
      <View style={style.textTitle}>
        <Text style={style.text}>
          Discription
        </Text>
        <TextInput placeholder='Enter Discription' style={style.input} placeholderTextColor="black" multiline onChangeText={handleDesc}></TextInput>
      </View>
      <View style={style.submitBox}>
      <TouchableOpacity style={style.submitBtn} onPress={handleSubmit}><Text style={{color:"white", fontWeight:"bold" , fontSize:18}}>{loading ? "....." : "Edit Post"}</Text></TouchableOpacity>
      </View>
    </View>
  </ScrollView>
    )
}

const style = StyleSheet.create({
  main:{
    flex:1,
    // backgroundColor:"red",
    alignItems:"center",
    padding:20
  },
  textTitle:{
    // backgroundColor:"green",
    width:"100%",
    marginVertical:20
  },
  text:{
    fontSize:30,
    fontWeight:"bold",
    color:"black"
  },
  input:{
    borderColor:"grey",
    borderBottomWidth:1,
    marginTop:5,
    fontSize:15,
    color:"black",
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  btnBox:{
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around"
  },
  btn:{
    // backgroundColor:"rbga(144,155,100,100)",
    // opacity:0.1,
    borderColor:"grey",
    borderWidth:1,
    width:"40%",
    margin:10,
    padding:10,
    borderRadius:50,
    color:"white",
    alignItems:"center",
    justifyContent:"center"
  },
  submitBox:{
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    margin:20,
  },
  submitBtn:{
    backgroundColor: "#303983",
    width:"80%",
    borderRadius:50,
    padding:10,
    alignItems:"center",
    justifyContent:"center"
  }
})