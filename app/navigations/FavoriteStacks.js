import { createStackNavigator } from "react-navigation-stack";
import FavoriteScreen from "../screens/Favorite/Favorites";

const FavoriteStacks = createStackNavigator({
  Favorite: {
    screen: FavoriteScreen,
    navigationOptions: () => ({
      title: "Mis Trasportes Favoritos",
    }),
  },
});

export default FavoriteStacks;
