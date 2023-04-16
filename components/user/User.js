import { View, Text, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';

const User = () => {
  const [isNameVisible , setNameVisible] = useState(false)
  const { user, token } = useSelector((state) => { return state.auth; })

  const handleName = () =>
  {
    setNameVisible(!isNameVisible)
  }

  return (
    <View style={style.main}>
      <View style={style.upper}>
        <Image style={style.img} source={user.url === "" ? require("../../assests/imges/user1.png") : { uri: user.url }}></Image>
        <Text style={style.name}>Hello , {user.name}</Text>
      </View>
      <View style={style.down}>
        <View style={style.first}>
          <TouchableOpacity style={style.firstBtn} onPress={handleName}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.firstBtn}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Image</Text>
          </TouchableOpacity>
        </View>
        <View style={style.second}>
          <TouchableOpacity style={style.secondBtn}>
            <Text style={{color:"white",fontWeight:"bold"}}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isNameVisible ? <View style={style.fullDisplay}>
        <View style={style.sub}>
        <View style={{ alignItems:"flex-end" , padding:10 , width:"100%"}}>
        <TouchableOpacity  onPress={()=>setNameVisible(!isNameVisible)}>
         <Icon name="user" size={30} color="black" />

        </TouchableOpacity>
        </View>
          <TextInput placeholder='Change Name' style={{width:"80%"}}></TextInput>
          <TouchableOpacity style={style.secondBtn}><Text style={{color:"white",fontWeight:"bold"}}>SUbmit</Text></TouchableOpacity>
        </View>
      </View> : null}
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
  secondBtn:{
    width:"80%",
    backgroundColor:"#303983",
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#303983",
    margin:10,
  },
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
})

export default User