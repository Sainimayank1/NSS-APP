import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment";
import { setAllPosts } from '../../store/slices/postSlice';
import axios from "axios"
import Comment from './Comment';

const Post = ({ data }) => {

    const [isLike, setIslike] = useState(false);
    const [isComment , setComment] = useState(false);
    const { user, token } = useSelector((state) => { return state.auth; })
    const dispatch = useDispatch();

    useEffect(() => {
        data.likes.map((data) => {
            if (data === user._id) {
                setIslike(true);
            }
        })
    }, [])

    const handleLike = async () => {
        const config =
        {
            headers: {
                Authorizaton: 'Bearer ' + token
            }
        }
        const props = data._id;
        const  {_id}  = user;
        const sendData = { props, _id }
        if (!isLike) {
            try {
                setIslike(!isLike)
                const response = await axios.post('https://nssjmieti.onrender.com/post/like', sendData, config);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                setIslike(!isLike)
                const response = await axios.post('https://nssjmieti.onrender.com/post/dislike', sendData, config);
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const data = await axios.get("https://nssjmieti.onrender.com/post/posts")
            dispatch(setAllPosts(data.data.data))
            
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View style={style.main}>
            <View style={style.upper}>
                <View style={style.upper_sub}>
                    <Image style={style.userImg} source={data.url === "" ? require("../../assests/imges/user1.png") : { uri: data.url }}></Image>
                    <View style={[style.name]}><Text style={style.name}>{data.userName}</Text></View>
                    <View><Text style={{ color: "black", fontSize: 10 }}>
                        {moment(data.createdAt).fromNow()}
                    </Text></View>
                </View>
            </View>
            <View style={style.desc}>
                <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>{data.title}</Text>
                <Text style={{ color: "black" }}>{data.description}</Text>
            </View>
            <View style={style.img}>
                <Image source={{ uri: data.image.url }} style={style.img}></Image>
            </View>
            <View style={style.bottom}>
                <View style={{ marginRight: 15, flexDirection: "row" , alignItems:"center" }}>
                    <TouchableOpacity onPress={handleLike}>
                        <Icon name={isLike ? "heart" : "heart-outline"} color="black" size={30}></Icon>
                    </TouchableOpacity>
                    <Text>{data.likes.length}</Text>
                </View>
                <View>
                <TouchableOpacity onPress={()=>setComment(!isComment)}>
                <Icon name="document-text-outline" color="black" size={25}></Icon>
                </TouchableOpacity>
                </View>
            </View>
            {isComment ? <Comment Data={data} /> : null}
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        padding: 20,
        borderBottomColor: "#D3D3D3",
        borderBottomWidth: 15,
        color: "black"
    },
    upper: {


    },
    upper_sub: {
        flexDirection: "row",
        alignItems: "center",
    },
    userImg: {
        height: 35,
        width: 35,
        borderRadius: 40
    },
    img: {
        width: "100%",
        aspectRatio: 2
    },
    desc: {

    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    name: {
        color: "black",
        fontSize: 20,
        marginHorizontal: 2
    }
})

export default Post