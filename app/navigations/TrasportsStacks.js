import { createStackNavigator } from "react-navigation-stack";
import TrasportsScreen from "../screens/Trasports";

const TrasportsScreenStack = createStackNavigator({
  Trasports: {
    screen: TrasportsScreen,
    navigationOptions: () => ({
      title: "Lista de trasportes"
    })
  }
});

export default TrasportsScreenStack;
