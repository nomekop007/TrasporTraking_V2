import { createStackNavigator } from "react-navigation-stack";
import LineTransportsScreen from "../screens/LineTransports/LineTransports";

const TrasportsScreenStack = createStackNavigator({
  LineTrasports: {
    screen: LineTransportsScreen,
    navigationOptions: () => ({
      title: "Lista de Lineas de trasporte",
    }),
  },
});

export default TrasportsScreenStack;
