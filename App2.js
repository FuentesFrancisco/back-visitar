import React, { useEffect } from "react";
import { View, Loader } from "react-native";
import Login from "./components/Users/Login";
import firebase from "firebase/app";
import "firebase/auth";
import State from "./components/Users/State";
import useUser from "./components/Users/useUser";
// import "./App.css";

function App2({ navigation }) {
  const { user, setUser } = useUser();
  useEffect(() => {
    const unsuscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user));
    return () => unsuscribe();
  }, [setUser]);

  return (
    <View>
      {user === undefined && <Loader size="lg" />}
      {user === null && <Login navigation={navigation} />}
      {user && <State />}
    </View>
  );
}

export default App2;
