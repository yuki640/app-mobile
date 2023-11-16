import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getHomeStyles } from "../styles/AppStyles";
import { GlobalStyles } from "../styles/AppStyles";



// Ici, on récupère les dimensions de l'écran
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const promotionsData = [
  { id: 1, image: require("../images/choco1.png") },
  { id: 2, image: require("../images/choco2.jpg") },
  { id: 3, image: require("../images/choco3.jpg") },
  { id: 4, image: require("../images/choco4.jpg") },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const HomeStyles = getHomeStyles(screenWidth, screenHeight);
  const flatListRef = useRef(); // Référence à la FlatList
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  async function ListePromo() {
    try {
      console.log("Début de la récupération des données depuis l'API");
      const newData = await fetch(
        "https://api.devroomservice.v70208.campus-centre.fr/listePromo",
      );
      console.log("Données récupérées avec succès depuis l'API");
      let jsonData = "";
      jsonData = await newData.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
      setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
    }
  }

  useEffect(() => {
    ListePromo();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % promotionsData.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  function renderData({ item }) {
    return (
      <Pressable onPress={() => navigation.navigate("FicheProduit", { item: item })}>
        <View style={GlobalStyles.item}>
          <Image
            source={{ uri: item.image }}
            style={GlobalStyles.image}
          />
          <Text style={GlobalStyles.text}>{item.designation}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <ScrollView style={HomeStyles.container}>
      <FlatList
        ref={flatListRef} // Utilisation de la référence
        data={promotionsData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / screenWidth,
          );
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={HomeStyles.promotionItem}>
            <Image
              source={item.image}
              style={HomeStyles.promotionImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      <View style={HomeStyles.body}>
        <Text style={HomeStyles.welcomeText}>
          Bienvenue sur notre application de e-commerce !
        </Text>
        <TouchableOpacity 
        // onPress={navigation.navigate("Produits")} 
           style={HomeStyles.shopNowButton}>
          <Text style={HomeStyles.shopNowButtonText}>Commencez vos achats</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  scrollEnabled={false}
  data={data}
  numColumns={2}
  keyExtractor={(item) => item.reference}
  style={{ marginTop: 20 }}
  contentContainerStyle={{
    paddingBottom: 20,
    justifyContent: 'space-between', // Ajoutez ceci pour justifier le contenu
    paddingHorizontal: 10, // Ajustez en fonction de la marge souhaitée
  }}
  renderItem={renderData}
/>
    </ScrollView>
  );
}
