import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Transporte } from "../../model/Transporte";
import RenderTransport from "../../components/Map/RenderTransport";
import ListReclamos from '../../components/Map/ListReclamos';
const transport = new Transporte();

export default function Transport(props) {
  const { navigation } = props;
  const [Transport, setTransport] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const idTransport = navigation.state.params.idTransport;
  useEffect(() => {
    const promise = transport.buscarTransporte(idTransport);
    promise.then((doc) => {
      if (doc !== undefined) {
        setTransport(doc);
        setisLoading(true);
      }
    });
  }, []);

  return isLoading ? (
    <ScrollView style={styles.viewBody}>
      <View>
        <RenderTransport transport={Transport} />
        <ListReclamos navigation={navigation}
          idTransporte={Transport.idTransporte}
        />
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
  },
  loader: {
    marginTop: 20,
  },
});
