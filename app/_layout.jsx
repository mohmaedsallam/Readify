import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthContextProvider, { AuthContext } from "../store/auth-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// Create a client
const queryClient = new QueryClient();
function RootLayoutNav() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <AuthContextProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="dark" backgroundColor="#A56635" />

            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="loginSignUp"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="signUp" options={{ headerShown: false }} />

              <Stack.Screen
                name="BookCategoriesScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NotificationCenter"
                options={{
                  title: "Notification Center",
                  headerStyle: {
                    backgroundColor: "#A56635",
                  },
                  headerTitleStyle: {
                    color: "white",
                  },
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </AuthContextProvider>
    </>
  );
}
