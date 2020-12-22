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
import { gql, useMutation, useQuery } from "@apollo/client";
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
  mutation updateCongreso($input: CongresoInput) {
    updateCongreso(input: $input) {
      titulo
    }
  }
`;
const QUERY = gql`
  query congreso($id: JSON) {
    congreso(id: $id) {
      _id
      titulo
      fecha
      ubicacion
      descripcion
      imagen
      especialidad
    }
  }
`;
export default function EditEvent({ navigation, route }) {
  const [editCongreso, {}] = useMutation(MUTATION);

  const { loading, data, error, refetch } = useQuery(QUERY, {
    variables: route.params,
  });

  let cargaImagen;
  let mutation = (values) => {
    console.log("VALUES", values);
    console.log("IMAGEN", cargaImagen);
    console.log("PARAMS", route.params.id);
    editCongreso({
      variables: {
        input: {
          _id: route.params.id,
          titulo: values.titulo,
          descripcion: values.descripcion,
          ubicacion: values.ubicacion,
          fecha: [values.fecha],
          especialidad: [values.especialidad],
          imagen: cargaImagen,
          publicado: true,
        },
      },
      /* modalidad: values.modalidad, */
    })
      .then((ans) => {
        alert("Cambios realizados");
      })
      .then(() => navigation.goBack())
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
    console.log("DATOS CONGRESO", data.congreso);
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}> Editar congreso </Text>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <Formik
          initialValues={{
            titulo: data.congreso.titulo,
            descripcion: data.congreso.descripcion,
            ubicacion: data.congreso.ubicacion,
            especialidad: data.congreso.especialidad[0],
            /*    modalidad: "", */
            fecha: data.congreso.fecha[0],
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
            <ScrollView style={styles.container}>
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
              <Text>Ubicacion</Text>
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
              {/*       <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("imagen")}
                  onBlur={handleBlur("imagen")}
                  value={
                    data.congreso.imagen[0] ? data.congreso.imagen[0] : null
                  }
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
                  title="Cambiar foto"
                  onPress={cargarImagen}
                />
                {/*   <Button
                  color="#7C88D5"
                  borderRadius="20"
                  title="Agregar una foto con tu cámara"
                  onPress={cargarImagen2}
                /> */}
                <Button
                  color="#7C88D5"
                  borderRadius="20"
                  title="Confirmar cambios"
                  /* disabled={isSubmitting} */
                  onPress={(e) => handleSubmit(e)}
                />
              </View>
            </ScrollView>
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
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    height:400,
  },

  inputGroup: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    height:50,
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

