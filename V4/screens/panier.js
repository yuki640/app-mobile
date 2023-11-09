import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/AppStyles";
import { useNavigation } from "@react-navigation/native";
import base64 from "base-64";

export default function panier() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const panierType = "panier";

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchDataApi = async () => {
      try {
        console.log("Début de la récupération des données depuis l'API");
        

          const newData = await fetch("http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/panier");
          console.log("Données récupérées avec succès depuis l'API");
          const jsonData = await newData.json();
          const storageKey = "data_product_" + panierType;

          await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));
          console.log("Données stockées avec succès dans AsyncStorage");
          setData(jsonData);
        

        setIsLoading(false); // Les données ont été chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
      }
    };

    const fetchDataLocal = async () => {
      try {
        console.log("Début de la récupération des données locales");
        const storageKey = "data_product_" + panierType;
        const storedData = await AsyncStorage.getItem(storageKey);

        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        }

        setIsLoading(false); // Les données ont été chargées depuis le stockage local
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données locales",
          error,
        );
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
      }
    };

    fetchDataLocal(); // Vérifie si des données sont déjà stockées localement
    fetchDataApi(); // Charge les données depuis l'API
  }, [panierType]);

  function renderProfiles({ item }) {
    // Supposez que item.image.data contienne les données binaires de l'image
    const binaryData = item.image?.data ?? [];

    const fileType = "image/jpeg";
    // Encodez les données binaires en base64
    const base64String = base64.encode(
      String.fromCharCode(...new Uint8Array(binaryData)),
    );
    // Créez l'URL de données avec le format correct
    const imageUrl = `data:${fileType};base64,${base64String}`;
    return (
      
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.title}>{item.reference}</Text>
          <Text style={GlobalStyles.text}>{item.designation}</Text>
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
          keyExtractor={(item) => item.reference}
        />
      ) : (
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
