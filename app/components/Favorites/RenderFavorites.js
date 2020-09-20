import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import { Agencia } from "../../model/Agencia";
const agencia = new Agencia();

export default function RenderFavorites(props) {
  const { lineTransports, navigation } = props;

  return (
    <FlatList
      data={lineTransports}
      renderItem={(line) => (
        <LineTransportInfo line={line} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function LineTransportInfo(props) {
  const { line, navigation } = props;
  const lineTransport = line.item;

  lineTransport.nombreAgencia = agencia.BuscarNombreDeAgencia(
    lineTransport.idAgencia
  );

  const URLimage = agencia.BuscarImagenDeAgencia(lineTransport.idAgencia);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LineTrasport", lineTransport)}
    >
      <View style={styles.viewLineTransport}>
        <View style={styles.viewLineImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="ff" />}
            source={URLimage}
            style={styles.imageLine}
          />
        </View>

        <View style={styles.viewInfoLine}>
          <Text style={styles.title}>{lineTransport.nombreLinea}</Text>
          <Text style={styles.description}>{lineTransport.nombreAgencia}</Text>
        </View>
        <View style={styles.viewHeart}>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            underlayColor="transparent"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
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
    borderRadius: 200 / 2,
  },
  viewInfoLine: {
    marginRight: 15,
  },
  viewHeart: {
    marginRight: 15,
    top: 6,
    right: 90,
  },

  imageLine: {
    width: 50,
    height: 50,
    borderRadius: 200 / 2,
  },
  title: {
    fontWeight: "bold",
    paddingTop: 7,
    fontSize: 13,
  },
  description: {
    paddingTop: 2,
    width: 300,
  },
});
