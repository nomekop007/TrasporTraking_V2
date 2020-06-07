import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { LineaTransporte } from "../../model/LineaTransporte";
import RenderLinesTransport from "../../components/LineTransports/RenderLines";
const Lines = new LineaTransporte();

export default function LineTransports(props) {
  const { navigation } = props;
  const [LineTransports, setLineTransports] = useState([]);
  const [totalTransport, setTotalTransport] = useState(0);
  const [StartLines, setStartLines] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Lines.CantidadLineasTransportes().then((size) => {
      setTotalTransport(size);
    });

    const promise = Lines.BuscarPrimerasLineasTransportes();
    promise.then((lines) => {
      const resultLines = [];
      setStartLines(lines.docs[lines.docs.length - 1]);
      lines.forEach((doc) => {
        const LineTransport = doc.data();
        resultLines.push(LineTransport);
      });
      setLineTransports(resultLines);
    });
  }, []);

  /* cargar mas lineas de transportes */
  const handleLoadMore = () => {
    LineTransports.length < totalTransport && setIsLoading(true);
    const promise = Lines.CargarMasLineasTransportes(
      StartLines.data().idLineaTransporte
    );
    promise.then((lines) => {
      const resultLines = [];

      if (lines.docs.length > 0) {
        setStartLines(lines.docs[lines.docs.length - 1]);
      } else {
        setIsLoading(false);
      }
      lines.forEach((doc) => {
        const LineTransport = doc.data();
        resultLines.push(LineTransport);
      });

      setLineTransports([...LineTransports, ...resultLines]);
    });
  };

  return (
    <View>
      <RenderLinesTransport
        navigation={navigation}
        LineTransports={LineTransports}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
}
