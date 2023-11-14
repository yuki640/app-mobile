import React, { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";

export default function Home() {
  const [token, setToken] = useState(null);

  // Fonction pour récupérer le token depuis SecureStore
  const getToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token récupéré page HOME :", storedToken);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <View>
        <Text style={GlobalStyles.text}>Ceci est la page d'accueil</Text>
      </View>
      <View>
        <Text style={GlobalStyles.text}>
          {token
            ? "Vous êtes connecté avec un token."
            : "Vous n'êtes pas connecté. Veuillez vous connecter."}
        </Text>
      </View>
    </View>
  );
}
