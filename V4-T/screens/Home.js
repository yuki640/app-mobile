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
        console.log("Token récupéré :", storedToken);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
    }
  };



  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Bienvenue sur l'application</Text>
      <Text style={GlobalStyles.title}>DevRoomService</Text>
    </View>
  );
}
