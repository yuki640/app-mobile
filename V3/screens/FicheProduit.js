import React from "react";
import { Text, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";

export default function FicheProduit({ route }) {
  const item = route.params?.item; // Utilisez l'opérateur ?. pour éviter les erreurs si route.params n'est pas défini
  //console.log(item);
  // Vérifiez si item est défini avant d'accéder à ses propriétés
  const { reference, designation, image, prixUHT } = item || {};

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
          <Text style={GlobalStyles.textCompte}>{image}</Text>
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
