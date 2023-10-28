// AppNavigator.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Login from "../screens/Login";
import Navbar from "./Navbar";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  const [token, setToken] = useState(null);
  function getLoginScreenOptions(token) {
    if (token) {
      return {
        header: (props) => (
          <Navbar {...props} title="Déconnexion" onLogoutPress={handleLogout} />
        ),
      };
    } else {
      return {
        header: (props) => <Navbar {...props} title="Login" />,
      };
    }
  }

  // Fonction pour supprimer le token
  async function removeToken() {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("Token supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du token :", error);
    }
  }
  // Utilisez cette fonction lorsque l'utilisateur appuie sur le bouton de déconnexion
  function handleLogout() {
    removeToken(); // Supprime le token
  }

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
          component={(props) => <Home {...props} token={token} />}
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
        <Drawer.Screen
          name="Login"
          component={Login}
          options={getLoginScreenOptions(token)}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
