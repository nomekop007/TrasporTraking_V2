import React from "react";
import { View, Text, Dimensions } from "react-native";

const screenWith = Dimensions.get("window").width;

export default function RenderTransport(props) {
  const { transport } = props;

  return (
    <View>
      <Text>hola {transport.nombreConductor}</Text>
    </View>
  );
}
