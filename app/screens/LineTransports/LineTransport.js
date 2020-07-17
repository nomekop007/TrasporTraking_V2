import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { LineaTransporte } from "../../model/LineaTransporte";
const line = new LineaTransporte();

export default function LineTranporte(props) {
  const { navigation } = props;
  const [fileKML, setfileKML] = useState(null);
  const lineTransport = navigation.state.params;

  if (lineTransport.descripcion == "") {
    lineTransport.descripcion = "sin informacion disponible.";
  }

  const promise = line.MostrarRecorridoLinea(lineTransport.idLineaTransporte);
  promise.then((recorrido) => {
    setfileKML(recorrido);
  });

  return (
    <View style={styles.container}>
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
