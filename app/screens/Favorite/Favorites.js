import React, { useEffect, useRef, useState } from "react";
import * as firebase from "firebase";
import { Icon, Button } from "react-native-elements";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { size } from "lodash";

import { Favoritos } from "../../model/Favorito";
import { LineaTransporte } from "../../model/LineaTransporte";
import RenderFavorites from "../../components/Favorites/RenderFavorites";

const favorite = new Favoritos();
const lineTransport = new LineaTransporte();

export default function Favorites(props) {
  const { navigation } = props;
  const [lineTransports, setLineTransports] = useState(null);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    if (userLogged) {
      const idUser = firebase.auth().currentUser.uid;
      const promise = favorite.mostrarTodosLosFavoritos(idUser);
      promise.then((response) => {
        const idlineasArray = [];
        response.forEach((doc) => {
          idlineasArray.push(doc.data().idLineaTransporte);
        });
        getDataLineTransport(idlineasArray).then((response) => {
          const linesTransport = [];
          response.forEach((doc) => {
            const line = doc.data();
            line.idFavorite = doc.id;
            linesTransport.push(line);
          });
          setLineTransports(linesTransport);
        });
      });
    }
  }, [userLogged]);

  const getDataLineTransport = (idlineasArray) => {
    const arraylineTransport = [];
    idlineasArray.forEach((idLine) => {
      const result = lineTransport.buscarLineaTransporte(idLine);
      arraylineTransport.push(result);
    });
    return Promise.all(arraylineTransport);
  };

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (!lineTransports) {
    return (
      <View style={styles.loaderLines}>
        <ActivityIndicator size="large" color="#EF0B0B" />
        <Text>Cargando Favoritos </Text>
      </View>
    );
  } else if (size(lineTransports) === 0) {
    return <NotFoundFavorites />;
  }

  return (
    <View type={styles.viewBody}>
      <RenderFavorites
        lineTransports={lineTransports}
        navigation={navigation}
      />
    </View>
  );
}

function NotFoundFavorites() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes favoritos en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta seccion
      </Text>
      <Button
        title="Ir al login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#EF0B0B" }}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderLines: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
