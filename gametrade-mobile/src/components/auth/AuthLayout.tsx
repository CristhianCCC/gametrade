import type { ReactNode } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/providers/ThemeProvider";

const gameTradeLogo = require("../../../assets/images/GameTrade exchange controller logo.png");

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isDark } = useTheme();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-slate-950" : "bg-white"}`} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-full flex-grow justify-center px-5 py-7"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[440px] self-center">
            <View className="mb-4 flex-row justify-end">
              <ThemeToggle />
            </View>

            <Animated.View entering={FadeIn.duration(420)} className="mb-5 items-center">
              <View className="h-32 w-48 items-center justify-center rounded-[28px] bg-white p-2 shadow-sm">
                <Image
                  accessibilityLabel="Logo de GameTrade"
                  className="h-full w-full"
                  resizeMode="contain"
                  source={gameTradeLogo}
                />
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(420).delay(80)}
              className={`rounded-[30px] border px-5 py-7 shadow-sm ${
                isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
              }`}
            >
              {children}
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
