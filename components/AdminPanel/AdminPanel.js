import React from "react";
import styled from "styled-components/native";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet,
} from "react-native";

const UserPromote = styled.TouchableOpacity`
  border-radius: 10;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 95%;
  background-color: #7c88d5;
  margin: 10px;
`;

const EditCongresos = styled.TouchableOpacity`
  background: transparent;
  border-radius: 10;
  background-color: #7c88d5;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 35%;
  margin: 10px;
  width: 95%;
`;

const CreateCongresos = styled.TouchableOpacity`
  background: transparent;
  border-radius: 10;
  background-color: #7c88d5;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 35%;
  margin: 10px;
  width: 95%;
`;

const Answers = styled.TouchableOpacity`
  border-radius: 10;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 35%;
  background-color: #7c88d5;
  width: 95%;
  margin: 10px;
`;

const CreateLinks = styled.TouchableOpacity`
  border-radius: 10;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 35%;
  background-color: #7c88d5;
  margin: 10px;
  width: 95%;
`;

const DeleteLinks = styled.TouchableOpacity`
  border-radius: 10;
  border-color: powderblue;
  border-width: 0.7;
  color: palevioletred;
  padding: 10px;
  text-align: center;
  width: 35%;
  background-color: #7c88d5;
  margin: 10px;
  width: 95%;
`;

export default function AdminPanel({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Panel de Administrador </Text>
      <UserPromote onPress={() => navigation.navigate("UserPromote")}>
        <Text style={styles.text}>Cambiar rol de usuarios</Text>
      </UserPromote>

      <CreateCongresos onPress={() => navigation.navigate("CreateEvent")}>
        <Text style={styles.text}>Crear congreso</Text>
      </CreateCongresos>

      <EditCongresos onPress={() => navigation.navigate("DeleteEditEvent")}>
        <Text style={styles.text}>Eliminar/Editar Congresos</Text>
      </EditCongresos>

      <CreateLinks onPress={() => navigation.navigate("createLinks")}>
        <Text style={styles.text}>Crear links</Text>
      </CreateLinks>

      <DeleteLinks
        onPress={() => navigation.navigate("InterestLinks", { admin: true })}
      >
        <Text style={styles.text}>Eliminar/Editar Links</Text>
      </DeleteLinks>

      <Answers /* onPress={() => navigation.navigate("UserPromote")} */>
        <Text style={styles.text}>Respuestas</Text>
      </Answers>
    </View>
  );
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
    textAlign: "center",
  },
  inputCont: {
    marginTop: 30,
    marginLeft: "10%",
    marginRight: "10%",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
  },
  scroll2: {
    width: "96%",
    height: 470,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 17,
  },
  iconContainer: {
    justifyContent: "center",
    flex: 1,
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
    /* backgroundColor: "blue",*/

    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexWrap: "wrap",
    paddingRight: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 40,
    width: 40,
    borderRadius: 70,
    marginRight: 15,
    margin: 7,
  },
  titulo: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "#7c88d5",
    flex: 1,
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    color: "white",
    fontSize: 15,
    flex: 2,
  },
  text2: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "white",
    fontSize: 10,
    flex: 1,
    marginTop: 9,
    marginRight: 5,
  },
});
