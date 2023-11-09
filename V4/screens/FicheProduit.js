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
