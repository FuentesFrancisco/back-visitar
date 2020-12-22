import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AppLoading } from "expo";

//import SearchBar from '../SearchBar/searchBar';
import scroll from "../../../styles/scroll";
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
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

const QUERY = gql`
  query congresos {
    congresos(where: { publicado: true }) {
      _id
      titulo
      fecha
      ubicacion
      descripcion
      imagen
    }
  }
`;

const MUTATION = gql`
  mutation deleteCongreso($input: CongresoInput) {
    deleteCongreso(input: $input) {
      titulo
    }
  }
`;

export default function DeleteEvent({ navigation }) {
  const { loading, data, error, refetch } = useQuery(QUERY);

  const [deleteEvent, {}] = useMutation(MUTATION);

  /*  useEffect(() => refetch(), []); */
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
      <ScrollView style={styles.scroll}>
        <Text style={styles.titulo2}> Eliminar/Editar Congreso </Text>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        {/*<SearchBar navigation={navigation}/>*/}
        {data.congresos.map((congreso) => (
          <View key={congreso._id} style={styles.container}>
            <View /* style={styles.eventDetail} */>
              <Text style={styles.titulo}>{congreso.titulo}</Text>
            </View>
            <View style={styles.buttonCont}>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={async () => {
                  await deleteEvent({
                    variables: {
                      input: {
                        _id: congreso._id,
                      },
                    },
                  })
                    .then((ans) => alert("Congreso eliminado"))
                    .catch((err) => alert(err));
                  refetch();
                }}
              >
                <Text style={styles.buttonText}> Eliminar </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSend}
                onPress={() => {
                  navigation.navigate("EditEvent", { id: congreso._id });
                }}
              >
                <Text style={styles.buttonText}> Editar </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scroll: {
    width: "96%",
    height: 470,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 17,
  },
  buttonText1: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#7C88D5",
  },
  titulo1: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    marginBottom: 10,
    color: "#dedede",
  },
  titulo: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    marginBottom: 10,
    color: "#454444",
  },
  titulo2: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "#454444",
  },
  buttonCont: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "powderblue",
    borderRadius: 45,
    height: 28,
    width: 28,
    marginTop: 5,
    marginBottom: 25,
    display: "flex",
    marginLeft: "40%",
    textAlign: "center",
    justifyContent: "center",
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
  },
  container: {
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "#f5f2f2",
    borderWidth: 1,
    margin: 10,
  },
});

