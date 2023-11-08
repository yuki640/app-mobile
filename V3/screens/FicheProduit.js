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
        <View>
          <Text style={GlobalStyles.title}>{designation}</Text>
        </View>
        <View>
          <Text style={GlobalStyles.textCompte}></Text>
        </View>
        <View>
          {item.image && (
            <Image
              source={{ uri: imageUrl }} // Utilisez une extension par défaut, par exemple, JPG
              style={{ width: 200, height: 200 }} // Ajustez la taille selon vos besoins
            />
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
      </View>
    </View>
  );
}
