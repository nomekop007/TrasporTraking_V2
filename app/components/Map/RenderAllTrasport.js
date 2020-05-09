import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { firebaseapp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/database";
const db = firebase.database(firebaseapp).ref("/Coordenada/");

export default function renderMarkers() {
  const [listMarkers, setListMarkers] = useState([]);

  console.log(listMarkers);

  /* cargar lista de trasportes de database */
  useEffect(() => {
    const resultTrasports = [];
    db.on("value", (snapshot) => {
      snapshot.forEach((doc) => {
        resultTrasports.push(doc);
      });
      setListMarkers(resultTrasports);
    });
  }, []);

  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((trasport, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: trasport.val().latitud,
            longitude: trasport.val().longitud,
          }}
          title={trasport.val().idTrasporte}
        />
      ))}
    </View>
  );
}
