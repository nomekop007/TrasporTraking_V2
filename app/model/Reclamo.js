import { firebaseapp } from "../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const firestore = firebase.firestore(firebaseapp);

export class Reclamo {
    idReclamo = String;
    idUsuario = String;
    idTransporte = String;
    fechaHora = Date;
    titulo = String;
    comentario = String;

    constructor(idReclamo, idUsuario, idTransporte, fechaHora, titulo, comentario) {
        this.idReclamo = idReclamo;
        this.idUsuario = idUsuario;
        this.idTransporte = idTransporte;
        this.fechaHora = fechaHora;
        this.titulo = titulo;
        this.comentario = comentario;
    }

    agregarReclamo(payload) {
        const promise = firestore.collection("Reclamos").add(payload);
        return promise;
    }

    /*    async agregarReclamo(payload) {
           return await firestore.collection("Reclamos").add(payload);
       } */
}