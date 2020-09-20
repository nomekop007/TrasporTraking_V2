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

  buscarImagenLinea(idLinea) {
    switch (idLinea) {
      case "l1":
        return require("../../assets/imagenes_lineas/linea1.jpg");
      case "l2":
        return require("../../assets/imagenes_lineas/linea2.jpeg");
      case "l3":
        return require("../../assets/imagenes_lineas/linea3.jpg");
      case "l3b":
        return require("../../assets/imagenes_lineas/linea3B.jpg");
      case "l4":
        return require("../../assets/imagenes_lineas/linea4.jpg");
      case "l5":
        return require("../../assets/imagenes_lineas/linea5.jpg");
      case "l6":
        return require("../../assets/imagenes_lineas/linea6.jpeg");
      case "l7":
        return require("../../assets/imagenes_lineas/linea7.jpg");
      case "la":
        return require("../../assets/imagenes_lineas/lineaA.jpeg");
      case "lb":
        return require("../../assets/imagenes_lineas/lineaB.jpg");
      case "lc":
        return require("../../assets/imagenes_lineas/lineaC.jpg");
      case "lcolin":
        return require("../../assets/imagenes_lineas/lineaColin.jpg");
      case "ld":
        return require("../../assets/imagenes_lineas/lineaD.jpg");

      default:
        return require("../../assets/img/original.png");
    }
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
      .limit(8)
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
      .limit(8)
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

  async buscarLineaTransporte(idLinea) {
    const promise = await firestore
      .collection("LineaTransporte")
      .doc(idLinea)
      .get();
    return promise;
  }
}
