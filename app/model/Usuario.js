export class Usuario {
  idUsuario = String;
  nombreUsuario = String;
  urlFoto = String;

  constructor(idUsuario, nombreUsuario, urlFoto) {
    this.idUsuario = idUsuario;
    this.nombreUsuario = nombreUsuario;
    this.urlFoto = urlFoto;
  }
}
