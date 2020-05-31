export class Reclamo {
  idReclamo = String;
  idUsuario = String;
  idTransporte = String;
  fechaHora = Date;
  titulo = String;
  comentario = String;

  constructor(
    idReclamo,
    idUsuario,
    idTransporte,
    fechaHora,
    titulo,
    comentario
  ) {
    this.Reclamo = idReclamo;
    this.idUsuario = idUsuario;
    this.idTransporte = idTransporte;
    this.fechaHora = fechaHora;
    this.titulo = titulo;
    this.comentario = comentario;
  }
}
