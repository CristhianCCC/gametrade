import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";
import { authService } from "@/services/auth.service";

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    authService
      .getSessionToken()
      .then((token) => {
        if (!token) {
          router.replace("/login");
        }
      })
      .finally(() => setIsCheckingSession(false));
  }, []);

  async function handleSignOut() {
    setIsSigningOut(true);
    await authService.signOut();
    router.replace("/login");
  }

  if (isCheckingSession) {
    return (
      <View
        className={`flex-1 items-center justify-center ${isDark ? "bg-slate-950" : "bg-white"}`}
      >
        <ActivityIndicator color="#A78BFA" />
      </View>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${isDark ? "bg-slate-950" : "bg-white"}`}
      edges={["top", "bottom"]}
    >
      <View className="pt-3 items-end">
        <ThemeToggle />
      </View>
      <View className="flex-1 justify-center">
        <View
          className={`rounded-[32px] border p-7 ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"}`}
        >
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl bg-brand">
            <Text className="text-xl font-black text-white">GT</Text>
          </View>
          <Text
            className={`text-3xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Sesión iniciada
          </Text>
          <Text
            className={`mt-3 leading-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Tu token se guardó de forma segura. La pantalla de publicaciones
            puede conectarse usando este mismo servicio de sesión.
          </Text>

          <Pressable
            accessibilityRole="button"
            className={`mt-7 min-h-14 items-center justify-center rounded-2xl ${
              isDark ? "bg-slate-800" : "bg-slate-100"
            } ${
              isSigningOut
                ? "opacity-60"
                : isDark
                  ? "active:bg-slate-700"
                  : "active:bg-slate-200"
            }`}
            disabled={isSigningOut}
            onPress={handleSignOut}
          >
            {isSigningOut ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text
                className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}
              >
                Cerrar sesión
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
