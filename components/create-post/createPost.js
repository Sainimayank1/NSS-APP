import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Document from 'react-native-document-picker';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Header from '../header/Header';

const Post = () => {
  const handleNotActive = () => {
    Toast.show({
      type: 'error',
      text1: 'Sorry these feature is currently not available ',
      text2: 'Please use Web-version ',
    });
  };
  const handleImage = async () => {
    try {
      const resp = await Document.pickSingle({
        type: [Document.types.images],
      });
      if (resp) {
        if (resp.size / (1024 * 1024) > 5) {
          Toast.show({
            type: 'error',
            text1: 'File size is greater than 5mb.',
            text2: 'Please use smaller file',
          });
        }
      }

      console.log(resp);
    } catch (error) {
      if (Document.isCancel(err)) console.log('User cancel');
    }
  };

  const handleVedio = async () => {
    try {
      const resp = await Document.pickSingle({
        type: [Document.types.video],
      });
      if (resp) {
        if (resp.size / (1024 * 1024) > 10) {
          Toast.show({
            type: 'error',
            text1: 'File size is greater than 10mb.',
            text2: 'Please use smaller file',
          });
        }
      }
      console.log(resp);
    } catch (error) {
      if (Document.isCancel()) console.log(error);
    }
  };

  return (
    <>
      <Header />

        <ScrollView style={{flex: 1 , position:"relative"}}>
          <View style={style.main}>
            <Toast />
            <View style={style.textTitle}>
              <Text style={style.text}>Title</Text>
              <TextInput
                placeholder="Enter tittle"
                style={style.input}></TextInput>
            </View>
            <View style={style.textTitle}>
              <Text style={style.text}>Discription</Text>
              <TextInput
                placeholder="Enter Discription"
                style={style.input}
                multiline></TextInput>
            </View>
            <View style={style.btnBox}>
              <TouchableOpacity onPress={handleImage} style={style.btn}>
                <Text style={{color: 'grey', fontWeight: 'bold'}}>
                  Choose Image.
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVedio} style={style.btn}>
                <Text style={{color: 'grey', fontWeight: 'bold'}}>
                  Choose Vedio.
                </Text>
              </TouchableOpacity>
            </View>
            <View style={style.submitBox}>
              <TouchableOpacity
                onPress={() => handleNotActive()}
                style={style.submitBtn}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
     
    </>
  );
};

export default Post;

const style = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor:"red",
    alignItems: 'center',
    padding: 20,
  },
  textTitle: {
    // backgroundColor:"green",
    width: '100%',
    marginVertical: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    color: 'black',
    marginTop: 5,
    fontSize: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  btnBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    // backgroundColor:"rbga(144,155,100,100)",
    // opacity:0.1,
    borderColor: 'grey',
    borderWidth: 1,
    width: '40%',
    margin: 10,
    padding: 10,
    borderRadius: 50,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  submitBtn: {
    backgroundColor: '#303983',
    width: '80%',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blur:{
    position:"absolute",
    zIndex:2,
    backgroundColor:"rgba(128,128,128, 0.8)",
    width:"100%",
    height:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  }
});
