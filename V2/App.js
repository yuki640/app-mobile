import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import AppNavigator from "./component/AppNavigator";

export default function App() {
  /* Laisse en place le splash screen pendant qu'on récupère les ressources nécessaires */
  SplashScreen.preventAutoHideAsync();

  const [isReady, setIsReady] = useState(false);
  async function retrieveToken() {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        // Faites quelque chose avec le token, par exemple, ajoutez-le aux en-têtes des requêtes.
        console.log("Token récupéré au lancement de l'application :", token);
      } else {
        console.log("Aucun token n'a été trouvé dans le SecureStore.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
    }
  }

  useEffect(() => {
    async function prepare() {
      try {
        // Chargement de la police AntDesign
        await Font.loadAsync({
          AntDesign: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf"),
        });
        await Font.loadAsync({ Inter_400Regular, Inter_600SemiBold });
        // Chargement de la police Entypo
        await Font.loadAsync({
          Entypo: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf"),
        });
        // Appel de la fonction pour récupérer le token
        retrieveToken();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  // Vérification de la disponibilité des icônes
  const isAntDesignLoaded = Font.isLoaded("AntDesign");
  const isEntypoLoaded = Font.isLoaded("Entypo");

  if (!isAntDesignLoaded || !isEntypoLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Les icônes AntDesign et Entypo n'ont pas été chargées correctement.
        </Text>
      </View>
    );
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
