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
    /*  let kml = null;

    switch (idLineaTransporte) {
      case "l1":
        kml = URL("../../assets/raw/l1.kml");
        break;
       case "l2":
        kml = File("../../assets/raw/l2.kml");
        break;
      case "l3":
        kml = File("../../assets/raw/l3.kml");
        break;
      case "l3b":
        kml = require("../../assets/raw/l3b.kml");
        break;
      case "l4":
        kml = require("../../assets/raw/l4.kml");
        break;
      case "l5":
        kml = require("../../assets/raw/l5.kml");
        break;
      case "l6":
        kml = require("../../assets/raw/l6.kml");
        break;
      case "l7":
        kml = require("../../assets/raw/l7.kml");
        break;
      case "la":
        kml = require("../../assets/raw/la.kml");
        break;
      case "lb":
        kml = require("../../assets/raw/lb.kml");
        break;
      case "lc":
        kml = require("../../assets/raw/lc.kml");
        break;
      case "lcolin":
        kml = require("../../assets/raw/lcolin.kml");
        break;
      case "ld":
        kml = require("../../assets/raw/ld.kml");
        break; 

      default:
        kml = null;
        break;
    }
    console.log(kml);

    return kml; */
  }
}
