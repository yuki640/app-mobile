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

  const addToCart = (item) => {
    //console.log(`Ajouté au panier : ${item.quantite} x ${item.designation}`);
  };

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchDataApi = async () => {
      try {
        const Token = await SecureStore.getItemAsync("token");
        // if (!Token) {
        //   navigation.navigate("Login");
        //  }(
        console.log("Début de la récupération des données depuis l'API");

        const newData = await fetch(
          `http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/lookPanier?token=${Token}`,
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
    console.log(item);
    return (
      <View style={GlobalStyles.item}>
        <Text style={GlobalStyles.title}>{item.designation}</Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{ width: 300, height: 200 }}
          />
        )}
        <TouchableOpacity
          style={StyleFiche.addToCartButton}
          onPress={addToCart}
        >
          <Text style={StyleFiche.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>{item.quantite}</Text>
        <TouchableOpacity
          style={StyleFiche.addToCartButton}
          onPress={addToCart({ item })}
        >
          <Text style={StyleFiche.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={GlobalStyles.text}>{item.total_prix}€</Text>
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
