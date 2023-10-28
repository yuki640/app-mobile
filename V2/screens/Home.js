import React from "react";
import { Text, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";

export default function Home(props) {
  const token = props.token;

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
