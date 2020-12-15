import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
  Form,
  Item,
  Input,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";

function CreateUser(props) {
  const { values, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) => {},
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
      <Form>
        <Item>
          <TextInput
            value={values.name}
            placeholder="Nombre"
            onChangeText={(text) => setFieldValue("nombre", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.apellido}
            placeholder="Apellido"
            onChangeText={(text) => setFieldValue("apellido", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.email}
            placeholder="Email"
            onChangeText={(text) => setFieldValue("email", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.telefon}
            placeholder="Telefono"
            onChangeText={(text) => setFieldValue("telefono", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.provincia}
            placeholder="Provincia"
            onChangeText={(text) => setFieldValue("provincia", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.matricula}
            placeholder="Matricula"
            onChangeText={(text) => setFieldValue("matricula", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.laboratorio}
            placeholder="Laboratorio"
            onChangeText={(text) => setFieldValue("laboratorio", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.imagen}
            placeholder="Imagen"
            onChangeText={(text) => setFieldValue("imagen", text)}
          />
        </Item>
        <Item>
          <TextInput
            value={values.especialidad}
            placeholder="Especialidad"
            onChangeText={(text) => setFieldValue("especialidad", text)}
          />
        </Item>
      </Form>
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

//     <Button
//       title="Aceptar"
//       onPress={() => {
//         createUser({ variables: { input: state } });
//         error
//           ? alert("No se pudo cargar el usuario")
//           : props.navigation.navigate("MenuBar");
//       }}
//     />
//   </View>
