import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

//importando los Stacks osea las ventanas al navegationStacks
import LineTrasportsScreenStack from "./LineTrasportsStacks";
import FavoriteScreenStacks from "./FavoriteStacks";
import MapScreenStacks from "./MapStacks";
import AccountScreenStacks from "./AccountStacks";

//se rellena el navigationStack con las ventanas
const NavigationStacks = createBottomTabNavigator(
  {
    LineTrasports: {
      screen: LineTrasportsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Lineas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="bus-side"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Favorite: {
      screen: FavoriteScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Favoritos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="heart-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Map: {
      screen: MapScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mapa",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="map-legend"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  // configurar movilidad Tab
  {
    initialRouteName: "Account", //donde inica el tab
    order: ["LineTrasports", "Favorite", "Map", "Account"], //orden de tabs
    tabBarOptions: {
      inactiveTintColor: "#646464", //color tabs inactivos
      activeTintColor: "#EF0B0B", // color tab activo
    },
  }
);

export default createAppContainer(NavigationStacks);
