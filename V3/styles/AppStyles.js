import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  containerLogin: {
    flex: 1,
    backgroundColor: "#4FD3DA",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#3AB4BA",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  LoginText: {
    height: 50,
    color: "white",
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleLogin: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Couleur de texte
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  titleNav: {
    textAlign: "center",
  },
  textCompte: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Couleur de texte
    marginBottom: 10,
  },
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
  titleCardFicheProduit: {
    backgroundColor: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 11,
    justifyContent: "center",
  },
  drawerStyle: {
    backgroundColor: "#f2f2f2", // Couleur de fond du Drawer
    width: 240, // Largeur du Drawer
  },
  contentContainerStyle: {
    flex: 1, // Utilisez toute la hauteur disponible
    padding: 20, // Espacement intérieur
  },
});
