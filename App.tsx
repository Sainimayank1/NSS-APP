import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from "react-redux";
import AuthScreen from './screens/AuthScreen';
import { store } from './store/store';




function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AuthScreen/>
    </Provider>
  );
}



export default App;
