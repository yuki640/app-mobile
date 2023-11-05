import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Login from "../screens/Login";
import Compte from "../screens/Compte";
import Navbar from "./Navbar";
import FicheProduit from "../screens/FicheProduit";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
  function ProduitStack() {
    return (
      <Stack.Navigator initialRouteName={Produits}>
        <Stack.Screen name="Liste des Produits" component={Produits} />
        <Stack.Screen
          name="FicheProduit"
          component={FicheProduit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={() => ({
            header: (props) => <Navbar {...props} title="Accueil" />,
          })}
        />
        <Drawer.Screen
          name="Produits"
          component={ProduitStack}
          options={() => ({
            header: (props) => <Navbar {...props} title="Produits" />,
          })}
        />
        {!token && (
          <Drawer.Screen
            name="Login"
            component={Login}
            options={() => ({
              header: (props) => <Navbar {...props} title="Login" />,
            })}
          />
        )}
        {token && (
          <Drawer.Screen
            name="Compte"
            component={Compte}
            options={() => ({
              header: (props) => <Navbar {...props} title="Mon Compte" />,
            })}
          />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
