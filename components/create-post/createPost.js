import { View, Text , TextInput , StyleSheet } from 'react-native'
import React from 'react'

const Post = () => {
  return (
    <View style={style.main}>
      <View style={style.textTitle}>
        <Text>Enter Title</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>
          Enter Discription
        </Text>
        <TextInput></TextInput>
      </View>
    </View>
  )
}

export default Post

const style = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"red",
    alignItems:"center",
    padding:20
  },
  textTitle:{
    backgroundColor:"green",
    width:"100%"
  }
})