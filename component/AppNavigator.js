// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Navbar from "./Navbar";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={() => ({
            header: (props) => <Navbar {...props} title="Accueil"></Navbar>,
          })}
        />
        <Drawer.Screen
          name="Produits"
          component={Produits}
          options={() => ({
            header: (props) => <Navbar {...props} title="Produits"></Navbar>,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
