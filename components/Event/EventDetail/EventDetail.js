import React, { useState } from "react";
import { AppLoading } from "expo";
import { gql, useQuery, useMutation } from "@apollo/client";
import BackIcon from "../../images/BackIcon";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import scroll from "../../../styles/scroll";

const image = {
  uri:
    "https://www.hqts.com/wp-content/uploads/2020/04/Pharmaceutical-Materials-no-logo-01-1110x550.jpg",
};

export default function EventDetail({ route, navigation }) {
  const [question, setQuestion] = useState(false);
  const [insertar, setInsertar] = useState(false);

  const [value, setValue] = useState({
    pregunta: "",
    congresoId: route.params.id,
    resupuesta: "",
    reaccion: 0,
    usuarioId: "5fc8f54ace037c2030a884b5",
  });
  //console.log(value);
  const [asiste, setAsiste] = useState({
    congresoId: route.params.id,
    usuarioId: "5fc8f54ace037c2030a884b5",
    asistire: true,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      pregunta: e,
    });
  };

  const PREGUNTA = gql`
    mutation congreso($input: PreguntaInput) {
      addPregunta(input: $input) {
        pregunta
      }
    }
  `;

  const [addpregunta, {}] = useMutation(PREGUNTA);

  const ASISTENCIA = gql`
    mutation asistencia($input: AsistenciaInput) {
      addAsistencia(input: $input) {
        asistire
        usuarioId
        congresoId
        _id
      }
    }
  `;

  const [addasistencia, {}] = useMutation(ASISTENCIA);

  const NOASIST = gql`
    mutation asistencia($input: AsistenciaInput) {
      deleteAsistencia(input: $input) {
        congresoId
        usuarioId
      }
    }
  `;
  const [deleteasistencia, {}] = useMutation(NOASIST);

  const QUERY = gql`
    query congreso($id: JSON) {
      congreso(id: $id) {
        titulo
        fecha
        ubicacion
        especialidad
        descripcion
        patrocinador
        preguntas {
          pregunta
          resupuesta
        }
        imagen
        asistencias(where: { asistire: true }) {
          usuarioId
          asistire
          _id
        }
      }
    }
  `;

  const { loading, data, error, refetch } = useQuery(QUERY, {
    variables: route.params,
  });

  let fecha;
  let fechaF;
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
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.eventContainer}>
          <View style={styles.eventImg}>
            <Image
              source={data.congreso.imagen[0] ? data.congreso.imagen[0] : image}
              style={styles.image}
            ></Image>
          </View>
          <View style={styles.detail}>
            <Text style={styles.titulo}>{data.congreso.titulo}</Text>
            <Text style={{ display: "none" }}>
              {(fecha = data.congreso.fecha[0].split("T"))}
            </Text>
            <Text style={styles.text}>
              Inicio: {fecha[0]} {fecha[1].slice(0, 5).concat(" hs")}
            </Text>
            <Text style={{ display: "none" }}>
              {
                (fechaF = data.congreso.fecha[
                  data.congreso.fecha.length - 1
                ].split("T"))
              }
            </Text>
            <Text style={styles.text}>
              Finalización: {fechaF[0]} {fecha[1].slice(0, 5).concat(" hs")}
            </Text>
            <Text style={styles.text}> Lugar: {data.congreso.ubicacion}</Text>
            <Text style={styles.text}>{data.congreso.descripcion}</Text>
            <Text style={styles.text}>
              {data.congreso.asistencias.length === 1
                ? " 1 persona asistirá"
                : ` ${data.congreso.asistencias.length} personas asistirán`}
            </Text>
          </View>

          <View style={styles.buttonCont}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setQuestion(!question)}
            >
              <Text style={styles.buttonText}> Consultas </Text>
            </TouchableOpacity>
            {data.congreso.asistencias.some(
              (e) => e.usuarioId === asiste.usuarioId
            ) ? (
              <TouchableOpacity
                style={styles.button1}
                onPress={async () => {
                  await deleteasistencia({ variables: { input: asiste } });
                  refetch();
                }}
              >
                <Text style={styles.buttonText}> No Asistiré </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button1}
                onPress={async () => {
                  await addasistencia({ variables: { input: asiste } });
                  refetch();
                }}
              >
                <Text style={styles.buttonText}> Asistiré </Text>
              </TouchableOpacity>
            )}
          </View>
          <>
            {question ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setInsertar(!insertar)}
                >
                  <Text style={styles.buttonText}> Añadir una consulta </Text>
                </TouchableOpacity>
                {insertar ? (
                  <>
                    <TextInput
                      style={{
                        height: 30,
                        border: "none",
                        borderBottom: "solid 1px #d9d9d9",
                        borderWidth: 1,
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      name={value.pregunta}
                      onChangeText={handleChange}
                    />
                    <TouchableOpacity
                      style={styles.buttonSend}
                      onPress={async () => {
                        await addpregunta({ variables: { input: value } });
                        refetch();
                        setInsertar(!insertar);
                      }}
                    >
                      <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </>
            ) : null}
            {question ? (
              data.congreso.preguntas.length ? (
                data.congreso.preguntas.map((p) => (
                  <View style={styles.details}>
                    <Text style={styles.texto}>{p.pregunta}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.detail}>
                  <Text style={styles.texto}>
                    Este evento aun no tiene consultas
                  </Text>
                </View>
              )
            ) : null}
          </>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll,
  eventContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
    paddingBottom: 30,
  },
  detail: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  eventImg: {
    height: 100,
    padding: 5,
    position: "relative",
    top: 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 20,
  },

  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    fontSize: 15,
    marginBottom: 15,
  },

  buttonCont: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    backgroundColor: "powderblue",
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 150,
  },
  button1: {
    flex: 1,
    backgroundColor: "#bdeeff",
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 120,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
  },
  buttonSend: {
    flex: 1,
    backgroundColor: "#7C88D5",
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 60,
  },
  texto: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    fontSize: 12,
    marginBottom: 2,
    color: "#67686b",
  },
  details: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});
