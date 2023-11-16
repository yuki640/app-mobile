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
import FicheProduit from "../screens/FicheProduit";
import Panier from "../screens/Panier";
import Register from "../screens/Register";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let iconName;

function AppNavigator() {
  const [token, setToken] = useState(" ");

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token récupéré AppNavigator:", storedToken);
      } else {
        console.log("Le token est setté a blanc : ");
        setToken(" ");
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FicheProduit"
          component={FicheProduit}
          options={{
            headerTintColor: "blue", // Change la couleur des éléments de l'en-tête (titre, boutons)
          }}
        />
      </Stack.Navigator>
    );
  }
  function HomeTous() {
    return (
      <Stack.Navigator initialRouteName={Home}>
        <Stack.Screen
          name="Accueil"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FicheProduit"
          component={FicheProduit}
          options={{
            headerTintColor: "blue", // Change la couleur des éléments de l'en-tête (titre, boutons)
          }}
        />
      </Stack.Navigator>
    );
  }
  function Connexion() {
    return (
      <Stack.Navigator initialRouteName={Login}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTintColor: "blue", // Change la couleur des éléments de l'en-tête (titre, boutons)
          }}
        />
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
<<<<<<< HEAD
        <Tab.Screen
          name="Home"
          component={HomeTous}
        />
        <Tab.Screen
          name="Produits"
          component={ProduitsTous}
        />
        <Tab.Screen
          name="Panier"
          component={Panier}
        />
        {token.length === 1 && (
          <Tab.Screen
            name="Connexion"
            component={Connexion}
          />
        )}
        {token.length > 1 && (
          <Tab.Screen
            name="Compte"
            component={Compte}
          />
=======
        <Tab.Screen name="Home" component={HomeTous} />
        <Tab.Screen name="Produits" component={ProduitsTous} />
        <Tab.Screen name="Panier" component={Panier} />
        {token.length === 1 && (
          <Tab.Screen name="Connexion" component={Connexion} />
>>>>>>> origin/Thomas
        )}
        {token.length > 1 && <Tab.Screen name="Compte" component={Compte} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
