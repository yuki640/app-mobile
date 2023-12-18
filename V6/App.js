import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import AppNavigator from "./component/AppNavigator";
import { AuthProvider } from "./component/AuthContext";

export default function App() {
  /* Laisse en place le splash screen pendant qu'on récupère les ressources nécessaires */
  SplashScreen.preventAutoHideAsync();

  const [isReady, setIsReady] = useState(false);

  // Fonction pour récupérer le token depuis SecureStore
  const RetrieveToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("token");
      if (storedToken) {
        // Envoi de la requête à l'API pour vérifier le token
        const response = await fetch(
          "https://api.devroomservice.v70208.campus-centre.fr/verify-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: storedToken }),
          },
        );

        if (response.status === 200) {
          // Le token est valide
          console.log("token valide et non-expiré");
        } else if (response.status === 401) {
          // Le token est expiré ou invalide, donc on le supprime
          const responseSupp = await SecureStore.deleteItemAsync("token");
          if (!responseSupp) {
            console.log(
              "Le token n'a pas été supprimé du SecureStore car il y a eu un probléme",
            );
          }
        } else {
          console.error(
            "La requête de vérification du token a échoué, connexion au serveur indisponible",
          );
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors du processus de vérification du token ",
        error,
      );
    }
  };

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
        // Chargement de l'icone ICON
        await Font.loadAsync({
          FontAwesome5: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf"),
        });
        // Appel de la fonction pour récupérer le token
        await RetrieveToken();
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
    <AuthProvider>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </AuthProvider>
  );
}
