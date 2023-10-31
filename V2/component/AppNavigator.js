// AppNavigator.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Login from "../screens/Login";
import Compte from "../screens/Compte";
import Navbar from "./Navbar";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Récupérez le token stocké avec SecureStore
    const getToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token récupéré :", storedToken);
      }
    };
    getToken();
  }, []);

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
        {!token && (
          <Drawer.Screen
            name="Login"
            component={Login}
            options={() => ({
              header: (props) => <Navbar {...props} title="Login"></Navbar>,
            })}
          />
        )}
        {token && (
          <Drawer.Screen
            name="Compte"
            component={Compte}
            options={() => ({
              header: (props) => (
                <Navbar {...props} title="Mon Compte"></Navbar>
              ),
            })}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
