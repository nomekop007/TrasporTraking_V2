export class Coordenada {
  idTransporte = String;
  longitud = Number;
  latitud = Number;
  constructor(idTransporte, longitud, latitud) {
    this.idTransporte = idTransporte;
    this.longitud = longitud;
    this.latitud = latitud;
  }
}
