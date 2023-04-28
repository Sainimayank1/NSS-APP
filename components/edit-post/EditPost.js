import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, resetLoading } from '../../store/slices/authSlice'
import { setUserPosts } from '../../store/slices/postSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react'
import moment from "moment";

const h = Dimensions.get('screen').height;

const Notification = () => {
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = useState(false);
  const { user, loading } = useSelector((state) => { return state.auth; })
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
      console.log(response);
      setRefresh(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView>

      {
        loading ?
          <View style={{ height: "90%", display: "flex", alignContent: "center", justifyContent: "center", borderColor: "black", borderWidth: 2 }}>
            <ActivityIndicator size={60} color="#303983" />
          </View>
          :
          <ScrollView refreshControl={<RefreshControl
            refreshing={isRefresh} onRefresh={getData}
          />}>
            <View style={styles.main}>
              {
                userPosts.map((data) => {
                  return <View style={styles.subMain} key={data._id}>
                    <View style={styles.first}>
                      <Text style={{color:"black",fontSize:20}}>
                        {
                          data.title
                        }
                      </Text>
                        <Text style={{color:"black",fontSize:15}}>
                          Published:{moment(data.createdAt).fromNow()}
                        </Text>
                    </View>
                    <View style={styles.second}>
                      <View style={styles.icon}>
                        <Icon
                          name="create-outline"
                          color={"black"}
                          size={25}>
                        </Icon>
                      </View>
                      <View style={styles.icon}>
                        <Icon
                          name="trash-outline"
                          color={"black"}
                          size={25}>
                        </Icon>
                      </View>
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
    // borderColor: "black",
    marginVertical:20
    // borderWidth: 4
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
  first:{
    display:"flex",
    flexDirection:"column"
  },
  second: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  icon:{
    marginHorizontal:5
  }
})

export default Notification