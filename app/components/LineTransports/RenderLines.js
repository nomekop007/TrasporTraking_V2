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
  const { nombreLinea, idAgencia } = line.item;

  let agencia = "";
  switch (idAgencia) {
    case "a1":
      agencia = "Taxutal";
      break;
    case "a2":
      agencia = "Abate Molina";
      break;
    case "a3":
      agencia = "Sotratal";
      break;
    default:
      agencia = "Agencia desconocida";
      break;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Map", {
          idlineTransport: line.item.idLineaTransporte,
        })
      }
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
          <Text style={styles.title}>{nombreLinea}</Text>
          <Text style={styles.description}>{agencia}</Text>
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
    backgroundColor: "#1555F9",
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
    paddingTop: 15,
    fontSize: 25,
  },
  description: {
    paddingTop: 2,
    color: "#FFFFFF",
    width: 300,
  },
  notfoundLines: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
