import { createStackNavigator } from "react-navigation-stack";
//ventanas adicionales
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const MyAccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "mi cuenta",
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Iniciar Sesion",
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registrar Cuenta",
    }),
  },
});

export default MyAccountScreenStacks;
