import { createSlice } from "@reduxjs/toolkit"


const initail = {
    loading: false,
    token: "",
    user: "",
    RegisterError: [],
    RegisterMessage: [],
    LoginError: [],
    LoginMessage: [],
};



const authSlice = createSlice({
  name: "auth",
  initialState: initail,
  reducers: {
    setLoading(state,action){
      state.loading = true
    },
    resetLoading(state,action){
      state.loading = false
    },
    setLoginError(state,action){
      state.LoginError = action.payload;
    },
    resetLoginError(state,action){
      state.LoginError = [];
    },
    setRegisterError(state,action){},
    resetRegisterError(state,action){}
  }
})

export default authSlice.reducer
export const {setLoading , resetLoading} = authSlice.actions;


