import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import EventCard from "./components/Event/EventCard";
import EventDetail from "./components/Event/EventDetail/EventDetail";
import { AppRegistry, Button } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CreateEvent from "./components/Event/EventCrud/CreateEvent";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserList from "./components/Users/UsersList";
import firebase from "firebase/app";
import { UserProvider } from "./components/Users/userContext";
import "firebase/auth";
import State from "./components/Users/State";
import useUser from "./components/Users/useUser";
import App2 from "./App2";
import MyTabs from "./components/MenuBar/TabBar";
import UnderConstruction from "./components/UnderConstruction";
import HeaderTab from "./components/Header/HeaderTab";
import Home from "./components/Home";
import Calendario from "./components/calendario";
import Login from "./components/Users/Login";
import expoToken from "./expoToken";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyBRutCUmn2wHrUAMzbM-5ESVsGxO2UEwQE",
  authDomain: "visitar-test.firebaseapp.com",
  projectId: "visitar-test",
  storageBucket: "visitar-test.appspot.com",
  messagingSenderId: "960314269839",
  appId: "1:960314269839:web:c9130a27fd6f5848ac50fa",
  measurementId: "G-8Y4DCJFJ5Z",
};

firebase.initializeApp(firebaseConfig);

// Initialize Apollo Client
const client = new ApolloClient({
  //web
  uri: "https://visitar-ar.herokuapp.com/graphql",
  //emulador
  //uri: "http://192.168.100.3:3002/graphql",
  cache: new InMemoryCache(),
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const unsuscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user));
    return () => unsuscribe();
  }, [setUser]);
  return (
    <ApolloProvider client={client}>
      {user === null ? (
        <Login />
      ) : (
        <NavigationContainer theme={MyTheme}>
          <Button
            color="#7C88D5"
            onPress={() => firebase.auth().signOut()}
            title="Cerrar sesión"
          />
          <Stack.Navigator
            initialRouteName="expoToken"
            screenOptions={{
              cardStyle: { backgroundColor: "#fff" },
            }}
          >
            <Stack.Screen
              name="expoToken"
              component={expoToken}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Top"
              component={HeaderTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Calendar"
              component={Calendario}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Under"
              component={UnderConstruction}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Tab"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Event"
              component={EventCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={EventDetail}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ApolloProvider>
  );
}

export default function () {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98e6fa",
    marginTop: 300,
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10,
    height: 10,
    /*width: 400,*/
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: 30,
  },
});

AppRegistry.registerComponent("MyApplication", () => App);
