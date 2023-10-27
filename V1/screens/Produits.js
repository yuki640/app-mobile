import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../styles/AppStyles";

export default function Produits() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les données de l'API
  // ...
  const fetchDataApi = async () => {
    try {
      console.log("Début de la récupération des données depuis l'API");
      const newData = await fetch(
        "http://94.247.183.122/plesk-site-preview/api.devroomservice.v70208.campus-centre.fr/https/94.247.183.122/products",
      );
      console.log("Données récupérées avec succès depuis l'API");
      const jsonData = await newData.json();

      console.log("Données à stocker dans AsyncStorage : ", jsonData);
      await AsyncStorage.setItem("data", JSON.stringify(jsonData));

      console.log("Données stockées avec succès dans AsyncStorage");
      // Met à jour l'état de data avec les nouvelles données
      console.log(
        "Mise à jour de l'état de data avec les nouvelles données : ",
        jsonData,
      );
      setData(jsonData);
      setIsLoading(false); // Les données ont été chargées
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };
  // ...

  const fetchDataLocal = async () => {
    try {
      console.log("Début de la récupération des données locales");
      const storedData = await AsyncStorage.getItem("data");
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData); // Désérialisez les données
        console.log(
          "Données récupérées avec succès depuis AsyncStorage : ",
          parsedData,
        ); // Ajoutez cette ligne
        setData(parsedData);
        setIsLoading(false); // Les données ont été chargées depuis le stockage local
      } else {
        console.log("Aucune donnée trouvée dans AsyncStorage.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données locales",
        error,
      );
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  };

  useEffect(() => {
    fetchDataLocal(); // Vérifie si des données sont déjà stockées localement
    fetchDataApi(); // Charge les données depuis l'API
  }, []);

  function renderProfiles({ item }) {
    console.log("Données à afficher : ", item);
    return (
      <View style={GlobalStyles.item}>
        <Text style={GlobalStyles.title}>{item.reference}</Text>
        <Text style={GlobalStyles.text}>{item.designation}</Text>
        {/*<Image*/}
        {/*  style={GlobalStyles.image}*/}
        {/*  source={{ uri: `data:image/jpeg;base64,${item.image}` }} // Assurez-vous d'ajuster le type d'image si nécessaire*/}
        {/*/>*/}
      </View>
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
        />
      ) : (
        <Text>Aucune donnée disponible.</Text>
      )}
    </View>
  );
}
