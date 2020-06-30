import { firebaseapp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const firestore = firebase.firestore(firebaseapp);

export class Transporte {
  idTransporte = String;
  nombreConductor = String;
  patente = String;
  lineaTransporte = String;
  estado = Boolean;
  constructor(idTransporte, nombreConductor, patente, lineaTransporte, estado) {
    this.idTransporte = idTransporte;
    this.nombreConductor = nombreConductor;
    this.patente = patente;
    this.lineaTransporte = lineaTransporte;
    this.estado = estado;
  }

  buscarTransporte(idTransporte) {
    let promise = firestore
      .collection("Transporte")
      .doc(idTransporte)
      .get()
      .then((doc) => {
        const transporte = doc.data();

        return firestore
          .collection("LineaTransporte")
          .doc(transporte.lineaTransporte)
          .get()
          .then((obj) => {
            /* cambio del idlinea por nombre de la linea */
            transporte.nombreLinea = obj.data().nombreLinea;
            return transporte;
          });
      })
      .catch(function (error) {
        console.log("error de extraccion :", error);
      });

    return promise;
  }
}
