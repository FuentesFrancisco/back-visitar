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
import { getImagen, takeImagen } from "../../pickImage/pick";

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

  let cargaImagen;
  let mutation = (values) => {
    console.log("values", values);
    createCongreso({
      variables: {
        input: {
          titulo: values.titulo,
          descripcion: values.descripcion,
          ubicacion: values.ubicacion,
          fecha: [values.fecha],
          especialidad: [values.especialidad],
          imagen: cargaImagen,
          publicado: true,
          modalidad: values.modalidad,
        },
      },
      /* modalidad: values.modalidad, */
    })
      .then((ans) => {
        alert("Congreso creado");
      })
      .catch((err) => alert(err));
  };
  function cargarImagen() {
    let result = getImagen();
    result.then((res) => {
      cargaImagen = res;
    });
  }

  function cargarImagen2() {
    setImagen(takeImagen());
    console.log(imagen);
  }

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
      <ScrollView style={styles.scroll}>
        <Text style={styles.titulo}> Crear congreso </Text>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.texto}>Volver</Text>
        </TouchableOpacity>
        <Formik
          initialValues={{
            titulo: "",
            descripcion: "",
            ubicacion: "",
            especialidad: [""],
            imagen: [""],
            fecha: "",
            modalidad: "",
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
              <View style={styles.inputGroup}>
              <Text>Titulo</Text>
                <TextInput
                  onChangeText={handleChange("titulo")}
                  onBlur={handleBlur("titulo")}
                  value={values.titulo}
                  placeholder="Título"
                />
              </View>

              <View style={styles.inputGroup}>
              <Text>Descripción</Text>
                <TextInput
                  onChangeText={handleChange("descripcion")}
                  onBlur={handleBlur("descripcion")}
                  value={values.descripcion}
                  placeholder="Descripción"
                />
              </View>
              <View style={styles.inputGroup}>
              <Text>Ubicación</Text>
                <TextInput
                  onChangeText={handleChange("ubicacion")}
                  onBlur={handleBlur("ubicacion")}
                  value={values.ubicacion}
                  placeholder="Ubicación"
                />
              </View>
              <View style={styles.inputGroup}>
              <Text>Especialidad</Text>
                <TextInput
                  onChangeText={handleChange("especialidad")}
                  onBlur={handleBlur("especialidad")}
                  value={values.especialidad}
                  placeholder="Especialidad"
                />
              </View>
              {/*           <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("imagen")}
                  onBlur={handleBlur("imagen")}
                  value={values.imagen}
                  placeholder="Imagen"
                />
              </View> */}
              <View style={styles.inputGroup}>
              <Text>Fechas</Text>
                <TextInput
                  onChangeText={handleChange("fecha")}
                  onBlur={handleBlur("fecha")}
                  value={values.fecha}
                  placeholder="Fechas"
                />
              </View>
              <View style={styles.inputGroup}>
              <Text>Modalidad</Text>
                <TextInput
                  onChangeText={handleChange("modalidad")}
                  onBlur={handleBlur("modalidad")}
                  value={values.modalidad}
                  placeholder="Modalidad"
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
                <TouchableOpacity
                  onPress={cargarImagen}
                  style={styles.buttonText1}
                >
                  <Text style={styles.texto}>Cargar Imagen</Text>
                </TouchableOpacity>

                {/*     <Button
                  title="Agregar una foto almacenada"
                  onPress={cargarImagen}
                />
                <Button
                  color="#7C88D5"
                  borderRadius="20"
                  title="Agregar una foto con tu cámara"
                  onPress={cargarImagen2}
                /> */}

                <TouchableOpacity
                  style={styles.buttonText1}
                  onPress={(e) => handleSubmit(e)}
                >
                  <Text style={styles.texto}>Crear</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll:{
    height:450,
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  container: {
    fontFamily: "Roboto_400Regular",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 450,
  },

  inputGroup: {
    /*flex: 1,*/
    padding: 5,
    /*marginLeft: 5,
    marginRight: 5,*/
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    height: 60,
  },
  buttonText1: {
    margin: 10,
    padding: 10,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    padding: 5,
    width: 200,
    textAlign: "center",
    borderRadius: 10,
    height: 30,
    textAlign: "center",
  },
  buttonSend: {
    margin: 10,
    padding: 10,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    padding: 5,
    width: 120,
    textAlign: "center",
    borderRadius: 10,
    height: 30,
    textAlign: "center",
  },
  texto: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
  },
});
