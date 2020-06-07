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
          <ActivityIndicator size="large" />
          <Text>Cargando Lineas </Text>
        </View>
      )}
    </View>
  );
}

function LineasTranportInfo(props) {
  const { line, navigation } = props;
  const { idAgencia, idLineaTransporte, nombreLinea } = line.item;

  const descripcion =
    "La línea X de autobús (Dirección: Puertas Del Sur) tiene 59 paradas desde Terminal Taxual A / Cruce Ruta 5 hasta K-610 / Terminal A. ";

  return (
    <TouchableOpacity onPress={() => console.log("ir a navegacion")}>
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
          <Text style={{ fontWeight: "bold" }}>{nombreLinea}</Text>
          <Text style={styles.description}>{descripcion.substr(0, 80)}...</Text>
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
    margin: 10,
  },
  viewLineImage: {
    marginRight: 15,
  },
  imageLine: {
    width: 80,
    height: 80,
  },
  description: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notfoundLines: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
