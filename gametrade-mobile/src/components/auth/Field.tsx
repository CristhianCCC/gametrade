import type { ComponentProps } from "react";
import { Text, TextInput, View } from "react-native";

import { useTheme } from "@/providers/ThemeProvider";

type FieldProps = ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
};

export function Field({ label, error, className, ...inputProps }: FieldProps) {
  const { isDark } = useTheme();

  return (
    <View className="mb-4">
      <Text className={`mb-2 text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
        {label}
      </Text>
      <TextInput
        {...inputProps}
        className={`rounded-2xl border px-4 py-3.5 text-base ${
          isDark ? "bg-slate-950 text-white" : "bg-white text-slate-900"
        } ${
          error ? (isDark ? "border-red-400" : "border-red-500") : isDark ? "border-slate-700" : "border-slate-300"
        } ${className ?? ""}`}
        placeholderTextColor={isDark ? "#94A3B8" : "#64748B"}
      />
      {error ? (
        <Text className={`mt-1.5 text-xs leading-5 ${isDark ? "text-red-300" : "text-red-600"}`}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
