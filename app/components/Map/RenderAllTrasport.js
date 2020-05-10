import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { firebaseapp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/database";
const db = firebase.database(firebaseapp).ref("/Coordenada/");

export default function renderMarkers() {
  const [listMarkers, setListMarkers] = useState([]);

  /* extrae lso trasportes de la base de datos */
  const resultTrasports = [];
  db.once("value", (snapshot) => {
    snapshot.forEach((doc) => {
      resultTrasports.push(doc);
    });
    setListMarkers(resultTrasports);
  }).catch((Response) => {
    console.log("error consulta");
  });

  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((trasport) => (
        <Marker
          key={trasport.val().idTrasporte}
          coordinate={{
            latitude: trasport.val().latitud,
            longitude: trasport.val().longitud,
          }}
          title={trasport.val().idTrasporte}
          description="estos es un trasporte publico"
        />
      ))}
    </View>
  );
}
