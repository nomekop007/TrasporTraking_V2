import { firebaseapp } from "../utils/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";
const firestore = firebase.firestore(firebaseapp);

export class Favoritos {
  idLineaTransporte = String;
  idUsuario = String;
  constructor(idLineaTransporte, idUsuario) {
    this.idLineaTransporte = idLineaTransporte;
    this.idUsuario = idUsuario;
  }

  verLineaFavorita(idLinea, idUser) {
    const promise = firestore
      .collection("Favoritos")
      .where("idLineaTransporte", "==", idLinea)
      .where("idUsuario", "==", idUser)
      .get()
      .then((response) => {
        return response;
      });
    return promise;
  }

  agregarLineaFavoritos(payload) {
    const promise = firestore.collection("Favoritos").add(payload);
    return promise;
  }

  eliminarLineaFavoritos(idLinea, idUser) {
    const promise = firestore
      .collection("Favoritos")
      .where("idLineaTransporte", "==", idLinea)
      .where("idUsuario", "==", idUser)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorito = doc.id;
          return firestore.collection("Favoritos").doc(idFavorito).delete();
        });
      });
    return promise;
  }

  async mostrarTodosLosFavoritos(idUser) {
    const promise = await firestore
      .collection("Favoritos")
      .where("idUsuario", "==", idUser)
      .get()
      .then();
    return promise;
  }
}
