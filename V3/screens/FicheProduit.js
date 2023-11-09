<<<<<<< HEAD
import React from "react";
import { Image, Text, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import base64 from "base-64";

export default function FicheProduit({ route }) {
  const item = route.params?.item; // Utilisez l'opérateur ?. pour éviter les erreurs si route.params n'est pas défini
  // Vérifiez si item est défini avant d'accéder à ses propriétés
  const { reference, designation, image, prixUHT } = item || {};
  // Supposez que item.image.data contienne les données binaires de l'image
  const binaryData = item.image.data;
  const fileType = "image/jpeg";

  // Encodez les données binaires en base64
  const base64String = base64.encode(
    String.fromCharCode(...new Uint8Array(binaryData)),
  );

  // Créez l'URL de données avec le format correct
  const imageUrl = `data:${fileType};base64,${base64String}`;
  return (
    <View>
      <View>
        <Text style={GlobalStyles.titleCardFicheProduit}>
          Fiche du produit{" "}
        </Text>
      </View>
      <View style={GlobalStyles.profileCard}>
=======
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import { FontAwesome5 } from "@expo/vector-icons";

const FicheProduit = ({ route }) => {
  const { item } = route.params;
  const { designation, image, reference, prixUHT } = item;
  const [quantity, setQuantity] = useState("1");

  const addToCart = () => {
    console.log(`Ajouté au panier : ${quantity} x ${designation}`);
  };

  return (
    <View style={StyleFiche.container}>
      <View style={StyleFiche.header}>
        <Text style={GlobalStyles.title}>Fiche du produit</Text>
      </View>
      <View style={StyleFiche.profileCard}>
>>>>>>> origin/Thomas
        <View>
          <Text style={GlobalStyles.title}>{designation}</Text>
        </View>
        <View>
          <Text style={GlobalStyles.textCompte}></Text>
        </View>
        <View>
<<<<<<< HEAD
          {item.image && (
            <Image
              source={{ uri: imageUrl }} // Utilisez une extension par défaut, par exemple, JPG
              style={{ width: 200, height: 200 }} // Ajustez la taille selon vos besoins
            />
=======
          {image && (
            <Image source={{ uri: image }} style={StyleFiche.productImage} />
>>>>>>> origin/Thomas
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
<<<<<<< HEAD
      </View>
    </View>
  );
}
=======
        <View style={StyleFiche.quantityContainer}>
          <TextInput
            style={StyleFiche.quantityInput}
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            keyboardType="numeric"
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
>>>>>>> origin/Thomas
