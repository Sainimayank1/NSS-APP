import { View, Text,ActivityIndicator ,SafeAreaView,ScrollView,RefreshControl} from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, resetLoading } from '../../store/slices/authSlice'
import React, { useEffect, useState } from 'react'

const Notification = () => {
  const { user, loading } = useSelector((state) => { return state.auth; })
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const {_id} = user;

  useEffect(() => {
    const DoIt = async () => {
      try {
        const response = await axios.get('https://nssjmieti.onrender.com/post/userAllPosts/'+ _id)
        setData(response.data.data)
        console.log(response.data.data);
      } catch (error) {
      }
    }
    DoIt();
  }, [])

  const getData = async () => {
    try {
      isRefresh(true)
      const response = await axios.get('https://nssjmieti.onrender.com/post/userAllPosts/'+ _id)
      setData(response.data.data)
      console.log(data);
      isRefresh(false)
    } catch (error) {
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
          <View>
            <Text>Hellpo</Text>
          </View>
        </ScrollView>
    }
    </SafeAreaView>
  )
}

export default Notification