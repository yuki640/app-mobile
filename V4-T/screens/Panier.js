import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

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
  const removeToCart = async (token, codepa) => {
    console.log(token);
    try {
      const response = await fetch(
        `https://api.devroomservice.v70208.campus-centre.fr/deletePanier`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, codepa: codepa }),
        },
      );

      if (response.ok) {
        // Le code de statut est dans la plage 200
        const responseData = await response.json();
        console.log("Succès :", responseData.message);

        // mise à jour de l'état data pour exclure l'élément supprimé
        setData((prevData) =>
          prevData.filter((item) => item.codepa !== codepa),
        );
      } else if (response.status === 404) {
        console.log(response.status, "Élément du panier introuvable.");
      } else {
        console.log(
          response.status,
          "Erreur lors de la suppression de l'élément du panier.",
        );
      }
    } catch (error) {
      console.error(
        response.status,
        "Erreur lors de la suppression de l'article du panier",
        error,
      );
    }
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

    const fetchDataOnFocus = async () => {
      await fetchDataApi();
    };

    const unsubscribeFocus = navigation.addListener("focus", fetchDataOnFocus);

    // Nettoyez l'écouteur lors du démontage du composant
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]); // Assurez-vous d'inclure navigation dans les dépendances si vous utilisez useEffect

  function renderProfiles({ item }) {
    console.log(item);
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
          <TextInput style={StyleFiche.quantityInput}>
            {item.quantite}
          </TextInput>
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={() => addToCart(item, "increment")}
          >
            <Text style={StyleFiche.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={() => removeToCart("", item.codepa)}
          >
            <Text style={StyleFiche.buttonText}>Supprimer du panier</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      {data && data.length > 0 && (
        <TouchableOpacity
          style={StyleFiche.addToCartButton}
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            await removeToCart(token, "");
            setData([]); // Supprime toutes les données du panier
          }}
        >
          <Text style={StyleFiche.buttonText}>Vider le panier</Text>
          <FontAwesome5 name="cart-plus" size={20} color="#ffffff" />
        </TouchableOpacity>
      )}

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
    </View>
  );
}
