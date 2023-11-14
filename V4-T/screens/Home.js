import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import Carousel from "react-native-snap-carousel";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";

export default function Home() {
  const [carouselData, setCarouselData] = useState([
    // Ajoutez vos données pour chaque élément du carrousel ici
    { title: "Élément 1" },
    { title: "Élément 2" },
    { title: "Élément 3" },
    // ...
  ]);

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={GlobalStyles.carouselItem}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Bienvenue sur l'application</Text>
      <Text style={GlobalStyles.title}>DevRoomService</Text>

      <Carousel
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
      />
    </View>
  );
}
