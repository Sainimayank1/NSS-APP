import { View, Text, ActivityIndicator, Alert, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, resetLoading } from '../../store/slices/authSlice'
import { setUserPosts } from '../../store/slices/postSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import moment from "moment";
import { useNavigation } from '@react-navigation/native'
import {setEditPostId} from "../../store/slices/postSlice"

const h = Dimensions.get('screen').height;

const Notification = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = useState(false);
  const { user, loading, token } = useSelector((state) => { return state.auth; })
  const { _id } = user;
  const { userPosts } = useSelector((state) => { return state.post; })


  useEffect(() => {
    const DoIt = async () => {
      try {
        setRefresh(true)
        const response = await axios.get('https://nssjmieti.onrender.com/post/userAllPosts/' + _id)
        dispatch(setUserPosts(response.data.data))
        setRefresh(false)
      } catch (error) {
        console.log(error.response.data)
      }
    }
    DoIt();
  }, [])

  const getData = async () => {
    try {
      setRefresh(true)
      const response = await axios.get('https://nssjmieti.onrender.com/post/userAllPosts/' + _id)
      dispatch(setUserPosts(response.data.data))
      setRefresh(false)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const handleDelete = (id) => {
    Alert.alert("Alert","Are you really want to delete post ?",
      [
        {
          text: "Yes",
          onPress: async () => {
            dispatch(setLoading());
            const config =
            {
              headers: {
                Authorizaton: 'Bearer ' + token
              }
            }
            try {
              const response = await axios.post('https://nssjmieti.onrender.com/post/delete/' + id, config)
              dispatch(resetLoading());
              // Toast.show({
              //   type: "error",
              //   text1: response.data.msg
              // })
              getData()
            } catch (error) {
              dispatch(resetLoading());
              console.log(error)
            }
          }
        },
        {
          text:"No",
          onPress:()=>{}
        }
      ])
  }


  const handlePopUp = (_id) => {
    console.log(_id)
    dispatch(setEditPostId(_id))
    navigate.navigate('edit-per-post')
  }

  return (
    <SafeAreaView>

      {
        loading ?
          <View style={{ height: "100%", display: "flex", alignContent: "center", justifyContent: "center" }}>
            <ActivityIndicator size={60} color="#303983" />
          </View>
          :
          <ScrollView refreshControl={<RefreshControl
            refreshing={isRefresh} onRefresh={getData}
          />}>
            <Toast />
            <View style={styles.main}>
              {
                userPosts.map((data) => {
                  return <View style={styles.subMain} key={data._id}>
                    <View style={styles.first}>
                      <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
                        {
                          data.title
                        }
                      </Text>
                      <Text style={{ fontSize: 15 }}>
                        Published:{moment(data.createdAt).fromNow()}
                      </Text>
                    </View>
                    <View style={styles.second}>
                      <TouchableOpacity style={styles.icon} onPress={handlePopUp(data._id)}>
                        <Icon
                          name="create-outline"
                          color={"black"}
                          size={25}>
                        </Icon>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.icon} onPress={() => handleDelete(data._id)}>
                        <Icon
                          name="trash-outline"
                          color={"black"}
                          size={25}>
                        </Icon>
                      </TouchableOpacity>
                    </View>
                  </View>
                })
              }
            </View>
          </ScrollView>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    height: h,
    width: "100%",
    marginVertical: 20
  },
  subMain: {
    minHeight: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 5,
    color: "black",
    flexDirection: "row"
  },
  first: {
    display: "flex",
    flexDirection: "column"
  },
  second: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5
  }
})

export default Notification