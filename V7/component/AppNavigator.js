import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons"; // Importez les icônes nécessaires

import Home from "../screens/Home";
import Produits from "../screens/Produits";
import Login from "../screens/Login";
import Compte from "../screens/Compte";
import Profil from "../screens/Profil";
import FicheProduit from "../screens/FicheProduit";
import Panier from "../screens/Panier";
import Register from "../screens/Register";
import { AuthContext } from "./AuthContext";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

let iconName;

function AppNavigator() {
  const { isLoggedIn, signIn } = useContext(AuthContext); // Use the AuthContexts

  const RetrieveToken = async () => {
    const storedToken = await SecureStore.getItemAsync("token");
    if (storedToken) {
      signIn();
    }
  };
  useEffect(() => {
    async function prepare() {
      await RetrieveToken();
    }
    prepare();
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
  function VueCompte() {
    return (
      <Stack.Navigator initialRouteName={Compte}>
        <Stack.Screen
          name="Compte"
          component={Compte}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profil"
          component={Profil}
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
              iconName = "search1";
            } else if (route.name === "Panier") {
              iconName = "shoppingcart";
            } else if (route.name === "Connexion") {
              iconName = "login";
            } else if (route.name === "Mon Compte") {
              iconName = "user";
            }

            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeTous} />
        <Tab.Screen name="Produits" component={ProduitsTous} />
        <Tab.Screen name="Panier" component={Panier} />
        {isLoggedIn ? (
          <Tab.Screen name="Mon Compte" component={VueCompte} />
        ) : (
          <Tab.Screen name="Connexion" component={Connexion} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;