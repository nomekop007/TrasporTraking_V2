import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Transporte } from "../../model/Transporte";
import { Coordenada } from "../../model/Coordenada";
const trasport = new Transporte();
const coordinate = new Coordenada();

export default function RenderAllTransports(props) {
  const { UserLogged, toastRef, navigation } = props;
  const [listMarkers, setListMarkers] = useState([]);

  const promise = coordinate.buscarTodasLasCoordenadas();

  /* extrae las coordenadas que bienen en la promise */
  promise.then((coordinats) => {
    const resultCoordinateTrasport = [];
    coordinats.forEach((doc) => {
      resultCoordinateTrasport.push(doc);
    });
    setListMarkers(resultCoordinateTrasport);
  });

  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((marker) => {
        if (marker.val().latitud !== 0 || marker.val().longitud !== 0) {
          return (
            <Marker
              key={marker.val().idTransporte}
              coordinate={{
                latitude: marker.val().latitud,
                longitude: marker.val().longitud,
              }}
              icon={require("../../../assets/img/icono.png")}
            >
              <Callout
                onPress={() => {
                  UserLogged
                    ? navigation.navigate("Transport", {
                        idTransport: marker.val().idTransporte,
                      })
                    : toastRef.current.show(
                        "Para mas informacion debe iniciar Sesion",
                        3000
                      );
                }}
              >
                <LoadingInfoTrasport ID={marker.val().idTransporte} />
              </Callout>
            </Marker>
          );
        }
      })}
    </View>
  );
}

/* buscar la informacion de trasporte a traves de su ID */
function LoadingInfoTrasport(props) {
  const { ID } = props;
  const [Transport, setTransport] = useState({
    patente: "Cargando..",
    nombreLinea: "Cargando..",
  });

  useEffect(() => {
    const promise = trasport.buscarTransporte(ID);

    promise.then((transportInfo) => {
      if (transportInfo !== undefined) {
        setTransport(transportInfo);
      }
    });
  }, []);

  return (
    <View>
      <Text style={MyStyles.titleLinea}>{Transport.nombreLinea}</Text>
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
