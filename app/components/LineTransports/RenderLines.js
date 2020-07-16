import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { Agencia } from "../../model/Agencia";
const agencia = new Agencia();

export default function RenderLines(props) {
  const { navigation, LineTransports, handleLoadMore, isLoading } = props;

  return (
    <View>
      {size(LineTransports) ? (
        <FlatList
          data={LineTransports}
          renderItem={(line) => (
            <LineasTranportInfo navigation={navigation} line={line} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterListLines isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderLines}>
          <ActivityIndicator size="large" color="#EF0B0B" />
          <Text>Cargando Lineas </Text>
        </View>
      )}
    </View>
  );
}

function LineasTranportInfo(props) {
  const { line, navigation } = props;
  const lineTransport = line.item;

  /* se busca el nombre de la linea */
  lineTransport.nombreAgencia = agencia.BuscarNombreDeAgencia(
    lineTransport.idAgencia
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LineTrasport", lineTransport)}
    >
      <View style={styles.viewLineTransport}>
        <View style={styles.viewLineImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="ff" />}
            source={require("../../../assets/img/original.png")}
            style={styles.imageLine}
          />
        </View>
        <View style={styles.viewInfoLine}>
          <Text style={styles.title}>{lineTransport.nombreLinea}</Text>
          <Text style={styles.description}>{lineTransport.nombreAgencia}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* funcion para cargar mas lineas */
function FooterListLines(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderLines}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notfoundLines}>
        <Text>no quedan lineas por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderLines: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewLineTransport: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 100,
  },
  viewLineImage: {
    marginRight: 15,
  },
  imageLine: {
    width: 77,
    height: 78,
  },
  title: {
    fontWeight: "bold",

    paddingTop: 12,
    fontSize: 20,
  },
  description: {
    paddingTop: 2,

    width: 300,
  },
  notfoundLines: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
