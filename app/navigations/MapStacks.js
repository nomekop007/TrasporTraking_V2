import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "../screens/Map/Map";
import TransportScreen from "../screens/Map/Transport";

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
});

export default MapStacks;
