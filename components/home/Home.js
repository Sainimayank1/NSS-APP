import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import Header from '../header/Header'
import { setLoading, resetLoading } from '../../store/slices/authSlice'
import { setAllPosts } from '../../store/slices/postSlice';
import axios from "axios"

const Home = () => {
  const dispatch = useDispatch();
  const [isRefresh, setRefresh] = useState(false);
  const { posts } = useSelector((state) => { return state.post; })
  const { loading } = useSelector((state) => { return state.auth; })


  const getData = async () => {
    try {
      setRefresh(true);
      const data = await axios.get("https://nssjmieti.onrender.com/post/posts")
      dispatch(setAllPosts(data.data.data))
      setRefresh(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const doIt = async () => {
      try {
        dispatch(setLoading());
        const data = await axios.get("https://nssjmieti.onrender.com/post/posts")
        dispatch(setAllPosts(data.data.data))
        dispatch(resetLoading());
      } catch (error) {
        console.log(error)
      }
    }
    doIt();
  }, [])



  return (
    <SafeAreaView>
      <Header />
      {
        loading ?
          <View style={{ height: "90%", display: "flex", alignContent: "center", justifyContent: "center"}}>
            <ActivityIndicator size={60} color="#303983" />
          </View>
          :
          <ScrollView refreshControl={<RefreshControl
            refreshing={isRefresh} onRefresh={getData}
          />}>
            <View style={style.main}>
              {
                posts ?
                  posts.map((data) => {
                    return <Post data={data} key={data._id} />
                  })
                  : <View><Text>No Posts</Text></View>

              }
            </View>
          </ScrollView>
      }
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  main: {
    paddingBottom: 140
  }
})

export default Home