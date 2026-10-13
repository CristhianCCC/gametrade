import { Pressable, Text } from "react-native";

import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      accessibilityLabel={isDark ? "Activar tema claro" : "Activar tema oscuro"}
      accessibilityRole="switch"
      accessibilityState={{ checked: isDark }}
      className={`h-11 min-w-11 items-center justify-center rounded-2xl border px-3 active:opacity-70 ${
        isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
      }`}
      onPress={toggleTheme}
    >
      <Text className="text-lg">{isDark ? "☀︎" : "☾"}</Text>
    </Pressable>
  );
}
