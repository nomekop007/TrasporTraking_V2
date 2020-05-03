import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import * as Permissions from "expo-permissions";
import Toast from "react-native-easy-toast";

export default function MapTrasport() {
  const toastRef = useRef();
  const [location, setlocation] = useState(null);

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
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        });
      }
    })();
  }, []);

  return (
    <View>
      <MapView
        style={{ height: "100%", width: "100%" }}
        mapType="standard"
        provider="google"
        initialRegion={
          location
          /*  {
          latitude: -35.423244,
          longitude: -71.648483,
          latitudeDelta: 0.031,
          longitudeDelta: 0.031,
        } */
        }
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
      ></MapView>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>
  );
}
