import React, { useState, useEffect, useRef  } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { getHomeStyles } from '../styles/AppStyles';
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



  function ListePromo() {
    const [data, newData] = useState([]);

      const fetchDataApi = async () => {
        try {
          console.log("Début de la récupération des données depuis l'API");
  
          const newData = await fetch(
            "https://api.devroomservice.v70208.campus-centre.fr/listePromo"
          );
          console.log("Données récupérées avec succès depuis l'API");
        } catch (error) {
          console.error("Erreur lors de la récupération des données", error);
          setIsLoading(false); // Arrêter l'indicateur de chargement en cas d'erreur
        }
      };
   
  
  };


  useEffect(() => {
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

  return (
    <View style={HomeStyles.container}>
      <FlatList
        ref={flatListRef} // Utilisation de la référence
        data={promotionsData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={HomeStyles.promotionItem}>
            <Image source={item.image} style={HomeStyles.promotionImage} resizeMode="cover" />
          </TouchableOpacity>
        )}
        style={{ height: screenHeight * 0.3 }}
      />
      <View style={HomeStyles.body}>
        <Text style={HomeStyles.welcomeText}>Bienvenue sur notre application de e-commerce !</Text>
        <TouchableOpacity style={HomeStyles.shopNowButton}>
          <Text style={HomeStyles.shopNowButtonText}>Commencez vos achats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

