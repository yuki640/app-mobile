import React, { useState } from "react";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../styles/AppStyles";

export default function Login() {
  const [email, setMail] = useState();
  const [motdepasse, setMotdepasse] = useState("");
  const navigation = useNavigation(); // Obtenez l'objet de navigation

  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const showErrorAlert = (message) => {
    alert(message);
  };
  const handleLogin = async () => {
    // Vérifiez si les valeurs de mail et motdepasse ne sont pas vides ou composées uniquement d'espaces
    if (!email || !motdepasse) {
      showErrorAlert("Veuillez remplir tous les champs.");
      return;
    }

    /*On appelle l'api pour vérifier les infos de connexion */
    try {
      const response = await fetch(
        "https://api.devroomservice.v70208.campus-centre.fr/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, motdepasse }),
        },
      );
      console.log("Code de réponse :", response.status);
      if (response.status === 401) {
        const errorData = await response.json();
        showErrorAlert(`${errorData.message}`);
        return;
      }
      if (response.status === 500) {
        showErrorAlert(
          `Erreur ${response.status}: Impossible de se connecter au serveur.`,
        );
        return;
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data.token);
        // Vérifiez d'abord si data.token est défini
        if (data.token) {
          // Stockez le token dans le SecureStorage
          await saveToken("token", data.token);
          // //Redirection vers la page qu'on souhaite
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          showErrorAlert("Erreur : Le token reçu de l'API est invalide.");
        }
      }
    } catch (error) {
      console.error("Erreur liée à l'API :", error);
    }
  };

  return (
    <View style={GlobalStyles.containerLogin}>
      <Text style={GlobalStyles.titleLogin}> Écran de connexion</Text>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre email"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setMail(val)}
          returnKeyType="done"
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre mot de passe"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(val) => setMotdepasse(val)}
          returnKeyType="done"
        ></TextInput>
      </View>
      <TouchableOpacity onPress={handleLogin} style={GlobalStyles.loginBtn}>
        <Text style={GlobalStyles.text}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Pas de compte ? Enregistrez-vous </Text>
      </TouchableOpacity>
    </View>
  );
}
