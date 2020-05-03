import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;

  //overlay: es la ventana o modal    indicator: es el spiner
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="trasparent"
      overlayStyle={style.Overlay}
    >
      <View style={style.view}>
        <ActivityIndicator size="large" color="#EF0B0B" />
        {text && <Text style={style.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

//hoja de estilos
const style = StyleSheet.create({
  Overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#EF0B0B",
    borderWidth: 2,
    borderRadius: 10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#EF0B0B",
    textTransform: "uppercase",
    marginTop: 10
  }
});
