import { createStackNavigator } from "react-navigation-stack";
import FavoriteScreen from "../screens/Favorite";

const FavoriteScreenStacks = createStackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions: () => ({
      title: "Mis Trasportes Favoritos"
    })
  }
});

export default FavoriteScreenStacks;
