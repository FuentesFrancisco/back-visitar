import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { AppLoading } from "expo";
import EventDetail from "./EventDetail/EventDetail";
//import SearchBar from '../SearchBar/searchBar';

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import scroll from "../../styles/scroll";

const image = {
  uri:
    "https://www.hqts.com/wp-content/uploads/2020/04/Pharmaceutical-Materials-no-logo-01-1110x550.jpg",
};

const QUERY = gql`
  query congresos {
    congresos(where: { publicado: true }) {
      _id
      titulo
      fecha
      ubicacion
      imagen
    }
  }
`;

export default function EventCard({ navigation }) {
  const { loading, data, error, refetch } = useQuery(QUERY);
  useEffect(() => refetch(), []);
  var fecha;

  const [flag, setFlag] = useState(false);

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
      <ScrollView style={scroll}>
        {/*<SearchBar navigation={navigation}/>*/}
        {data.congresos.map((congreso) => (
          <View key={congreso._id} style={styles.eventContainer}>
            <View style={styles.eventDetail}>
              <Text style={styles.titulo}>{congreso.titulo}</Text>
              {/* ver que onda esto */}
              <Text style={{ display: "none" }}>
                {(fecha = congreso.fecha[0].split("T"))}
              </Text>
              <Text style={styles.text}>
                {fecha[0]} {fecha[1].slice(0, 5).concat(" hs")}
              </Text>
              <Text style={styles.text}>{congreso.ubicacion} </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  /*setFlag(!flag),*/
                  navigation.navigate("Detail", { id: congreso._id })
                }
              >
                <Text style={styles.buttonText}> + </Text>
              </TouchableOpacity>

              {/* {flag ? (
                <EventDetail key={congreso._id} id={congreso._id} />
              ) : null}*/}
            </View>
            <View style={styles.eventImg}>
              <Image
                source={ congreso.imagen ? { uri: `${congreso.imagen}` } : image }
                style={styles.image}
              ></Image>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonCrear: {
    flex: 1,
    backgroundColor: "#bdeeff",
    borderRadius: 10,
    width: 120,
    height: 20,
  },
  buttonText1: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    color: "#7C88D5",
  },
  titulo1: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
    color: "#dedede",
  },
  eventContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
  },
  eventDetail: {
    flex: 3,
    flexWrap: "wrap",
    /* backgroundColor: "blue",*/
    paddingTop: 15,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingRight: 10,
  },
  eventImg: {
    flex: 2,
    height: "100%",
    borderRadius: 20,
    position: "relative",
    top: 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
    color: "#454444",
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "#454444",
  },
  buttonCont: {
    textAlign: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "powderblue",
    borderRadius: 45,
    height: 28,
    width: 28,
    marginTop: 5,
    marginBottom: 25,
    /*paddingLeft: 5,
    paddingRight: 5,*/
    display: "flex",
    marginLeft: "40%",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
});
