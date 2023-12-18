//AppStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Styles pour Home
export const getHomeStyles = () =>
  StyleSheet.create({
    promotionItem: {
      width: screenWidth,
      height: screenHeight * 0.3,
    },
    promotionImage: {
      flex: 1,
      width: "100%",
      height: "100%",
      borderRadius: 20,
    },
    body: {
      // Ce style devrait être suffisant pour centrer le contenu sans étirer
      alignItems: "center",
      paddingHorizontal: 20,
    },
    welcomeText: {
      fontSize: 18,
      // Réduire la marge du bas si nécessaire
      marginBottom: 20,
      marginTop: 20,
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

// Styles globaux
export const GlobalStyles = StyleSheet.create({
  // Style pour la page de connexion
  containerLogin: {
    flex: 1,
    backgroundColor: "#4FD3DA",
    alignItems: "center",
    justifyContent: "center",
  },
  // Style pour la page d'inscription
  containerRegister: {
    flex: 1,
    backgroundColor: "#4FD3DA",
  },
  // Style pour la vue d'entrée de texte
  inputView: {
    width: "80%",
    backgroundColor: "#3AB4BA",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  // Style pour le texte d'entrée
  inputText: {
    height: 50,
    color: "white",
  },
  // Style pour le bouton de connexion
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  // Style pour le texte de connexion
  LoginText: {
    height: 50,
    color: "white",
  },
  // Style pour un élément de liste
  item: {
    backgroundColor: "white",
    flex: 1, // Utilisez flex pour occuper l'espace disponible
    margin: 8, // Vous pouvez ajuster les marges comme nécessaire
    maxWidth: screenWidth / 2 - 8 * 2, // Assurez que l'élément ne dépasse pas la moitié de l'écran moins les marges
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Style pour les titres
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // Style pour le titre de la page de connexion
  titleLogin: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  // Style pour le texte général
  titreCompte: {
    fontSize: 18,
  },
  text: {
    fontSize: 14, // Adaptez la taille du texte selon vos besoins
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Centrez le texte
    marginTop: 8, // Ajoutez un espace au-dessus du texte si nécessaire
    marginBottom: 8, // Ajoutez de l'espace en dessous du texte pour le dernier élément
  },
  // Style pour les images
  image: {
    width: "100%", // L'image doit occuper toute la largeur de l'élément
    height: undefined, // La hauteur sera déterminée par l'aspectRatio
    aspectRatio: 1, // Utilisez le même ratio que l'élément pour éviter les déformations
    resizeMode: "cover", // 'cover' pour éviter les distorsions
    borderRadius: 8, // Vous pouvez ajouter des coins arrondis à l'image si nécessaire
  },
  // Style pour la barre de navigation
  containerNav: {
    flexDirection: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  // Style pour le titre de la barre de navigation
  titleNav: {
    textAlign: "center",
  },
  // Style pour le texte du compte
  textCompte: {
    borderWidth: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  // Style pour la carte de profil
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // Style pour le titre de la fiche produit
  titleCardFicheProduit: {
    backgroundColor: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 11,
    justifyContent: "center",
  },
  // Style pour le tiroir de navigation
  drawerStyle: {
    backgroundColor: "#f2f2f2",
    width: 240,
  },
  // Style pour le contenu du tiroir de navigation
  contentContainerStyle: {
    flex: 1,
    padding: 20,
  },
});

export const StyleFiche = StyleSheet.create({
  // Style pour le conteneur principal de la fiche produit
  container: {
    flex: 1,
    padding: 20,
  },
  // Style pour le conteneur des informations produit
  productInfoContainer: {
    justifyContent: "center",
  },
  // Style pour l'en-tête
  header: {
    marginBottom: 20,
  },
  // Style pour la carte de profil
  profileCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  // Style pour l'image du produit
  productImage: {
    width: 250,
    alignSelf: "center",
    height: 200,
    marginBottom: 10,
    borderRadius: 20,
  },
  // Style pour le conteneur de la quantité
  quantityContainer: {
    marginVertical: 10,
  },
  // Style pour l'entrée de quantité
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  // Style pour le bouton "Ajouter au panier"
  addToCartButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  // Style pour le texte du bouton
  buttonText: {
    color: "#ffffff",
  },
  // Style pour le conteneur des boutons
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  // Style pour le texte de la quantité
  quantityText: {
    fontSize: 14,
  },
  // Style pour le conteneur d'un élément de la liste
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
  },
});