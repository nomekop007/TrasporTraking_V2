import React, { useState, useEffect } from "react";
import MapViewDirections from 'react-native-maps-directions';
import { MAPKEY } from "@env"
import { View, Text, StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Transporte } from "../../model/Transporte";
import { Coordenada } from "../../model/Coordenada";

const trasport = new Transporte();
const coordinate = new Coordenada();

export default function RenderAllTransports(props) {
  const { UserLogged, setidTransporte, idTransporte, setmostrarLeyenda, setorigin, origin, toastRef, navigation, location, setdistancia, setTiempo } = props;
  const [listMarkers, setListMarkers] = useState([]);

  useEffect(() => {
    coordinate.buscarTodasLasCoordenadas().then((coordinats) => {
      const resultCoordinateTrasport = [];
      coordinats.forEach((doc) => {
        resultCoordinateTrasport.push(doc.val());
      });
      setListMarkers(resultCoordinateTrasport);
    })
  }, [coordinate.buscarTodasLasCoordenadas()]);



  return (
    /* devuelve lista de markers */
    <View>
      {listMarkers.map((marker) => {
        if (marker.latitud !== 0 || marker.longitud !== 0) {
          return (
            <Marker
              key={marker.idTransporte}
              coordinate={{
                latitude: marker.latitud,
                longitude: marker.longitud,
              }}
              icon={require("../../../assets/img/icono.png")}
              onPress={(data) => {
                setidTransporte(marker.idTransporte)
                const coordinate = data.nativeEvent.coordinate;
                setorigin(coordinate);
              }}
            >
              <Callout
                onPress={() => {
                  UserLogged
                    ? navigation.navigate("Transport", {
                      idTransport: marker.idTransporte,
                    })
                    : toastRef.current.show(
                      "Para mas informacion debe iniciar Sesion",
                      3000
                    );
                }}
              >
                <LoadingInfoTrasport ID={marker.idTransporte} />
              </Callout>
            </Marker>
          );
        }
      })}
      <MapViewDirections
        origin={origin}
        destination={location}
        strokeWidth={8}
        strokeColor="#0858AE"
        apikey={MAPKEY}
        onReady={result => {
          setdistancia(result.distance);
          setTiempo(result.duration.toFixed(2));
          setmostrarLeyenda(true);
        }}
      />
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
