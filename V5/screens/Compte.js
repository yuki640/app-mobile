import React, { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Compte() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setMail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [adrLivraison, setAdrLivraison] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // L'objet de navigation

  // Fonction pour récupérer les données de l'API
  const fetchDataApi = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        console.log("Token récupéré :", storedToken);
      }

      console.log("Début de la récupération des données depuis l'API");
      const newData = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/lookprofil?token=${storedToken}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log("Données récupérées avec succès depuis l'API");
      const jsonData = await newData.json();

      //console.log("Données à stocker dans AsyncStorage : ", jsonData);
      await AsyncStorage.setItem("data-compte", JSON.stringify(jsonData));

      console.log("Données stockées avec succès dans AsyncStorage");
      // Met à jour l'état de data avec les nouvelles données
      // console.log(
      //   "Mise à jour de l'état de data avec les nouvelles données : ",
      //   jsonData,
      // );
      setData(jsonData);
      setIsLoading(false); // Les données ont été chargées
    } catch (error) {
      // console.error("Erreur lors de la récupération des données", error);
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };
  // ...
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
      if (storedToken) {
        console.log("Token récupéré :", storedToken);
      }

      console.log("Début de la récupération des données depuis l'API");
      const newData = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/lookprofil?token=${storedToken}`,
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
      console.log("Données récupérées avec succès depuis l'API");
      const jsonData = await newData.json();

      console.log("Données stockées avec succès dans AsyncStorage");
      setData(jsonData);
      setIsLoading(false); // Les données ont été chargées
    } catch (error) {
      // console.error("Erreur lors de la récupération des données", error);
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };

  useEffect(() => {
    fetchDataApi(); // Charge les données depuis l'API
  }, []);

  function renderProfiles({ item }) {
    console.log("Données à afficher : ", item);
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
            value={item.nom}
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
            value={item.adresse}
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
            value={item.adrLivraison}
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
            value={item.cp}
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
            value={item.ville}
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
            value={item.telephone}
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
            value={item.mail}
            style={GlobalStyles.inputText}
            placeholder="Entrez votre email"
            placeholderTextColor="#003f5c"
            onChangeText={(val) => setMail(val)}
            returnKeyType="done"
            keyboardType="email-address"
            maxLength={100}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={removeToken} style={GlobalStyles.loginBtn}>
          <Text style={GlobalStyles.text}>Déconnexion </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={updateProfil} style={GlobalStyles.loginBtn}>
          <Text style={GlobalStyles.text}>Modifier mes informations </Text>
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
            onChangeText={(val) => setMotdepasse(val)}
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
            onChangeText={(val) => setMotdepasse(val)}
            keyboardType="visible-password"
            returnKeyType="done"
            maxLength={70}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={updateProfil} style={GlobalStyles.loginBtn}>
          <Text style={GlobalStyles.text}>Modifier mon mot de passe</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        <FlatList
          data={data}
          renderItem={renderProfiles}
          keyExtractor={(item) => item.codec}
        />
      ) : (
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
