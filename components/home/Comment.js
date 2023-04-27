import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'



const Comment = ({ Data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentSubmiting , setCommentSubmiting] = useState(false)
  const [comments , setComments] = useState([]);
  const [comment , setComment] = useState("");
  const { user, token } = useSelector((state) => { return state.auth; })
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);
      try {
        const PostId = Data._id
        const response = await axios.get('https://nssjmieti.onrender.com/post/:' + PostId)
        dispatch(setComments(response.data.comment));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchdata();
  }, [Data,isCommentSubmiting])

  const handleComment = (text) =>
  {
    setComment(text)
  }

  const handleSubmit = async () =>
  {
    const {url,public_id} = user;
    const data = { postId:Data._id,comment,userName: user.name , url , public_id }
    const config =
        {
            headers: {
                Authorizaton: 'Bearer ' + token
            }
        }
        try {
            setCommentSubmiting(true)
            const response = await axios.post('https://nssjmieti.onrender.com/post/comment',data, config)
            setCommentSubmiting(false)
        } catch (error) {
            console.log(error)
        }
  }

  return (
    <View style={{ marginTop: 5 }}>
      <View>
        <TextInput placeholderTextColor="black" placeholder='Enter Comment' onChangeText={handleComment} style={styles.input} />
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isCommentSubmiting ? true : false}>
          <Text style={{ color: "white" }}>{isCommentSubmiting ? "...." : "Submit"}</Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          isLoading ? <Text style={{ color: "black" }}>Loading...</Text> :
          comments.length > 0 ?
            comments.map((data) => {
              return (
                <View style={{marginVertical:5,borderBottomColor:"grey",borderBottomWidth:1}} key={data._id}>
                  <View style={{display:"flex" , flexDirection:"row" , alignItems:"center"}}>
                    <Image style={styles.img} source={data.url === "" ? require("../../assests/imges/user1.png") : { uri: data.url }}></Image>
                    <View><Text style={[{ color: "black" },styles.name]}>{data.userName}</Text></View>
                  </View>
                  <View style={{marginVertical:2}}>
                  <Text style={{color:"black"}}>
                    {data.comment}
                  </Text>
                  </View>
                </View>
              )
            })
            :
              <View><Text style={{ color: "black" }}>No Comment.</Text></View>
        }
      </View>
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#D3D3D3",
    color:"black",
    padding: 0,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  submitBtn: {
    backgroundColor: "#303983",
    borderRadius: 20,
    color: "white",
    padding: 0,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: 30,
    height: 30,
    borderRadius:50,
  },
  name:{
    marginHorizontal:5,
  }
})