import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons"; // Importez les icônes nécessaires

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Login from "../screens/Login";
import Compte from "../screens/Compte";
import Navbar from "./Navbar";
import FicheProduit from "../screens/FicheProduit";
import Panier from "../screens/Panier";
import Register from "../screens/Register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let iconName;

function AppNavigator() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token récupéré :", storedToken);
      }
    };
    getToken();
  }, []);

  function ProduitsTous() {
    return (
      <Stack.Navigator initialRouteName={Produits}>
        <Stack.Screen
          name="Liste des Produits"
          component={Produits}
          initialParams={{ produitType: "Tous" }}
        />
        <Stack.Screen name="FicheProduit" component={FicheProduit} />
      </Stack.Navigator>
    );
  }
  function Connexion() {
    return (
      <Stack.Navigator initialRouteName={Login}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Produits") {
              // icon de loupe pour la recherche
              iconName = "search1"; // Remplacez par l'icône souhaitée
            } else if (route.name === "Panier") {
              iconName = "shoppingcart"; // Remplacez par l'icône souhaitée
            } else if (route.name === "Connexion") {
              iconName = "login"; // Remplacez par l'icône souhaitée
            } else if (route.name === "Compte") {
              iconName = "user"; // Remplacez par l'icône souhaitée
            }

            // Retourne l'icône correspondante
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={() => ({
            header: (props) => <Navbar {...props} title="Accueil" />,
          })}
        />
        <Tab.Screen
          name="Produits"
          component={ProduitsTous}
          options={() => ({
            header: (props) => <Navbar {...props} title="Produits" />,
          })}
        />
        <Tab.Screen
          name="Panier"
          component={Panier}
          options={() => ({
            header: (props) => <Navbar {...props} title="Panier" />,
          })}
        />
        {!token && (
          <Tab.Screen
            name="Connexion"
            component={Connexion}
            options={() => ({
              header: (props) => <Navbar {...props} title="Connexion" />,
            })}
          />
        )}
        {token && (
          <Tab.Screen
            name="Compte"
            component={Compte}
            options={() => ({
              header: (props) => <Navbar {...props} title="Mon Compte" />,
            })}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
