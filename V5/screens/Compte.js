import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchDataApi(); // Charge les données depuis l'API
    if (data.length > 0) {
      setMailActuel(data[0].mail); // Mise à jour de l'état après le rendu initial
      setCodec(data[0].codec);
    }
  }, [data]);

  const fetchDataApi = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");

      if (!storedToken) {
        console.log("Le token n'a pas été trouvé.");
        setLoading(false);
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
        setLoading(false);
        return;
      }

      const jsonData = await response.json();
      await AsyncStorage.setItem("data-compte", JSON.stringify(jsonData));
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setLoading(false);
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
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };

  const updateMotDePasse = async () => {
    // Implémentez la mise à jour du mot de passe ici
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
            defaultValue={data[0].nom}
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
            defaultValue={data[0].adresse}
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
            defaultValue={data[0].adrLivraison}
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
            defaultValue={data[0].cp}
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
            defaultValue={data[0].ville}
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
            defaultValue={data[0].telephone}
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
            defaultValue={data[0].mail}
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
