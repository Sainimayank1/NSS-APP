import { createSlice } from "@reduxjs/toolkit"


const initail = {
    posts:[],
    userPosts:[],
    editPostId:"",
};

const postSlice = createSlice({
    name: "post",
    initialState: initail,
    reducers: {
      setAllPosts(state,action){
        state.posts = action.payload
      },
      setUserPosts(state,action){
        state.userPosts = action.payload
      },
      setEditPostId(state,action){
        state.editPostId = action.payload
      },
    }
  })
  
  export default postSlice.reducer

  export const {setAllPosts,setUserPosts ,setEditPostId} = postSlice.actions

  
