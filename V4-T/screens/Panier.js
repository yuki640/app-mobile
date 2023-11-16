import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (item, operation) => {
    const updatedData = data.map((product) => {
      if (product.reference === item.reference) {
        product.quantite =
          operation === "increment"
            ? product.quantite + 1
            : Math.max(product.quantite - 1, 0);
      }
      return product;
    });

    setData(updatedData);
  };

  useEffect(() => {
    const fetchDataApi = async () => {
      try {
        const Token = await SecureStore.getItemAsync("token");

        console.log("Début de la récupération des données depuis l'API");

        const newData = await fetch(
          `https://api.devroomservice.v70208.campus-centre.fr/lookPanier?token=${Token}`,
          {
            method: "GET",
          },
        );

        console.log("Données récupérées avec succès depuis l'API");

        const jsonData = await newData.json();
        const storageKey = "data_product_panier";

        await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));

        console.log("Données stockées avec succès dans AsyncStorage");
        setData(jsonData);
        setIsLoading(false); // Les données ont été chargées
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
        setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
      }
    };

    fetchDataApi(); // Charge les données depuis l'API
  }, []);

  function renderProfiles({ item }) {
    return (
      <View style={[GlobalStyles.itemContainer, StyleFiche.itemContainer]}>
        <Image source={{ uri: item.image }} style={StyleFiche.productImage} />
        <View style={StyleFiche.productInfoContainer}>
          <Text style={GlobalStyles.title}>{item.designation}</Text>
          <Text style={GlobalStyles.text}>{item.total_prix}€</Text>
        </View>
        <View style={StyleFiche.buttonContainer}>
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={() => addToCart(item, "decrement")}
          >
            <Text style={StyleFiche.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={StyleFiche.quantityText}>{item.quantite}</Text>
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={() => addToCart(item, "increment")}
          >
            <Text style={StyleFiche.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderProfiles}
          keyExtractor={(item) => item.reference.toString()}
        />
      ) : (
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
