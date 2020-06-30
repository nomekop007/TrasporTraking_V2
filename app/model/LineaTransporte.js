import { firebaseapp } from "../utils/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";
const firestore = firebase.firestore(firebaseapp);

export class LineaTransporte {
  idLineaTransporte = String;
  idAgencia = String;
  nombreLinea = String;
  constructor(idLineaTransporte, idAgencia, nombreLinea) {
    this.idLineaTransporte = idLineaTransporte;
    this.idAgencia = idAgencia;
    this.nombreLinea = nombreLinea;
  }

  CantidadLineasTransportes() {
    let promise = firestore
      .collection("LineaTransporte")
      .get()
      .then((lineas) => {
        return lineas.size;
      })
      .catch((error) => {
        console.log("error de extraccion : ", error);
      });
    return promise;
  }

  BuscarPrimerasLineasTransportes() {
    let promise = firestore
      .collection("LineaTransporte")
      .orderBy("idLineaTransporte", "asc")
      .limit(7)
      .get()
      .then()
      .catch((error) => {
        console.log("error de extraccion : ", error);
      });
    return promise;
  }

  CargarMasLineasTransportes(startLines) {
    let promise = firestore
      .collection("LineaTransporte")
      .orderBy("idLineaTransporte", "asc")
      .startAfter(startLines)
      .limit(7)
      .get()
      .then()
      .catch((error) => {
        console.log("error de extraccion : ", error);
      });
    return promise;
  }

  MostrarRecorridoLinea(idLineaTransporte) {
    const promise = firebase
      .storage()
      .ref(`lineaDeTransporte/archivosKML/${idLineaTransporte}.kml`)
      .getDownloadURL()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });

    return promise;
  }
}
