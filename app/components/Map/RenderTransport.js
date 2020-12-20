import React from "react";
import { ListItem, Icon } from 'react-native-elements'
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import { map } from 'lodash';
import { LineaTransporte } from "../../model/LineaTransporte";
const lineaTransporte = new LineaTransporte();

export default function RenderTransport(props) {
  const { transport } = props;

  const URLimage = lineaTransporte.buscarImagenLinea(transport.lineaTransporte);


  const listInfo = [
    {
      text: "LINEA : " + transport.nombreLinea,
      iconName: "alpha-l-circle",
      iconType: "material-community",
      action: null
    },
    {
      text: "PATENTE : " + transport.patente,
      iconName: "car-connected",
      iconType: "material-community",
      action: null
    },
    {
      text: "CONDUCTOR : " + transport.nombreConductor,
      iconName: "account-circle-outline",
      iconType: "material-community",
      action: null
    },
  ]

  return (
    <View>
      <Image style={styles.image} source={URLimage} />
      <View style={styles.container}>
        {map(listInfo, (item, index) => (
          <ListItem
            key={index}
            title={item.text}
            leftIcon={{
              name: item.iconName,
              type: item.iconType,
              color: "#Ef0B0B"
            }}
            containerStyle={styles.containerListItem}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    backgroundColor: "#f2f2f2",
    margin: 20,
  },
  image: {
    height: Dimensions.get("window").height - 410,
    width: Dimensions.get("window").width,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  }
});
