import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { firebaseapp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
const database = firebase.database(firebaseapp);
const firestore = firebase.firestore(firebaseapp);

export default function renderMarkers() {
  const [listMarkers, setListMarkers] = useState([]);
  const [Trasport, setTrasport] = useState({
    Patente: "cargando...",
    idTrasporte: "CVIGE8xKkLUy5Zkfy4vkLqOOKXb2",
    lineaTrasporte: "cargando...",
  });

  /* extrae las coordenadsa de la base de datos */
  const resultTrasports = [];
  database
    .ref("/Coordenada/")
    .once("value", (snapshot) => {
      snapshot.forEach((doc) => {
        resultTrasports.push(doc);
      });
      setListMarkers(resultTrasports);
    })
    .catch((error) => {
      console.log("error de extraccion : ", error);
    });

  /* extrae el trasporte seleccionado en la base de datos*/
  const inforTrasport = (id) => {
    firestore
      .collection("Transporte")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();

        /* se cambia nombre de linea de trasporte */
        switch (data.lineaTrasporte) {
          case "l1":
            data.lineaTrasporte = "linea A";
            break;
          case "l2":
            data.lineaTrasporte = "linea B";
            break;
          case "l3":
            data.lineaTrasporte = "linea C";
            break;
          case "l4":
            data.lineaTrasporte = "linea D";
            break;
          case "l5":
            data.lineaTrasporte = "linea Colin";
            break;

          default:
            data.lineaTrasporte = "linea desconocida";
            break;
        }
        setTrasport(data);
      })
      .catch(function (error) {
        console.log("error de extraccion :", error);
      });
  };

  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((trasport) => (
        <Marker
          identifier={trasport.val().idTrasporte}
          key={trasport.val().idTrasporte}
          coordinate={{
            latitude: trasport.val().latitud,
            longitude: trasport.val().longitud,
          }}
          title={Trasport.lineaTrasporte}
          description={Trasport.Patente}
          onPress={(e) => {
            inforTrasport(e.nativeEvent.id);
          }}
        />
      ))}
    </View>
  );
}
