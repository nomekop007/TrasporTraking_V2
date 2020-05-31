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
    let promesa = Promise.resolve(
      firestore
        .collection("Transporte")
        .doc(idTransporte)
        .get()
        .then((doc) => {
          const data = doc.data();
          /* se cambia nombre de linea de trasporte */
          switch (data.lineaTrasporte) {
            case "l1":
              data.lineaTrasporte = "linea A";
              break;
            case "l2":
              data.lineaTrasporte = "linea B";
              break;
            case "l3":
              data.lineaTrasporte = "linea C";
              break;
            case "l4":
              data.lineaTrasporte = "linea D";
              break;
            case "l5":
              data.lineaTrasporte = "linea Colin";
              break;

            default:
              data.lineaTrasporte = "linea desconocida";
              break;
          }
          return data;
        })
        .catch(function (error) {
          console.log("error de extraccion :", error);
        })
    );

    return promesa;
  }
}
