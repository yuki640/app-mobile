import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { getHomeStyles } from '../styles/AppStyles';

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
  const HomeStyles = getHomeStyles(screenWidth, screenHeight); // Passez screenWidth et screenHeight ici si nécessaire

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionsData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={HomeStyles.container}>
      <FlatList
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
        style={{ height: screenHeight * 0.3 }} // Hauteur ajustée ici
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
