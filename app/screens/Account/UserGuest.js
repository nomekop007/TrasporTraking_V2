import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/original.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil de TrasporTracking</Text>
      <Text style={styles.description}>
        ¿ necesita ayuda para ubicar los trasportes publicos? Busca, visualiza y
        sigue los trasportes que se movilizan por toda la region !Registrate
        para ayudarnos a mejorar el trasporte publico.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnSyle}
          containerStyle={styles.btnContainer}
          title="ver tu perfil"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(UserGuest);

//estilo
const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnSyle: {
    backgroundColor: "#EF0B0B",
  },
  btnContainer: {
    width: "70%",
  },
});
