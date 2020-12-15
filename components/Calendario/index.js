import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { gql, useQuery } from "@apollo/client";
import { LocaleConfig } from "react-native-calendars";
import idioma from "./idioma";
import styles from "./style";
import AgregarTarea from "./AgregarTarea";

LocaleConfig.locales["es"] = idioma;
LocaleConfig.defaultLocale = "es";

export default function Calendario({ navigation }) {
  const QUERY = gql`
    query congresos {
      congresos(where: { publicado: true }) {
        _id
        titulo
        fecha
      }
    }
  `;

  const [tareas, setTareas] = useState({});

  const obj = {};

  const fetching = () => {
    const { loading, data, error, refetch } = useQuery(QUERY);
    refetch();
    if (error) return error;
    if (data) {
      data.congresos.map((congreso) => {
        congreso.fecha.map((dias, i) => {
          let [dia, hora] = dias.split("T");
          obj[dia] = {
            hora,
            color: "lightblue",
            items: [congreso.titulo],
            startingDay: i === 0,
            endingDay: i === congreso.fecha.length - 1,
          };
        });
      });
    }
  };
  fetching();

  const seteo = (dia) => {
    if (obj[dia.dateString]) {
      let filtro = obj[dia.dateString];
      let hora = filtro.hora.slice(0, 5);
      return setTareas({ [dia.dateString]: [`${hora} ${filtro.items[0]}`] });
    } else return setTareas({ [dia.dateString]: ["Aun no tenés actividades"] });
  };
  return (
    <>
      <Agenda
        renderDay={(day, item) => {
          return (
            <View style={styles.cont}>
              <View style={styles.view}>
                <Text style={styles.day}>{day && day.day}</Text>
                <View style={styles.texto}>
                  <Text style={styles.item}>{item && item}</Text>
                </View>
              </View>
            </View>
          );
        }}
        onDayPress={(e) => seteo(e)}
        hideExtraDays={true}
        selected={Date()}
        items={tareas}
        markingType={"period"}
        markedDates={obj}
        theme={{
          calendarBackground: "white",
          agendaKnobColor: "#7C88D5",
          selectedDayTextColor: "#7C88D5",
          dayTextColor: "black",
        }}
      />
    </>
  );
}
