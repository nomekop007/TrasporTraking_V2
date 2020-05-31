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
}
