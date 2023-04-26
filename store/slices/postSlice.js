import { createSlice } from "@reduxjs/toolkit"


const initail = {
    posts:[],
    comments:[],
};

const postSlice = createSlice({
    name: "post",
    initialState: initail,
    reducers: {
      setAllPosts(state,action){
        state.posts = action.payload
      },
      setComments(state,action){
        state.comments = action.payload
      }
    }
  })
  
  export default postSlice.reducer

  export const {setAllPosts,setComments} = postSlice.actions

  
