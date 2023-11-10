import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { GlobalStyles, StyleFiche } from "../styles/AppStyles";
import { FontAwesome5 } from "@expo/vector-icons";

const FicheProduit = ({ route }) => {
  const { item } = route.params;
  const { designation, image, reference, prixUHT } = item;
  const [quantity, setQuantity] = useState("1");

  const addToCart = () => {
    useEffect(() => {
      // Fonction pour récupérer les données de l'API
      const fetchDataApi = async () => {
        try {
          const Token = await SecureStore.getItemAsync("token");
          if (!Token) {
            navigation.navigate("Login");
          }
          console.log("Début de l'update de l'API");

          const newData = await fetch(
            "http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/addPanier",
            {
              method: "POST",
              body: JSON.stringify({Token, reference, quantity, prixUHT}),
            },
        );
    console.log("Données récupérées avec succès depuis l'API");
  
  } catch (error) {
    console.error("Erreur lors de l'update de la teble panier", error);
    setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
  }
};
fetchDataApi(); // Charge les données depuis l'API
  }, []);
  }
    
    


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
