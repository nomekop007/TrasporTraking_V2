import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import * as Permissions from "expo-permissions";
import Toast from "react-native-easy-toast";
import RenderAllTrasport from "../Map/RenderAllTrasport";
import firebase from "firebase";

export default function MapTrasport() {
  const toastRef = useRef();
  const [location, setlocation] = useState(null);
  const [UserLogged, setUserLogged] = useState(false);
  /* validar si el usuario esta logeado  no */
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLogged(true) : setUserLogged(false);
    });
  }, []);

  const [Region, setRegion] = useState({
    latitude: -35.423244,
    longitude: -71.648483,
    latitudeDelta: 0.031,
    longitudeDelta: 0.031,
  });

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
      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View>
      <MapView
        style={{ height: "100%", width: "100%" }}
        mapType="standard"
        provider="google"
        region={Region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={true}
        zoomControlEnabled={false}
        loadingEnabled={true}
      >
        <RenderAllTrasport UserLogged={UserLogged} toastRef={toastRef} />
      </MapView>
      <Icon
        reverse
        type="material-community"
        name="crosshairs-gps"
        color="#0055FF"
        onPress={() => findLocation(location)}
        containerStyle={styles.btnContainer}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>
  );
}

/* estilos */
const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
