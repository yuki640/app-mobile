import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    resizeMode: "contain",
  },
  item: {
    alignItems: "center",
    marginTop: 20,
  },
  containerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titleNav: {
    textAlign: "center",
  },
});
