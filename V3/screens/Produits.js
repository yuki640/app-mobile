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

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const produitType = route.params?.produitType;

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchDataApi = async () => {
      try {
        console.log("Début de la récupération des données depuis l'API");
        let apiEndpoint = "";

        if (produitType === "Tous") {
          apiEndpoint =
            "http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/products";
        } else if (produitType === "New") {
          apiEndpoint =
            "http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/new_products";
        } else if (produitType === "Promo") {
          apiEndpoint =
            "http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/liste_promo";
        }

        if (apiEndpoint) {
          const newData = await fetch(apiEndpoint);
          console.log("Données récupérées avec succès depuis l'API");
          const jsonData = await newData.json();
          const storageKey = "data_product_" + produitType;

          await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));
          console.log("Données stockées avec succès dans AsyncStorage");
          setData(jsonData);
        }

        setIsLoading(false); // Les données ont été chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
      }
    };

    const fetchDataLocal = async () => {
      try {
        console.log("Début de la récupération des données locales");
        const storageKey = "data_product_" + produitType;
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
  }, [produitType]);

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
      <Pressable
        onPress={() => navigation.navigate("FicheProduit", { item: item })}
      >
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.title}>{item.reference}</Text>
          <Text style={GlobalStyles.text}>{item.designation}</Text>
          {item.image && (
            <Image
              source={{ uri: imageUrl }} // Utilisez une extension par défaut, par exemple, JPG
              style={{ width: 200, height: 200 }} // Ajustez la taille selon vos besoins
            />
          )}
        </View>
      </Pressable>
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
          initialNumToRender={10} // Limite le nombre d'éléments affichés initialement à 10
          onEndReachedThreshold={0.1} // Charge plus d'éléments lorsque vous atteignez les 10% restants
        />
      ) : (
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
