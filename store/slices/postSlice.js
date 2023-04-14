import { createSlice } from "@reduxjs/toolkit"


const initail = {
    posts:[]
};

const postSlice = createSlice({
    name: "post",
    initialState: initail,
    reducers: {
      setAllPosts(state,action){
        state.posts = action.payload
      },
    }
  })
  
  export default postSlice.reducer

  export const {setAllPosts} = postSlice.actions