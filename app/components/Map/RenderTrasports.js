import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Transporte } from "../../model/Transporte";
import { Coordenada } from "../../model/Coordenada";
const trasport = new Transporte();
const coordinate = new Coordenada();

export default function RenderTrasports(props) {
  const { UserLogged, toastRef } = props;
  const [listMarkers, setListMarkers] = useState([]);

  const promise = coordinate.buscarTodasLasCoordenadas();

  /* extrae las coordenadas que bienen en la promise */
  promise
    .then((coordinats) => {
      const resultCoordinateTrasport = [];
      coordinats.forEach((doc) => {
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
      {listMarkers.map((coordinate) => (
        <Marker
          key={coordinate.val().idTransporte}
          coordinate={{
            latitude: coordinate.val().latitud,
            longitude: coordinate.val().longitud,
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
            <LoadingInfoTrasport ID={coordinate.val().idTransporte} />
          </Callout>
        </Marker>
      ))}
    </View>
  );
}

/* buscar la informacion de trasporte a traves de su ID */
function LoadingInfoTrasport(props) {
  const { ID } = props;
  const [Transport, setTransport] = useState({
    patente: "Cargando..",
    lineaTransporte: "Cargando..",
  });

  useEffect(() => {
    const promise = trasport.buscarTransporte(ID);
    promise
      .then((trasportInfo) => {
        setTransport(trasportInfo);
      })
      .catch((error) => {
        console.log("error de extraccion : ", error);
      });
  }, []);

  return (
    <View>
      <Text style={MyStyles.titleLinea}>{Transport.lineaTransporte}</Text>
      <Text style={{ textAlign: "center" }}>Patente :{Transport.patente}</Text>
    </View>
  );
}

const MyStyles = StyleSheet.create({
  titleLinea: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
