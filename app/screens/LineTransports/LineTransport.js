import React, { useState, useRef, useEffect } from "react";
import { Icon } from "react-native-elements";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { LineaTransporte } from "../../model/LineaTransporte";
import { Favoritos } from "../../model/Favorito";

import * as firebase from "firebase";
import Toast from "react-native-easy-toast";
const line = new LineaTransporte();
const favorite = new Favoritos();

export default function LineTranporte(props) {
  const { navigation } = props;
  const [fileKML, setfileKML] = useState(null);
  const lineTransport = navigation.state.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  if (lineTransport.descripcion == "") {
    lineTransport.descripcion = "sin informacion disponible.";
  }

  useEffect(() => {
    if (userLogged && lineTransport) {
      const promise = favorite.verLineaFavorita(
        lineTransport.idLineaTransporte,
        firebase.auth().currentUser.uid
      );
      promise.then((response) => {
        if (response.docs.length === 1) {
          setIsFavorite(true);
        }
      });
    }
  }, [userLogged, lineTransport]);

  const promise = line.MostrarRecorridoLinea(lineTransport.idLineaTransporte);
  promise.then((recorrido) => {
    setfileKML(recorrido);
  });

  const addFavorite = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para usar el sistema de favoritos debes estar logeado"
      );
    } else {
      const payload = {
        idUsuario: firebase.auth().currentUser.uid,
        idLineaTransporte: lineTransport.idLineaTransporte,
      };
      const promise = favorite.agregarLineaFavoritos(payload);
      promise.then(() => {
        setIsFavorite(true);
        toastRef.current.show("linea de Transporte añadido a favoritos");
      });
    }
  };
  const removeFavorite = () => {
    const promise = favorite.eliminarLineaFavoritos(
      lineTransport.idLineaTransporte,
      firebase.auth().currentUser.uid
    );
    promise.then(() => {
      setIsFavorite(false);
      toastRef.current.show("Linea Elimianda de favoritos");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewFavoritos}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          onPress={isFavorite ? removeFavorite : addFavorite}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          underlayColor="transparent"
        />
      </View>
      <MapView
        kmlSrc={fileKML}
        style={styles.map}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -35.423244,
          longitude: -71.648483,
          latitudeDelta: 0.057,
          longitudeDelta: 0.057,
        }}
        showsUserLocation={true}
      />
      <ShowInfoLineTransport />
      <ScrollView>
        <View style={styles.panel}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Descripcion</Text>
          <Text style={{ fontSize: 15 }}>{lineTransport.descripcion}</Text>
        </View>
      </ScrollView>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

function ShowInfoLineTransport() {
  return (
    <View style={styles.leyenda}>
      <View>
        <Text style={styles.text}> Ida </Text>
        <Text style={styles.text}> Regreso </Text>
      </View>
      <View style={{ width: 20 }}>
        <Text style={styles.ida}> </Text>
        <Text style={styles.vuelta}> </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewFavoritos: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 30,
    padding: 5,
    paddingLeft: 15,
  },
  leyenda: {
    position: "absolute",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 3,
    flexDirection: "row",
  },
  panel: {
    margin: 10,
  },
  map: {
    height: Dimensions.get("window").height - 300,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
  },
  vuelta: {
    backgroundColor: "red",
    borderRadius: 4,
  },
  ida: {
    backgroundColor: "blue",
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
  },
});
