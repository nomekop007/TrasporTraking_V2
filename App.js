import React from "react";
import Navigation from "./app/navigations/Navigation";
import ignoreWarnings from "react-native-ignore-warnings";
//redux
import { Provider } from "react-redux";
import store from "./app/redux/store";

export default function App() {
  /* quitar advertencias */
  ignoreWarnings("Setting a timer");
  ignoreWarnings("Warning: componentWillReceiveProps");
  ignoreWarnings("Warning: componentWillMount");
  ignoreWarnings("VirtualizedLists should never");

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

//rama redux
