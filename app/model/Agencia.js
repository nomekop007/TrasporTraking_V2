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
}
