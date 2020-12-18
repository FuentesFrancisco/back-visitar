import { gql, useQuery } from "@apollo/client";
import React from "react";

export default function Hquery() {
  const SEARCHUSER = gql`
    query usuarios($where: JSON) {
      usuarios(where: $where) {
        nombre
        apellido
        especialidad
        laboratorio
        imagen
        _id
      }
    }
  `;
}
