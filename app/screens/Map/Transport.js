import React from "react";
import { View, Text } from "react-native";

export default function Transport(props) {
  const { navigation } = props;
  const idTransport = navigation.state.params.idTransport;

  return (
    <View>
      <Text>esto es la info del transporte... {idTransport}</Text>
    </View>
  );
}
