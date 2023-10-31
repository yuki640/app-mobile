import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";

export default function Compte() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les données de l'API
  const fetchDataApi = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        console.log("Token récupéré :", storedToken);
      }

      console.log("Début de la récupération des données depuis l'API");
      const newData = await fetch(
        `http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/lookprofil?token=${storedToken}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log("Données récupérées avec succès depuis l'API");
      const jsonData = await newData.json();

      console.log("Données à stocker dans AsyncStorage : ", jsonData);
      await AsyncStorage.setItem("data-compte", JSON.stringify(jsonData));

      console.log("Données stockées avec succès dans AsyncStorage");
      // Met à jour l'état de data avec les nouvelles données
      console.log(
        "Mise à jour de l'état de data avec les nouvelles données : ",
        jsonData,
      );
      setData(jsonData);
      setIsLoading(false); // Les données ont été chargées
    } catch (error) {
      // console.error("Erreur lors de la récupération des données", error);
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };
  // ...

  const fetchDataLocal = async () => {
    try {
      console.log("Début de la récupération des données locales");
      const storedData = await AsyncStorage.getItem("data-compte");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData); // Désérialisez les données
        console.log(
          "Données récupérées avec succès depuis AsyncStorage : ",
          parsedData,
        ); // Ajoutez cette ligne
        setData(parsedData);
        setIsLoading(false); // Les données ont été chargées depuis le stockage local
      } else {
        console.log("Aucune donnée trouvée dans AsyncStorage.");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };

  useEffect(() => {
    fetchDataLocal(); // Vérifie si des données sont déjà stockées localement
    fetchDataApi(); // Charge les données depuis l'API
  }, []);

  function renderProfiles({ item }) {
    console.log("Données à afficher : ", item);
    return (
      <View style={GlobalStyles.profileCard}>
        <Text style={GlobalStyles.title}>{item.nom}</Text>
        <Text style={GlobalStyles.textCompte}></Text>
        <Text style={GlobalStyles.textCompte}>Code client: {item.codec}</Text>
        <Text style={GlobalStyles.textCompte}>Adresse: {item.adresse}</Text>
        <Text style={GlobalStyles.textCompte}>Ville : {item.ville}</Text>
        <Text style={GlobalStyles.textCompte}>
          Telephone : {item.telephone}
        </Text>
        <Text style={GlobalStyles.textCompte}>Mail : {item.mail}</Text>
        <Text style={GlobalStyles.textCompte}>
          adresse de livraison : {item.adrLivraison}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data && data.length > 0 ? (
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
