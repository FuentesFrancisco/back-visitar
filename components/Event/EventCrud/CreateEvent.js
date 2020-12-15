import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { AppLoading } from "expo";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { buildExecutionContext } from "graphql/execution/execute";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

const MUTATION = gql`
  mutation addCongreso($input: CongresoInput) {
    addCongreso(input: $input) {
      titulo
    }
  }
`;

export default function CreateEvent({ navigation }) {
  const [createCongreso, { loading, data, error, refetch }] = useMutation(
    MUTATION
  );

  let mutation = (values) => {
    console.log(values);
    createCongreso({
      variables: {
        input: {
          titulo: values.titulo,
          descripcion: values.descripcion,
          ubicacion: values.ubicacion,
          fecha: [values.fecha],
          especialidad: [values.especialidad],
          imagen: [values.imagen],
          publicado: true,
        },
      },
      /* modalidad: values.modalidad, */
    })
      .then((ans) => {
        alert("Congreso creado");
      })
      .catch((err) => alert(err));
  };

  /*   validate: (values) => {
    const errors = {};
    if (!values.titulo) errors.titulo = "Es necesario un titulo";
    if (!values.descripcion)
      errors.descripcion = "Es necesaria una descripción";
    if (!values.ubicacion) errors.ubicacion = "Es necesaria una ubicación";
    if (!values.fecha) errors.fecha = "Es necesaria una fecha";
    if (!values.especialidad)
      errors.descripcion = "Es necesaria una especialidad";
    if (!values.imagen) errors.imagen = "Es necesaria una imagen";

    return errors;
  }; */

  /*   console.log(errors); */
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
      <View>
        <Text style={styles.titulo}>Crear congreso </Text>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.navigate("Event")}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <Formik
          initialValues={{
            titulo: "",
            descripcion: "",
            ubicacion: "",
            especialidad: "",
            /*    modalidad: "", */
            imagen: "",
            fecha: "",
          }}
          onSubmit={(values) => mutation(values)}
          /* validate={(values) => {
          const errors = {};

          if (!values.titulo) {
            errors.titulo = "Titulo es requerido!";
          } else if (values.titulo.length <= 1) {
            errors.titulo = "Titulo demasiado corto";
          }
          if (!values.descripcion) {
            errors.descripcion = "Descripción es requerido";
          }
          if (!values.ubicacion) {
            errors.ubicacion = "Es necesaria una ubicación";
          }
          if (!values.especialidad) {
            errors.especialidad = "Es necesario ingresar una especialidad";
          }
          if (!values.modalidad) {
            errors.modalidad = "Ingrese modalidad";
          }
          return errors;
        }} */
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
              <Form>
                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("titulo")}
                    onBlur={handleBlur("titulo")}
                    value={values.titulo}
                    placeholder="Título"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("descripcion")}
                    onBlur={handleBlur("descripcion")}
                    value={values.descripcion}
                    placeholder="Descripción"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("ubicacion")}
                    onBlur={handleBlur("ubicacion")}
                    value={values.ubicacion}
                    placeholder="Ubicación"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("especialidad")}
                    onBlur={handleBlur("especialidad")}
                    value={values.especialidad}
                    placeholder="Especialidad"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("imagen")}
                    onBlur={handleBlur("imagen")}
                    value={values.imagen}
                    placeholder="Imagen"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    onChangeText={handleChange("fecha")}
                    onBlur={handleBlur("fecha")}
                    value={values.fecha}
                    placeholder="Fechas"
                  />
                </View>
                {/*     <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("modalidad")}
                  onBlur={handleBlur("modalidad")}
                  value={values.modalidad}
                  placeholder="modalidad"
                />
              </View> */}
                <View>
                  <Button
                    color="#7C88D5"
                    borderRadius="20"
                    title="Crear"
                    /* disabled={isSubmitting} */
                    onPress={(e) => handleSubmit(e)}
                  />
                </View>
              </Form>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  container: {
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    border: "solid 1px #d9d9d9",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },

  inputGroup: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
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
});
