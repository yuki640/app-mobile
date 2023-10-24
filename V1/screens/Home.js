import React from "react";
import { Text, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";

export default function Home() {
  return (
    <View style={GlobalStyles.container}>
      <View>
        <Text style={GlobalStyles.text}>Ceci est la page d'accueil</Text>
      </View>
    </View>
  );
}
