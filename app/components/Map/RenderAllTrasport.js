import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { firebaseapp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
const database = firebase.database(firebaseapp);
const firestore = firebase.firestore(firebaseapp);

export default function renderMarkers() {
  const [listMarkers, setListMarkers] = useState([]);

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
          icon={require("../../../assets/img/icono.png")}
        >
          <Callout
            tooltip={false}
            onPress={() => {
              console.log(
                "funcion para dar mas informacion de :",
                trasport.val().idTrasporte
              );
            }}
          >
            <LoadingInfoTrasport id={trasport.val().idTrasporte} />
          </Callout>
        </Marker>
      ))}
    </View>
  );
}

function LoadingInfoTrasport(props) {
  const { id } = props;
  const [Trasport, setTrasport] = useState({
    Patente: "cargando...",
    lineaTrasporte: "cargando...",
  });

  useEffect(() => {
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
  }, []);

  return (
    <View>
      <Text style={{ textAlign: "center" }}>{Trasport.lineaTrasporte}</Text>
      <Text>Patente :{Trasport.Patente}</Text>
    </View>
  );
}
