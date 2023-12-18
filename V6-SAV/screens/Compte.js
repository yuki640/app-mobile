import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "#333",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#333",
  },
  menuItem: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 10, // This will give you rounded corners
    margin: 5, // Add margin to create space between items
    width: "45%", // Set width to 45% of the screen width
  },
  menuText: {
    color: "#fff",
    textAlign: "center",
  },
});

function CompteScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bonjour, Samuel</Text>
      </View>
      <View style={styles.menuContainer}>
        {/* Menu items laid out two per row */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Vos commandes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Acheter à nouveau</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Profil")}
        >
          <Text style={styles.menuText}>Votre compte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Vos listes</Text>
        </TouchableOpacity>
      </View>
      {/* ... Rest of your component remains unchanged */}
    </SafeAreaView>
  );
}

export default CompteScreen;
