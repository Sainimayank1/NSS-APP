import { StyleSheet, Text, View, TextInput, TouchableOpacity , Image , FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { setLoading, resetLoading, setToken, } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";



const Comment = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Comment , setComment] = useState([]);
  // const { loading } = useSelector((state) => { return state.auth; })
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);
      try {
        const PostId = data._id
        const response = await axios.get('https://nssjmieti.onrender.com/post/:' + PostId)
        // const data = response.data.data[0];
        // const comment  = response.data.comment
        setComment(response.data.comment)
        console.log(Comment)
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchdata();
  }, [data._id])
  return (
    <View>
      <View>
        <TextInput placeholderTextColor="black" placeholder='Enter Comment' />
        <TouchableOpacity>
          <Text style={{ color: "black" }}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          isLoading ? <Text style={{ color: "black" }}>Loading...</Text> :
          Comment.lenght > 0 ? 
            <FlatList >
              data={Comment}
              render={(data)=>{
                <View>
              <View>
              <Image  source={data.url === "" ? require("../../assests/imges/user1.png") : { uri: data.url }}></Image>
                    <View><Text style={{ color: "black" }}>{data.userName}</Text></View>
                    <View><Text style={{ color: "black", fontSize: 10 }}>
                        {moment(data.createdAt).fromNow()}
                    </Text></View>
              </View>
              <View></View>
              </View>
              }}
            </FlatList>
          :
          <View><Text style={{ color: "black" }}>No Comment.</Text></View>
        }
          
        
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({})