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
import * as SecureStore from "expo-secure-store";

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const produitType = route.params?.produitType;
  let jsonData;

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
          jsonData = await newData.json();
          console.log(jsonData);
          const storageKey = "data_product_" + produitType;
          await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));
          console.log("Données stockées avec succès dans AsyncStorage");
          setData(jsonData);
        }

        setIsLoading(false); // Les données ont été chargées
      } catch (error) {
        if (jsonData !== "undefined") {
          console.log("Aucune data a afficher");
        } else {
          console.error("Erreur lors de la récupération des données", error);
        }
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
      }
    };

    const fetchDataLocal = async () => {
      try {
        console.log("Début de la récupération des données locales");
        const storageKey = "data_product_" + produitType;
        const storedData = await SecureStore.getItemAsync(storageKey);

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
    console.log(item.image);
    return (
      <Pressable
        onPress={() => navigation.navigate("FicheProduit", { item: item })}
      >
        <View style={GlobalStyles.item}>
          {/*<Text style={GlobalStyles.title}>{item.reference}</Text>*/}
          <Text style={GlobalStyles.text}>{item.designation}</Text>
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{ width: 300, height: 200 }}
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
          style={{ marginTop: 20 }}
        />
      ) : (
        <Text>Aucune Produit a afficher disponible.</Text>
      )}
    </View>
  );
}
