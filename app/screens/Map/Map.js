import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Toast from "react-native-easy-toast";
import RenderTrasports from "../../components/Map/RenderTrasports";
import firebase from "firebase";
import { LineaTransporte } from "../../model/LineaTransporte";
const Lines = new LineaTransporte();

export default function Map(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [mapView, setmapView] = useState({});
  const [location, setlocation] = useState(null);
  const [UserLogged, setUserLogged] = useState(false);
  const [fileKml, setFileKml] = useState(null);

  if (navigation.state.params) {
    const promise = Lines.MostrarRecorridoLinea(
      navigation.state.params.idlineTransport
    );

    promise.then((kml) => {
      setFileKml(kml);
    });
  }

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
    console.log(fileKml);

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
        ref={(mapView) => {
          setmapView(mapView);
        }}
        kmlSrc={fileKml}
        style={{ height: "100%", width: "100%" }}
        mapType="mutedStandard"
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
        <RenderTrasports
          UserLogged={UserLogged}
          toastRef={toastRef}
          navigation={navigation}
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
