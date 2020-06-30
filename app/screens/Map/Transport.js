import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Transporte } from "../../model/Transporte";
const transport = new Transporte();

export default function Transport(props) {
  const { navigation } = props;
  const [Transport, setTransport] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const idTransport = navigation.state.params.idTransport;
  useEffect(() => {
    const promise = transport.buscarTransporte(idTransport);
    promise.then((doc) => {
      setTransport(doc);
      setisLoading(true);
    });
  }, []);

  console.log(Transport);

  return isLoading ? (
    <ScrollView style={styles.viewBody}>
      <View>
        <Text>id : {idTransport}</Text>
        <Text>conductor : {Transport.nombreConductor}</Text>
        <Text>patente : {Transport.patente}</Text>
        <Text>nombre linea : {Transport.nombreLinea}</Text>
        <Text>id linea : {Transport.lineaTransporte}</Text>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#EF0B0B" />
      <Text style={{ textAlign: "center" }}>Cargando Transporte </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    margin: 15,
  },
  loader: {
    marginTop: 20,
  },
});
