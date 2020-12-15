import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, ScrollView } from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

function CreateUser(props) {
  const [state, setState] = useState({
    uid: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: 0,
    rol: "User",
    provincia: "",
    matricula: 0,
    verificado: false,
    laboratorio: "",
    imagen: "",
    especialidad: [""],
  });

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const ALTA = gql`
    mutation addUsuario($input: UsuarioInput) {
      addUsuario(input: $input) {
        uid
        nombre
        apellido
        email
        telefono
        rol
        provincia
        matricula
        verificado
        laboratorio
        imagen
        especialidad
      }
    }
  `;

  const [createUser, { loading, data, error, refetch }] = useMutation(ALTA);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChange("nombre", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Apellido"
          onChangeText={(value) => handleChange("apellido", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefono"
          onChangeText={(value) => handleChange("telefono", parseInt(value))}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Provincia"
          onChangeText={(value) => handleChange("provincia", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Matricula"
          type="number"
          onChangeText={(value) => handleChange("matricula", parseInt(value))}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Laboratorio"
          onChangeText={(value) => handleChange("laboratorio", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Imagen"
          onChangeText={(value) => handleChange("imagen", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Especialidad"
          onChangeText={(value) => handleChange("especialidad", [value])}
        />
      </View>
      <View>
        <Button
          title="Aceptar"
          onPress={() => {
            createUser({ variables: { input: state } });
            error
              ? alert("No se pudo cargar el usuario")
              : props.navigation.navigate("MenuBar");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: /*"#ACE4F8"*/ "#bdeeff",
    borderRadius: 40,
    width: "96%",
    marginLeft: "2%",
    marginRight: "2%",
    flex: 1,
    flexDirection: "row",
    padding: 35,
  },

  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#98e6fa",
  },
});

export default CreateUser;
