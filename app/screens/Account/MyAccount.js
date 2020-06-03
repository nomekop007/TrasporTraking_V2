import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import * as firebase from "firebase";
import { firebaseapp } from "../../utils/Firebase";
import "firebase/firestore";
/* llamando la base de datos firestone */
const db = firebase.firestore(firebaseapp);

export default function MyAccount() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //pregunta  si user es null o false
      if (user === null) {
        setLogin(false);
      } else {
        setLogin(true);
        db.collection("Usuario")
          .doc(user.uid)
          .set({
            idUsuario: user.uid,
            correoElectronico: user.email,
            nombreUsuario: user.displayName ? user.displayName : "Anónimo",
          })
          .then((error) => {
            console.log("Error writing document: ", error);
          });
      }
    });
  }, []);

  //se esta cargando la ventana
  if (login === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  //pregunta si el usuario esta logeado o no y envia a la ventana
  return login ? <UserLogged /> : <UserGuest />;
}
