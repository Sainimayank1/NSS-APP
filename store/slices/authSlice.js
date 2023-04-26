import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage'


const initail = {
    loading: false,
    token: "",
    user: {},
    RegisterError: [],
    RegisterMessage:"",
    LoginError: [],
    LoginMessage: "",
};

export const verifyToken = (token) => {
  const decodedToken = jwtDecode(token);
  const expireIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expireIn) {
      AsyncStorage.removeItem("NSSTOKEN");
      return null;
  } else return decodedToken;
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
    setLoginMessage(state,action){
      state.LoginMessage = action.payload;
    },
    resetLoginMessage(state,action){
      state.LoginMessage = "";
    },
    setRegisterError(state,action){
      state.RegisterError = action.payload;
    },
    resetRegisterError(state,action){
      state.RegisterError = [];
    },
    setRegisterMessage(state,action)
    {
      state.RegisterMessage = action.payload;
    },
    resetRegisterMessage(state,action)
    {
      state.RegisterMessage ="";
    },
    setToken(state,action){
      const decoded = verifyToken(action.payload);
      state.token = action.payload;
      state.user = decoded.user;
    },
    setLogout(state,action){
      state.token = "";
      state.user = {};
    }
  }
})

export default authSlice.reducer
export const {setLoading , resetLoading , setLoginError , resetLoginError , setLoginMessage , resetLoginMessage  ,   resetRegisterError , setToken , setRegisterMessage , setRegisterError  , resetRegisterMessage , setLogout} = authSlice.actions;


