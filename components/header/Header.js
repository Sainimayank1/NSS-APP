import { View, Text , StyleSheet , Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={style.main}>
        <View style={style.upper}>
                <Image style={style.img} source={require("../../assests/imges/nss.png")}></Image>
                <Text style={style.nsstext}>NSS</Text>
        </View>
        <View style={style.down}>
            <Text style={style.text}>National Service Scheme</Text>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    main:{
        zIndex:10,
        backgroundColor:"#303983",
        width:"100%",
        height:70,
        alignItems:"center",
        justifyContent:"center",
    },
    upper:{
        flexDirection:"row",
        alignItems:"center"
    },
    img:{
        height:30,
        width:30,
        marginRight:10
    },
    text:{
        color:"white",
        fontSize:10
    },
    nsstext:{
        color:"white",
        fontSize:20
    }

})

export default Header