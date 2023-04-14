import { View, Text , StyleSheet , Image} from 'react-native'
import React from 'react'

const Post = ({data}) => {
    console.log(data)
  return (
    <View style={style.main}>
        <View style={style.upper}>
            <Image></Image>
            <View>
                <View style={style.name}><Text>{data.userName}</Text></View>
                <View><Text>Student</Text></View>
                <View><Text>2sec</Text></View>
            </View>
        </View>
        <View style={style.desc}>
            <Text>{data.title}</Text>
            <Text>{data.description}</Text>
        </View>
        <View style={style.img}>
            <Image source={data.image.url !== "" ? {uri:'data:'+data.image.url} : require("../../assests/imges/nss.png")}></Image>
        </View>
        <View style={style.bottom}>
            <View><Text>Like</Text></View>
            <View><Text>Comment</Text></View>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    main:{
        flex:1,
        padding:20,
        borderBottomColor:"gray",
        borderBottomWidth:2
    },
    upper:{

    },
    img:{

    },
    desc:{

    },
    bottom:{

    },
    name:{
        color:"black"
    }
})

export default Post