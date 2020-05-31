export class LineaTransporte {
  idLineaTransporte = String;
  idAgencia = String;
  nombreLinea = String;
  constructor(idLineaTransporte, idAgencia, nombreLinea) {
    this.idLineaTransporte = idLineaTransporte;
    this.idAgencia = idAgencia;
    this.nombreLinea = nombreLinea;
  }
}
