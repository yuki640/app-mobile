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

export default function Panier() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const panierType = "panier";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Début de la récupération des données...");

        const storageKey = "data_product_" + panierType;
        const storedData = await AsyncStorage.getItem(storageKey);

        if (storedData !== null) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          console.log("Données récupérées depuis le stockage local.");
        } else {
          const response = await fetch("http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/lookPanier");
          const jsonData = await response.json();

          await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));
          console.log("Données récupérées depuis l'API et stockées dans AsyncStorage.");
          setData(jsonData);
        }

        setIsLoading(false); // Les données ont été chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
        // Ajoute des actions spécifiques en cas d'erreur, par exemple, afficher un message d'erreur à l'utilisateur.
      }
    };

    fetchData();
  }, [panierType]);

  function renderProfiles({ item }) {
    const binaryData = item.image?.data ?? [];
    const fileType = "image/jpeg";
    const base64String = base64.encode(
      String.fromCharCode(...new Uint8Array(binaryData)),
    );
    const imageUrl = `data:${fileType};base64,${base64String}`;
    return (
      <View style={GlobalStyles.item}>
        <Image
          source={{ uri: imageUrl }}
          style={GlobalStyles.image} // Ajoute un style pour la taille de l'image, etc.
        />
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
