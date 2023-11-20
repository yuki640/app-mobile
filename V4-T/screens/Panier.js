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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Produits({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantiteInput, setQuantiteInput] = useState(""); // Ajoutez un état pour la valeur du TextInput
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  const updateCart = async (item, operation, newQuantite) => {
    try {
      let nouvelleQuantite;

      // Mettre à jour la quantité en fonction de l'opération
      if (operation !== "") {
        nouvelleQuantite = item.quantite;
        if (operation === "increment") {
          nouvelleQuantite += 1;
        } else if (operation === "decrement") {
          nouvelleQuantite = Math.max(nouvelleQuantite - 1, 0);
        }
      } else {
        nouvelleQuantite = newQuantite;
      }
      // Appeler l'API pour mettre à jour la quantité dans le panier
      const response = await fetch(
        "https://api.devroomservice.v70208.campus-centre.fr/updatePanier",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codepa: item.codepa,
            nouvelleQuantite: nouvelleQuantite,
          }),
        },
      );

      if (response.ok) {
        // Le code de statut est dans la plage 200
        const responseData = await response.json();
        console.log("Succès :", responseData.message);

        // Mettre à jour l'état local avec la nouvelle quantité
        const updatedData = data.map((product) => {
          if (product.reference === item.reference) {
            product.quantite = nouvelleQuantite;
          }
          return product;
        });

        setData(updatedData);
      } else if (response.status === 404) {
        console.log(response.status, "Élément du panier introuvable.");
      } else {
        console.log(
          response.status,
          "Erreur lors de la mise à jour de la quantité du produit dans le panier.",
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la quantité du produit dans le panier",
        error,
      );
    }
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
      const Token = await SecureStore.getItemAsync("token");
      setToken(token);
      if (token) {
        try {
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
      }
    };

    const fetchDataOnFocus = async () => {
      await fetchDataApi();
    };

    const unsubscribeFocus = navigation.addListener("focus", fetchDataOnFocus);

    // Nettoie l'écouteur lors du démontage du composant
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]); //dépendances

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
            onPress={() => updateCart(item, "decrement", item.quantite - 1)}
          >
            <Text style={StyleFiche.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={StyleFiche.quantityInput}
            value={item.quantite.toString()}
            onChangeText={(val) => updateCart(item, "", val)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={StyleFiche.addToCartButton}
            onPress={() =>
              updateCart(item, "increment", parseInt(quantiteInput, 10) + 1)
            }
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
      {!token ? (
        <TouchableOpacity
          style={StyleFiche.addToCartButton}
          onPress={() => navigation.navigate("Connexion")}
        >
          <Text style={StyleFiche.buttonText}>
            Vous n'êtes pas connecté. Connectez-vous ici.
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {data && data.length > 0 && (
            <TouchableOpacity
              style={StyleFiche.addToCartButton}
              onPress={async () => {
                const token = await SecureStore.getItemAsync("token");
                await removeToCart(token, "");
                setData([]);
              }}
            >
              <Text style={StyleFiche.buttonText}>Vider le panier</Text>
              <FontAwesome5 name="cart-plus" size={20} color="#ffffff" />
            </TouchableOpacity>
          )}

          <KeyboardAwareScrollView style={GlobalStyles.container}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : data && data.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderProfiles}
                keyExtractor={(item) => item.reference.toString()}
              />
            ) : (
              <Text>Aucune donnée disponible.</Text>
            )}
          </KeyboardAwareScrollView>
        </>
      )}
    </View>
  );
}
