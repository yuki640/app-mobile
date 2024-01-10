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
import { Picker } from "@react-native-picker/picker";

export default function Produits() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [produitType, setProduitType] = useState("Tous");
  const [prevProduitType, setPrevProduitType] = useState("");

  useEffect(() => {
    handleChoose();
  }, [produitType]);
  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  async function fetchDataApi() {
    try {
      console.log("Début de la récupération des données depuis l'API");
      let apiEndpoint = "";

      if (produitType === "Tous") {
        apiEndpoint =
          "https://api.devroomservice.v70208.campus-centre.fr/products";
      } else if (produitType === "New") {
        apiEndpoint =
          "https://api.devroomservice.v70208.campus-centre.fr/newProducts";
      } else if (produitType === "Promo") {
        apiEndpoint =
          "https://api.devroomservice.v70208.campus-centre.fr/listePromo";
      }
      console.log("api", apiEndpoint);
      if (apiEndpoint) {
        let newData = await fetch(apiEndpoint);
        console.log("Données récupérées avec succès depuis l'API");

        let jsonData = "";
        jsonData = await newData.json();
        console.log("type produit", produitType);
        // Vérifier si le tableau jsonData est vide
        if (Array.isArray(jsonData) && jsonData.length === 0) {
          console.log("Aucune donnée récupérée depuis l'API");
          setData([]);
          return; // Sortir de la fonction sans mettre à jour l'état ou le stockage local
        }

        let storageKey = "data_product_" + produitType;
        await AsyncStorage.setItem(storageKey, JSON.stringify(jsonData));
        console.log("Données stockées avec succès dans AsyncStorage");
        setData(jsonData);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données depuis l'API",
        error,
      );
      throw error;
    }
  }

  async function fetchDataLocal() {
    try {
      console.log("Début de la récupération des données locales");
      let storageKey = "data_product_" + produitType;
      let storedData = await SecureStore.getItemAsync(storageKey);

      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);

        // Vérifier si le tableau parsedData est vide
        if (Array.isArray(parsedData) && parsedData.length === 0) {
          console.log("Aucune donnée récupérée depuis le stockage local");
          // Réinitialiser l'état data à un tableau vide
          setData([]);
          return; // Sortir de la fonction sans mettre à jour l'état
        }

        setData(parsedData);
        console.log("Données récupérées avec succès depuis le stockage local");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données locales",
        error,
      );
      throw error;
    }
  }

  async function handleChoose() {
    try {
      setIsLoading(true);
      await fetchDataLocal();

      // Vérifier si la valeur du Picker a changé depuis la dernière fois
      if (produitType !== prevProduitType) {
        await fetchDataApi();
        // Mettre à jour la valeur précédente du Picker
        setPrevProduitType(produitType);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      setIsLoading(false);
    }
  }

  function renderProfiles({ item }) {
    return (
      <Pressable
        onPress={() => navigation.navigate("FicheProduit", { item: item })}
      >
        <View style={GlobalStyles.item}>
          <Text style={GlobalStyles.text}>{item.designation}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={GlobalStyles.image} />
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
        <View style={{ alignItems: "center" }}>
          <Pressable onPress={togglePicker}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Choisir le type de produit
              </Text>
              <Text>{isPickerOpen ? " ▲" : " ▼"}</Text>
            </View>
          </Pressable>
          {isPickerOpen && (
            <Picker
              mode="dropdown"
              selectedValue={produitType}
              onValueChange={(itemValue, itemIndex) => {
                setProduitType(itemValue);
                handleChoose();
              }}
              style={{
                width: 400, // Ajustez la largeur selon vos besoins
              }}
            >
              <Picker.Item label="Tous les produits" value="Tous" />
              <Picker.Item label="Nouveautés" value="New" />
              <Picker.Item label="Promotions" value="Promo" />
            </Picker>
          )}
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderProfiles}
            keyExtractor={(item) => item.reference}
            style={{ marginTop: 20, height: 645 }}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Pressable onPress={togglePicker}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Choisir le type de produit
              </Text>
              <Text>{isPickerOpen ? " ▲" : " ▼"}</Text>
            </View>
          </Pressable>
          {isPickerOpen && (
            <Picker
              mode="dropdown"
              selectedValue={produitType}
              onValueChange={(itemValue, itemIndex) => {
                setProduitType(itemValue);
                handleChoose();
              }}
              style={{
                width: 400, // Ajustez la largeur selon vos besoins
              }}
            >
              <Picker.Item label="Tous les produits" value="Tous" />
              <Picker.Item label="Nouveautés" value="New" />
              <Picker.Item label="Promotions" value="Promo" />
            </Picker>
          )}
          <Text>Aucun produit disponible à afficher.</Text>
        </View>
      )}
    </View>
  );
}
