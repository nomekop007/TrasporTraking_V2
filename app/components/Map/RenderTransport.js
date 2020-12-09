import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { LineaTransporte } from "../../model/LineaTransporte";
const lineaTransporte = new LineaTransporte();

export default function RenderTransport(props) {
  const { transport } = props;

  const URLimage = lineaTransporte.buscarImagenLinea(transport.lineaTransporte);

  return (
    <View>
      <Image style={styles.image} source={URLimage} />
      <View style={styles.container}>
        <Text>nombre conductor: {transport.nombreConductor}</Text>
        <Text>patente: {transport.patente}</Text>
        <Text>{transport.nombreLinea}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    margin: 20,
  },
  image: {
    height: Dimensions.get("window").height - 410,
    width: Dimensions.get("window").width,
  },
});
