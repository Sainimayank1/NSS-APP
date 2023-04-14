import { View, Text , StyleSheet ,  RefreshControl,SafeAreaView,ScrollView, } from 'react-native'
import React , {useState} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import Header from '../header/Header'

const Home = () => {

  const [isRefresh,setRefresh] = useState(false);
  const { posts } = useSelector((state) => { return state.post; })


  const getData = () =>
  {
      try {

      } catch (error) {
        
      }
  }



  return (
    <SafeAreaView>
      <Header/>
      <ScrollView refreshControl={<RefreshControl
        refreshing={isRefresh} onRefresh={getData}
      />}>
        {
          posts ? 
           posts.map((data)=>
           {
            return <Post data={data}/>
           })
          : <View><Text>No Posts</Text></View>

        }
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  main:1,
})

export default Home