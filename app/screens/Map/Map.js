import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";


import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Toast from "react-native-easy-toast";
import RenderAllTransports from "../../components/Map/RenderAllTransports";
import firebase from "firebase";

export default function Map(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [mapView, setmapView] = useState({});
  const [UserLogged, setUserLogged] = useState(false);
  const [location, setlocation] = useState(null);
  const [origin, setorigin] = useState(null);
  const [distancia, setdistancia] = useState(null);
  const [tiempo, setTiempo] = useState(null);
  const [mostrarLeyenda, setmostrarLeyenda] = useState(false);
  const [idTransporte, setidTransporte] = useState(false);
  /* validar si el usuario esta logeado  no */
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLogged(true) : setUserLogged(false);
    });
  }, []);

  /* pedir permisos de ubicacion */
  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );

      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que Aceptar los permisos de localizacion para ver ubicacion",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setlocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        });
      }
    })();
  }, []);

  /* funcion para enviar la ubicacion del usuario */
  const findLocation = (props) => {
    if (props === null) {
      toastRef.current.show("El GPS esta desactivado!", 2000);
    } else {
      const { latitude, longitude } = props;

      mapView.animateCamera(
        {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          pitch: 0,
          heading: 0,
          zoom: 17,
          altitude: 1000,
        },
        2000
      );
    }
  };

  return (
    <View>
      <MapView
        onPress={() => {
          setorigin(null);
          setdistancia(null);
          setTiempo(null);
          setmostrarLeyenda(false);
        }}
        ref={(mapView) => {
          setmapView(mapView);
        }}
        style={{ height: "100%", width: "100%" }}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -35.423244,
          longitude: -71.648483,
          latitudeDelta: 0.031,
          longitudeDelta: 0.031,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        zoomControlEnabled={false}
        loadingEnabled={true}
      >
        <RenderAllTransports
          UserLogged={UserLogged}
          toastRef={toastRef}
          navigation={navigation}
          location={location}
          origin={origin}
          idTransporte={idTransporte}
          setdistancia={setdistancia}
          setTiempo={setTiempo}
          setorigin={setorigin}
          setmostrarLeyenda={setmostrarLeyenda}
          setidTransporte={setidTransporte}
        />
      </MapView>
      <Icon
        reverse
        type="material-community"
        name="crosshairs-gps"
        color="#0055FF"
        onPress={() => findLocation(location)}
        containerStyle={styles.btnContainer}
      />
      {
        mostrarLeyenda ? (<View style={styles.leyenda}>
          <View>
            <Text style={styles.text}> Distancia: {distancia} metros </Text>
            <Text style={styles.text}> Tiempo: {tiempo} min aprox </Text>
          </View>
        </View>) : (<View></View>)
      }

      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>
  );
}

/* estilos */
const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 15,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  leyenda: {
    position: "absolute",
    backgroundColor: "#3FAE08",
    margin: 10,
    borderRadius: 3,
    flexDirection: "row",
  },

  container: {
    position: "absolute",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
  },
  vuelta: {
    backgroundColor: "red",
    color: "#fff",
    borderRadius: 9,
    textAlign: "center",
  },
  ida: {
    backgroundColor: "blue",
    color: "#fff",
    borderRadius: 9,
    textAlign: "center",
  },
});
