import { createStackNavigator } from "react-navigation-stack";
import LineTransportsScreen from "../screens/LineTransports/LineTransports";
import LineTransportScreen from "../screens/LineTransports/LineTransport";

const LineTrasportsStacks = createStackNavigator({
  LineTrasports: {
    screen: LineTransportsScreen,
    navigationOptions: () => ({
      title: "Lista de Lineas de trasporte",
    }),
  },
  LineTrasport: {
    screen: LineTransportScreen,
    navigationOptions: (props) => ({
      /* se extrae el nombre de los props */
      title:
        props.navigation.state.params.nombreLinea +
        " - " +
        props.navigation.state.params.nombreAgencia,
    }),
  },
});

export default LineTrasportsStacks;
