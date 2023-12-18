import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Compte() {
  const [data, setData] = useState([]);
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setMail] = useState("");
  const [emailActuel, setMailActuel] = useState("");
  const [Oldmotdepasse, setOldMotdepasse] = useState("");
  const [Newmotdepasse, setNewMotdepasse] = useState("");
  const [codec, setCodec] = useState("");
  const [adrLivraison, setAdrLivraison] = useState("");
  const navigation = useNavigation(); // L'objet de navigation
  const showErrorAlert = (message) => {
    alert(message);
  };
  const isNotEmpty = (value) => {
    return value.trim() !== ""; // Vérifie que la chaîne après suppression des espaces n'est pas vide
  };

  useEffect(() => {
    fetchDataApi(); // Charge les données depuis l'API
  }, []); // Pas de dépendances

  useEffect(() => {
    if (data.length > 0) {
      setNom(data[0].nom); // Mise à jour de l'état après le rendu initial
      setAdresse(data[0].adresse);
      setCodePostal(data[0].cp);
      setVille(data[0].ville);
      setTelephone(data[0].telephone);
      setMail(data[0].mail);
      setMailActuel(data[0].mail);
      setCodec(data[0].codec);
      setAdrLivraison(data[0].adrLivraison);
    }
  }, [data]);

  const fetchDataApi = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        console.log("Le token n'a pas été trouvé.");
        return;
      }
      const response = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/lookprofil?token=${storedToken}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        console.log(
          "Erreur lors de la récupération des données :",
          response.status,
        );
        return;
      }

      const jsonData = await response.json();
      await AsyncStorage.setItem("data-compte", JSON.stringify(jsonData));
      setData(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const removeToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken) {
        await SecureStore.deleteItemAsync("token");
        console.log("Token supprimé avec succès");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        console.log("Le token n'a pas été trouvé.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du token :", error);
    }
  };

  const updateProfil = async () => {
    // Vérification que les champs sont remplis et sans espaces
    if (
      !isNotEmpty(nom) ||
      !isNotEmpty(adresse) ||
      !isNotEmpty(cp) ||
      !isNotEmpty(ville) ||
      !isNotEmpty(telephone) ||
      !isNotEmpty(email) ||
      !isNotEmpty(adrLivraison)
    ) {
      showErrorAlert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        console.log("Le token n'a pas été trouvé.");
        return;
      }

      const response = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/updateprofil`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: nom,
            adresse: adresse,
            cp: cp,
            ville: ville,
            telephone: telephone,
            mail: email,
            mailActuel: emailActuel,
            codec: codec,
            adrLivraison: adrLivraison,
          }),
        },
      );

      if (!response.ok) {
        console.log(
          "Erreur lors de la mise à jour du profil :",
          response.status,
        );
        return;
      } else {
        showErrorAlert("Vos informations ont bien été modifiée");
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  const updateMotDePasse = async () => {
    // Vérification de la non-vacuité et non-espacement des champs
    if (!isNotEmpty(Oldmotdepasse) || !isNotEmpty(Newmotdepasse)) {
      showErrorAlert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        console.log("Le token n'a pas été trouvé.");
        return;
      }

      const response = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/updatemotdepasse`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            codec: codec,
            oldMotDePasse: Oldmotdepasse,
            newMotDePasse: Newmotdepasse,
          }),
        },
      );

      if (!response.ok) {
        showErrorAlert(
          "Erreur lors de la mise à jour du profil :",
          response.status,
        );
      } else {
        showErrorAlert("Vos informations ont bien été modifiée");
      }
    } catch (error) {
      showErrorAlert("Erreur lors de la mise à jour du profil :", error);
    }
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        contentContainerStyle={GlobalStyles.containerLogin}
        extraScrollHeight={50}
        enableOnAndroid={false} // Désactivez pour Android, car la gestion du clavier est différente sur Android
        keyboardShouldPersistTaps="handled"
      >
        <Text style={GlobalStyles.titleLogin}> Écran d'inscription</Text>
        <View style={GlobalStyles.inputView}>
          <TextInput
            defaultValue={nom}
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
            defaultValue={adresse}
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
            defaultValue={adrLivraison}
            style={GlobalStyles.inputText}
            placeholder="Entrez votre Adresse de livraison"
            placeholderTextColor="#003f5c"
            onChangeText={(val) => setAdrLivraison(val)}
            returnKeyType="done"
            maxLength={100}
          ></TextInput>
        </View>
        <View style={GlobalStyles.inputView}>
          <TextInput
            defaultValue={cp}
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
            defaultValue={ville}
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
            defaultValue={telephone}
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
            defaultValue={email}
            style={GlobalStyles.inputText}
            placeholder="Entrez votre email"
            placeholderTextColor="#003f5c"
            onChangeText={(val) => setMail(val)}
            returnKeyType="done"
            keyboardType="email-address"
            maxLength={100}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={updateProfil} style={GlobalStyles.loginBtn}>
          <Text style={GlobalStyles.text}>Modifier mes informations </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeToken} style={GlobalStyles.loginBtn}>
          <Text style={GlobalStyles.text}>Déconnexion </Text>
        </TouchableOpacity>
        <View>
          <Text></Text>
        </View>
        <View style={GlobalStyles.inputView}>
          <TextInput
            style={GlobalStyles.inputText}
            placeholder="Entrez votre mot de passe actuel"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(val) => setOldMotdepasse(val)}
            keyboardType="visible-password"
            returnKeyType="done"
            maxLength={70}
          ></TextInput>
        </View>
        <View style={GlobalStyles.inputView}>
          <TextInput
            style={GlobalStyles.inputText}
            placeholder="Entrez votre nouveau mot de passe"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(val) => setNewMotdepasse(val)}
            keyboardType="visible-password"
            returnKeyType="done"
            maxLength={70}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={updateMotDePasse}
          style={GlobalStyles.loginBtn}
        >
          <Text style={GlobalStyles.text}>Modifier mon mot de passe</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
