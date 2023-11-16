import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const FicheProduit = ({ route }) => {
  const { item } = route.params;
  const { designation, image, reference, prixUHT } = item;
  const [quantity, setQuantity] = useState("1");
  const showErrorAlert = (message) => {
    alert(message);
  };
  const addToCart = async () => {
    try {
      const quantiteNumber = parseInt(quantity, 10);
      const referenceString = reference.toString();
      const token = await SecureStore.getItemAsync("token");
      const prixUHTfloat = parseFloat(prixUHT);

      console.log("Début de l'update de l'API");
      console.log(
        `token : ${token}  reference:${referenceString} quantite:${quantiteNumber} total_prix:${prixUHTfloat}`,
      );
      console.log(
        `structure : ${JSON.stringify({
          token,
          total_prix: prixUHTfloat,
          reference: referenceString,
          quantite: quantiteNumber,
        })}`,
      );
      const Response = await fetch(
        "https://api.devroomservice.v70208.campus-centre.fr/addPanier",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            total_prix: prixUHTfloat,
            reference: referenceString,
            quantite: quantiteNumber,
          }),
        },
      );
      console.log("Données récupérées avec succès depuis l'API");
      console.log("Code de réponse :", Response.status);
      if (Response.status === 200) {
        showErrorAlert("Le produit a bien été ajouté au panier");
      }
      if (Response.status !== 200) {
        const jsonResponse = await Response.json();
        console.log(jsonResponse);

        showErrorAlert("Le produit n'a pas été ajouté au panier");
      }
    } catch (error) {
      console.error("Erreur lors de l'update de la table panier", error);
    }
  };

  return (
    <View style={StyleFiche.container}>
      <View style={StyleFiche.profileCard}>
        <View>
          <Text style={GlobalStyles.title}>{designation}</Text>
        </View>
        <View>
          <Text style={GlobalStyles.textCompte}></Text>
        </View>
        <View>
          {image && (
            <Image source={{ uri: image }} style={StyleFiche.productImage} />
          )}
          <Text style={GlobalStyles.textCompte}>
            Référence produit: {reference}
          </Text>
        </View>
        <View>
          <Text style={GlobalStyles.textCompte}>
            Prix Unitaire : {prixUHT}€
          </Text>
        </View>
        <View style={StyleFiche.quantityContainer}>
          <TextInput
            style={StyleFiche.quantityInput}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity
          style={StyleFiche.addToCartButton}
          onPress={addToCart}
        >
          <Text style={StyleFiche.buttonText}>Ajouter au panier</Text>
          <FontAwesome5 name="cart-plus" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FicheProduit;
