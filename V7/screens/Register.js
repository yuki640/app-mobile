import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../styles/AppStyles";

export default function Register() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setMail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [adrLivraison, setAdrLivraison] = useState("");
  const navigation = useNavigation();

  const showErrorAlert = (message) => {
    alert(message);
  };
  const handleRegister = async () => {
    // Vérifie la valeur de tout les champs et regarde s'il ne sont pas vide ou composées uniquement d'espaces
    if (
      !nom ||
      !adresse ||
      !cp ||
      !ville ||
      !telephone ||
      !email ||
      !motdepasse ||
      !adrLivraison
    ) {
      showErrorAlert("Veuillez remplir tous les champs qui possédent une *");
      return;
    }

    /*On appelle l'api pour vérifier les infos de connexion */
    try {
      const response = await fetch(
        "https://api.devroomservice.v70208.campus-centre.fr/Register",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom,
            adresse,
            cp,
            ville,
            telephone,
            motdepasse,
            mail: email,
            adrLivraison,
          }),
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
          `Erreur ${response.status}: Impossible de s'enregister sur le serveur.`,
        );
        return;
      }
      if (response.ok) {
        // //Redirection vers la page de l'accueil
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        showErrorAlert("Votre compte a été créer avec succés");
      }
    } catch (error) {
      console.error("Erreur liée à l'API :", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={GlobalStyles.containerLogin}
      extraScrollHeight={50}
      enableOnAndroid={false} // Désactivez pour Android, car la gestion du clavier est différente sur Android
      keyboardShouldPersistTaps="handled"
    >
      <Text style={GlobalStyles.titleLogin}> Écran d'inscription</Text>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre Nom"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setNom(val)}
          returnKeyType="done"
          maxLength={35}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre Adresse"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setAdresse(val)}
          returnKeyType="done"
          maxLength={100}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre code Postal"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setCodePostal(val)}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={5}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre Ville"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setVille(val)}
          returnKeyType="done"
          maxLength={35}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre Telephone"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setTelephone(val)}
          returnKeyType="done"
          maxLength={14}
          keyboardType="phone-pad"
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre email"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setMail(val)}
          returnKeyType="done"
          keyboardType="email-address"
          maxLength={100}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre mot de passe"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(val) => setMotdepasse(val)}
          keyboardType="visible-password"
          returnKeyType="done"
          maxLength={70}
        ></TextInput>
      </View>
      <View style={GlobalStyles.inputView}>
        <TextInput
          style={GlobalStyles.inputText}
          placeholder="Entrez votre Adresse de livraison"
          placeholderTextColor="#003f5c"
          onChangeText={(val) => setAdrLivraison(val)}
          returnKeyType="done"
          maxLength={100}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={handleRegister} style={GlobalStyles.loginBtn}>
        <Text style={GlobalStyles.text}>Inscription </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
