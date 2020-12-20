import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "../screens/Map/Map";
import TransportScreen from "../screens/Map/Transport";
import ReclamoScreen from '../screens/Map/ReclamoForm'

const MapStacks = createStackNavigator({
  Map: {
    screen: MapScreen,
    navigationOptions: () => ({
      title: "Mapa de Busqueda",
    }),
  },
  Transport: {
    screen: TransportScreen,
    navigationOptions: () => ({
      title: "Transporte",
    }),
  },
  Reclamo: {
    screen: ReclamoScreen,
    navigationOptions: () => ({
      title: "Formulario de reclamos",
    }),
  }
});

export default MapStacks;
