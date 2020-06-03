import { Transporte } from "../model/Transporte";
const transporte = new Transporte();
const expect = global.expect;

describe("buscar Transporte", () => {
  test("debe buscar el Transporte mediatne su ID y retornar su informacion ", () => {
    const ID = "CVIGE8xKkLUy5Zkfy4vkLqOOKXb2";

    const respuesta = transporte.buscarTransporte(ID);
    console.log(respuesta);
  });
});
