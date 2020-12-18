import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { Formik, Form } from "formik";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
  mutation addLink($input: LinkInput) {
    addLink(input: $input) {
      link
      titulo
      descripcion
    }
  }
`;

export default function createLinks({ navigation }) {
  const [createLink, { loading, data, error, refetch }] = useMutation(MUTATION);

  let mutation = (values) => {
    console.log(values);
    createLink({
      variables: {
        input: {
          titulo: values.titulo,
          descripcion: values.descripcion,
          link: values.link,
        },
      },
    })
      .then((ans) => {
        alert("Link creado");
      })
      .catch((err) => alert(err));
  };

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
      <Formik
        initialValues={{
          titulo: "",
          descripcion: "",
          link: "",
        }}
        onSubmit={(values) => mutation(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Text style={styles.title}> Crear Link de Interés </Text>
            <TouchableOpacity
              style={styles.buttonSend}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>

            <View style={styles.inputGroup}>
              <Text style={styles.titulo}>Título</Text>
              <TextInput
                placeholder="Título"
                name="titulo"
                onBlur={handleBlur("titulo")}
                onChangeText={handleChange("titulo")}
                value={values.titulo}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.titulo}>Descripción</Text>
              <TextInput
                placeholder="Descripción"
                name="descripcion"
                onBlur={handleBlur("descripcion")}
                onChangeText={handleChange("descripcion")}
                value={values.descripcion}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.titulo}>URL Link</Text>
              <TextInput
                placeholder="Url Link"
                name="link"
                onBlur={handleBlur("link")}
                onChangeText={handleChange("link")}
                value={values.link}
              />
            </View>

            <Button
              color="#7C88D5"
              borderRadius="20"
              title="Crear"
              onPress={(e) => handleSubmit(e)}
            />
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: "#7C88D5",
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    color: "#7C88D5",
  },

  inputGroup: {
    /*flex: 1,*/
    padding: 5,
    /*marginLeft: 5,
    marginRight: 5,*/
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  buttonText: {
    marginLeft: 5,
    marginBottom: 15,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    color: "white",
    padding: 5,
    width: 80,
    textAlign: "center",
    borderRadius: 10,
    borderColor: "powderblue",
  },
});
