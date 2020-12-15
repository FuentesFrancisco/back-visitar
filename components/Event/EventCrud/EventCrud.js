import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import CreateEventScreen from "./CreateEvent";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Crear evento" component={CreateEvent} />
    </Stack.Navigator>
  );
}

export default function EventCrud() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
