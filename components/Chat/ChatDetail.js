import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import BackIcon from "../images/BackIcon";
import useUser from "../Users/useUser";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import SendIcon from "../images/SendIcon";
import Header from "../Header/Header";
import { gql, useQuery, useSubscription, useMutation } from "@apollo/client";

let image = require("../images/bag.png");

const QUERY = gql`
  query usuario($id: JSON, $id2: JSON) {
    usuario(id: $id) {
      chats(id: $id2) {
        mensaje
        remitenteId
        destinatarioId
      }
    }
  }
`;

const CHAT = gql`
  subscription addChat($remitenteId: String!, $destinatarioId: String!) {
    addChat(remitenteId: $remitenteId, destinatarioId: $destinatarioId) {
      mensaje
      destinatarioId
      remitenteId
    }
  }
`;

const SEND = gql`
  mutation addChat($input: ChatInput) {
    addChat(input: $input) {
      mensaje
    }
  }
`;

export default function ChatDetail({ route, navigation }) {
  const { userDB } = useUser();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [input, setInput] = useState("");

  const { subscribeToMore, loading, data, error, refetch } = useQuery(QUERY, {
    variables: {
      id: userDB.usuarios[0]._id,
      id2: route.params.id,
    },
  });

  const [send] = useMutation(SEND);

  data && !message.length && setMessage(data.usuario.chats);

  useEffect(() => {
    subscribeToNewToDos();
  }, []);

  const subscribeToNewToDos = () =>
    subscribeToMore({
      document: CHAT, // the gql subscription operation
      // How do we update our ToDos data when subscription data comes through.
      variables: {
        remitenteId: userDB.usuarios[0]._id,
        destinatarioId: route.params.id,
      },
      updateQuery: (usuario, { subscriptionData }) => {
        if (!subscriptionData.data) return usuario;
        const newToDo = subscriptionData.data.addChat;
        let result;
        if (usuario.usuario.chats)
          result = usuario.usuario.chats.concat(newToDo);
        setMessage(result);
        refetch();
      },
    });

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  } else {
    return (
      <View>
        <Header></Header>
        <View style={styles.container}>
          <View style={styles.eventContainer}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}
            >
              <BackIcon name="back" color="grey" size="24" />
            </TouchableOpacity>
            <View style={styles.imgContainer}>
              <Image
                source={route.params.imagen ? route.params.imagen : image}
                style={styles.image}
              ></Image>
            </View>
            <View style={styles.eventDetail}>
              <Text style={styles.titulo}>{route.params.nombre}</Text>
              {/*  <Text style={styles.subTitulo}>
                {route.params.especialidad + " - " + route.params.laboratorio}
              </Text> */}
            </View>
          </View>
          <ScrollView style={styles.scroll2}>
            {message &&
              message.map((msj, i) => (
                <View key={i}>
                  <Text
                    style={
                      msj.remitenteId === userDB.usuarios[0]._id
                        ? styles.in
                        : styles.out
                    }
                  >
                    {msj.mensaje} <Text style={styles.time}>15:54</Text>
                  </Text>
                </View>
              ))}
          </ScrollView>
          <View style={styles.input}>
            <TextInput
              onChangeText={(e) => setInput(e)}
              value={input}
              style={{
                height: 40,
                borderColor: "gray",
                borderRadius: 20,
                borderWidth: 1,
                flex: 9,
                marginTop: 10,
                marginRight: 10,
                marginBottom: 10,
              }}
            ></TextInput>
            <TouchableOpacity
              onPress={() => {
                send({
                  variables: {
                    input: {
                      mensaje: input,
                      remitenteId: userDB.usuarios[0]._id,
                      destinatarioId: route.params.id,
                      //time: Date.now(),
                    },
                  },
                });
                setInput(" ");
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                marginLeft: 5,
              }}
            >
              <SendIcon name="back" color="grey" size="28" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    height: "85%",
    display: "flex",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: "2%",
    marginRight: "2%",
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 10,
  },
  eventContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    borderBottomColor: "#f5f2f2",
    borderBottomWidth: 2,
    marginLeft: "2%",
    marginRight: "2%",
  },
  eventDetail: {
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingRight: 10,
    justifyContent: "center",
  },
  imgContainer: {
    height: 60,
    marginTop: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 60,
    width: 60,
    borderRadius: 70,
    marginRight: 15,
  },
  scroll2: {
    width: "96%",
    height: "60%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 2,
  },
  titulo: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "#454444",
    flex: 1,
    justifyContent: "center",
  },
  subTitulo: {
    fontFamily: "Roboto_100Thin",
    fontSize: 12,
    flex: 2,
    color: "grey",
  },
  out: {
    textAlign: "left",
    margin: 5,
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
  },
  outName: {
    fontFamily: "Roboto_500Medium",
    textAlign: "left",
    margin: 5,
    fontSize: 15,
    color: "#d1d0cd",
  },
  in: {
    textAlign: "right",
    margin: 5,
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
  },
  inName: {
    fontFamily: "Roboto_500Medium",
    textAlign: "right",
    margin: 5,
    fontSize: 15,
    color: "#d1d0cd",
  },

  time: {
    fontFamily: "Roboto_100Thin",
    fontSize: 10,
    color: "#d1d0cd",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    borderTopColor: "#f5f2f2",
    borderTopWidth: 2,
    marginLeft: "2%",
    marginRight: "2%",
  },
});
