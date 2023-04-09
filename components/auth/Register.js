import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Register() {
    return (
        <View style={styles.main}>
            <Text style={{color:"black"}}>
                Hello
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },  
})

export default Register