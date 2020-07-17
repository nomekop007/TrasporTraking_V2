export class Agencia {
  idAgencia = String;
  nombreAgencia = String;

  constructor(idAgencia, nombreAgencia) {
    this.idAgencia = idAgencia;
    this.nombreAgencia = nombreAgencia;
  }

  BuscarNombreDeAgencia(idAgencia) {
    switch (idAgencia) {
      case "a1":
        return "Taxutal";

      case "a2":
        return "Abate Molina";

      case "a3":
        return "Sotratal";

      default:
        return "Agencia desconocida";
    }
  }

  BuscarImagenDeAgencia(idAgencia) {
    switch (idAgencia) {
      case "a1z":
        return require("../../assets/imagenes_lineas/agencias/taxutal2.jpg");

      case "a2z":
        return require("../../assets/imagenes_lineas/agencias/abatemolina2.jpg");

      case "a3z":
        return require("../../assets/imagenes_lineas/agencias/sotratal2.jpg");

      default:
        return require("../../assets/img/original.png");
    }
  }
}
