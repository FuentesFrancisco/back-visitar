import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { gql, useQuery } from "@apollo/client";
import { LocaleConfig } from "react-native-calendars";
import idioma from "./idioma";

LocaleConfig.locales["es"] = idioma;
LocaleConfig.defaultLocale = "es";

export default function Calendario() {
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
  const items = {};
  const fetching = () => {
    const { loading, data, error, refetch } = useQuery(QUERY);
    refetch();
    if (error) return error;
    if (data) {
      data.congresos.map((congreso) => {
        if (!congreso.fecha[1]) {
          obj[congreso.fecha[0].split("T")[0]] = {
            hora: congreso.fecha[0].split("T")[1],
            startingDay: true,
            endingDay: true,
            color: "lightblue",
            items: [congreso.titulo],
          };
        } else if (!congreso.fecha[2]) {
          obj[congreso.fecha[0].split("T")[0]] = {
            hora: congreso.fecha[0].split("T")[1],
            startingDay: true,
            color: "lightblue",
            items: [congreso.titulo],
          };
          obj[congreso.fecha[1].split("T")[0]] = {
            hora: congreso.fecha[1].split("T")[1],
            endingDay: true,
            color: "lightblue",
            items: [congreso.titulo],
          };
        } else {
          congreso.fecha.map((dias, i) => {
            if (i === 0) {
              obj[dias.split("T")[0]] = {
                hora: dias.split("T")[1],
                startingDay: true,
                endingDay: false,
                color: "lightblue",
                items: [congreso.titulo],
              };
            } else if (i === congreso.fecha.length - 1) {
              obj[dias.split("T")[0]] = {
                hora: dias.split("T")[1],
                endingDay: true,
                startingDay: false,
                color: "lightblue",
                items: [congreso.titulo],
              };
            } else
              obj[dias.split("T")[0]] = {
                hora: dias.split("T")[1],
                color: "lightblue",
                endingDay: false,
                startingDay: false,
                items: [congreso.titulo],
              };
          });
        }
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
            <View style={styles.view}>
              <Text style={styles.day}>{day && day.day}</Text>
              <View style={styles.texto}>
                <Text style={styles.item}>{item && item}</Text>
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

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  day: {
    margin: 20,
    color: "lightblue",
    fontSize: 20,
  },
  texto: {
    width: "100%",
    color: "black",
    paddingLeft: 20,
  },
});
