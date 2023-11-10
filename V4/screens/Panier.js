import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const produitType = route.params?.produitType;
  const [quantity, setQuantity] = useState("1");

  const addToCart = () => {
    console.log(`Ajouté au panier : ${quantity} x ${designation}`);
  };

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchDataApi = async () => {
      try {
        const Token = await SecureStore.getItemAsync("token");
        if (!Token) {
          navigation.navigate("Login");
        }
        console.log("Début de la récupération des données depuis l'API");

        const newData = await fetch(
          `http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/lookPanier?token=${Token}`,
          {
            method: "GET",
          },
        );
        console.log("Données récupérées avec succès depuis l'API");
        const jsonData = await newData.json();
        const storageKey = "data_product_" + produitType;

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
    console.log(item);
    return (
      <Pressable
        onPress={() => navigation.navigate("FicheProduit", { item: item })}
      >
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
            <Text style={StyleFiche.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput></TextInput>
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={addToCart}
          >
            <Text style={StyleFiche.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={GlobalStyles.text}>{item.total_prix}€</Text>
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
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
