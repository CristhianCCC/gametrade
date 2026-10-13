import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { useTheme } from "@/providers/ThemeProvider";
import { authService } from "@/services/auth.service";

export default function Index() {
  const { isDark } = useTheme();
  const [hasSession, setHasSession] = useState<boolean>();

  useEffect(() => {
    authService
      .getSessionToken()
      .then((token) => setHasSession(Boolean(token)))
      .catch(() => setHasSession(false));
  }, []);

  if (hasSession === undefined) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? "bg-slate-950" : "bg-white"}`}>
        <ActivityIndicator color="#A78BFA" />
      </View>
    );
  }

  return <Redirect href={hasSession ? "/home" : "/login"} />;
}
