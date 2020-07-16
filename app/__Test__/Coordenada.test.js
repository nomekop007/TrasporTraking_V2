import { Coordenada } from "../model/Coordenada.js";
const coordenada = new Coordenada();
const expect = global.expect;

describe("ver todas las coordenadas", () => {
  test("retorna todas las coordenadas que existen en la base de datos", async () => {
    const Transportes = [
      "CVIGE8xKkLUy5Zkfy4vkLqOOKXb2",
      "ezwJugIEOVWCPprQfvNEvSJGnYv2",
    ];

    const promise = await coordenada.buscarTodasLasCoordenadas();

    if (promise === undefined) {
      expect(promise).toBeUndefined();
    } else {
      const coordenadas = promise.val();
      console.log(coordenadas);

      var cont = 0;
      for (const id in coordenadas) {
        expect(id).toEqual(Transportes[cont]);
        cont++;
      }
    }
  });
});
