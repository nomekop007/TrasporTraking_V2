import { firebaseapp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/database";
const database = firebase.database(firebaseapp);

export class Coordenada {
  idTransporte = String;
  longitud = Number;
  latitud = Number;
  constructor(idTransporte, longitud, latitud) {
    this.idTransporte = idTransporte;
    this.longitud = longitud;
    this.latitud = latitud;
  }

  buscarTodasLasCoordenadas() {
    var misDatos = Promise.resolve(
      database
        .ref("/Coordenada/")
        .once("value")
        .catch((error) => {
          console.log("error de extraccion : ", error);
        })
    );
    return misDatos;
  }
}
