import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AppLoading } from "expo";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  requireNativeComponent,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import NewIcon from "../images/NewIcon";
import BinIcon from "../images/BinIcon";
import { TextInput } from "react-native-gesture-handler";
import SearchIcon from "../images/SearchIcon";
import * as Linking from "expo-linking";

const QUERY = gql`
  query links {
    links {
      titulo
      descripcion
      link
      _id
    }
  }
`;

const MUTATION = gql`
  mutation deleteLink($input: LinkInput) {
    deleteLink(input: $input) {
      titulo
    }
  }
`;

export default function InterestLinks({ navigation, route }) {
  const { loading, data, error, refetch } = useQuery(QUERY);
  const [borrarLink, {}] = useMutation(MUTATION);

  const [borrar, setBorrar] = useState(false);
  console.log("ROUTE", route);
  let adm;
  if (route.params) {
    adm = route.params.admin;
  }
  console.log("route adm", adm);
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.bar}>
          {adm && adm ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setBorrar(true)}
            >
              <Text>
                <BinIcon name="new" color="grey" size="32" />
              </Text>
            </TouchableOpacity>
          ) : null}

          <Text style={styles.title}> Links de interés </Text>
          {/*           <View style={styles.inputCont}>
            <TextInput
              placeholder="Buscar..."
              style={{
                height: 35,
                borderColor: "#c4c4c4",
                borderRadius: 20,
                borderWidth: 1,
                flex: 7,
                marginTop: 8,
                marginBottom: 15,
                color: "#c4c4c4",
                paddingLeft: 20,
              }}
            ></TextInput>
            <TouchableOpacity onPress={() => alert("buscar")}>
              <SearchIcon
                name="search"
                color="#c4c4c4"
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginLeft: 3,
                  justifyContent: "center",
                }}
                size="22"
              />
            </TouchableOpacity>
          </View> */}
          {adm && adm ? (
            <TouchableOpacity
              style={styles.iconContainerLeft}
              onPress={() => navigation.navigate("createLinks")}
            >
              <Text style={styles.editar}>
                <NewIcon name="new" color="white" size="28" />
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView style={styles.scroll2}>
          {data.links.map((link) => (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://" + link.link).catch((err) =>
                  console.error("An error occurred", err)
                )
              }
            >
              <View style={styles.eventContainer}>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>{link.titulo}</Text>

                  <Text style={styles.text}>{link.descripcion}</Text>
                  <Text style={styles.text}>{link.link}</Text>
                </View>
                {borrar ? (
                  <TouchableOpacity
                    style={styles.borrar}
                    onPress={async () => {
                      await borrarLink({
                        variables: { input: { _id: link._id } },
                      });
                      refetch();
                    }}
                  >
                    <Text style={styles.x}>
                      <BinIcon name="new" color="white" size="28" />
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    display: "flex",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    marginTop: 100,
    marginLeft: "2%",
    marginRight: "2%",
    lineHeight: 800,
  },
  bar: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-around",
  },
  iconContainer: {
    flex: 1,
    margin: 10,
  },
  inputCont: {
    display: "flex",
    flexDirection: "row",
    flex: 3,
    marginBottom: 5,
  },
  iconContainerLeft: {
    flex: 1,
    textAlign: "right",
    margin: 10,
  },
  scroll2: {
    width: "96%",
    height: 470,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 2,
  },

  eventContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    backgroundColor: "#7C88D5",
  },
  eventDetail: {
    flex: 4,
    flexWrap: "wrap",
    paddingTop: 15,
    paddingLeft: 10,
    paddingBottom: 15,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexWrap: "wrap",
    paddingRight: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 60,
    width: 60,
    borderRadius: 70,
    marginRight: 15,
    margin: 7,
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "white",
    flex: 1,
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "white",
    flex: 2,
  },
  borrar: {
    padding: 5,
    width: 30,
    height: 30,
    marginTop: "6%",
    marginRight: "5%",
    textAlign: "center",
    justifyContent: "center",
  },
  x: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#7C88D5",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 25,
    marginTop: 20,
    marginBottom: 0,
    textAlign: "center",
    color: "#7C88D5",
  },
  buttonText: {
    marginLeft: 10,
    marginBottom: 15,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    color: "white",
    padding: 5,
    width: 80,
    textAlign: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  /* 
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  }, */
});
