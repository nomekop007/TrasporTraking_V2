import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Transporte } from "../../model/Transporte";
import { Coordenada } from "../../model/Coordenada";
const trasporte = new Transporte();
const coordenada = new Coordenada();

export default function RenderTrasports(props) {
  const { UserLogged, toastRef } = props;
  const [listMarkers, setListMarkers] = useState([]);

  const promise = coordenada.buscarTodasLasCoordenadas();

  /* extrae las coordenadas que bienen en la promise */
  promise
    .then((coordinates) => {
      const resultCoordinateTrasport = [];
      coordinates.forEach((doc) => {
        resultCoordinateTrasport.push(doc);
      });
      setListMarkers(resultCoordinateTrasport);
    })
    .catch((error) => {
      console.log("error de extraccion : ", error);
    });

  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((coordenada) => (
        <Marker
          key={coordenada.val().idTrasporte}
          coordinate={{
            latitude: coordenada.val().latitud,
            longitude: coordenada.val().longitud,
          }}
          icon={require("../../../assets/img/icono.png")}
        >
          <Callout
            onPress={() => {
              UserLogged
                ? console.log("redireccionar a modal informacion")
                : toastRef.current.show(
                    "Para mas informacion debe iniciar Sesion",
                    3000
                  );
            }}
          >
            <LoadingInfoTrasport ID={coordenada.val().idTrasporte} />
          </Callout>
        </Marker>
      ))}
    </View>
  );
}

/* buscar la informacion de trasporte a traves de su ID */
function LoadingInfoTrasport(props) {
  const { ID } = props;
  const [Trasport, setTrasport] = useState({
    Patente: "Cargando..",
    lineaTrasporte: "Cargando..",
  });

  useEffect(() => {
    const promesa = trasporte.buscarTransporte(ID);
    promesa
      .then((trasporte) => {
        setTrasport(trasporte);
      })
      .catch((error) => {
        console.log("error de extraccion : ", error);
      });
  }, []);

  return (
    <View>
      <Text style={MyStyles.titleLinea}>{Trasport.lineaTrasporte}</Text>
      <Text style={{ textAlign: "center" }}>Patente :{Trasport.Patente}</Text>
    </View>
  );
}

const MyStyles = StyleSheet.create({
  titleLinea: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
