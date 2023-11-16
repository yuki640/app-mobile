import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const promotionsData = [
  { id: 1, image: require("../images/choco1.png") },
  { id: 2, image: require("../images/choco2.jpg") },
  { id: 3, image: require("../images/choco3.jpg") },
  { id: 4, image: require("../images/choco4.jpg") },
  // Ajoutez autant d'images de promotion que nécessaire avec des identifiants uniques
];

export default function Home({ route }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionsData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.promotionItem}>
            <Image source={item.image} style={styles.promotionImage} resizeMode="cover" />
          </TouchableOpacity>
        )}
      />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Bienvenue sur notre application de e-commerce !</Text>
        <TouchableOpacity style={styles.shopNowButton}>
          <Text style={styles.shopNowButtonText}>Commencez vos achats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  promotionItem: {
    width: screenWidth,
    height: screenHeight * 0.3,
    marginBottom: -250,
  },
  promotionImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 20,
  },
  body: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  shopNowButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  shopNowButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
