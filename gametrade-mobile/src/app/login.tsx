import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field } from "@/components/auth/Field";
import { useTheme } from "@/providers/ThemeProvider";
import { ApiError } from "@/services/api";
import { authService, type LoginCredentials } from "@/services/auth.service";
import { validateLogin, type FormErrors } from "@/utils/auth-validation";

const initialCredentials: LoginCredentials = { email: "", password: "" };

export default function LoginScreen() {
  const { registered } = useLocalSearchParams<{ registered?: string }>();
  const { isDark } = useTheme();
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errors, setErrors] = useState<FormErrors<keyof LoginCredentials>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof LoginCredentials, value: string) {
    setCredentials((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(undefined);
  }

  async function handleLogin() {
    const nextErrors = validateLogin(credentials);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      await authService.login({
        email: credentials.email.trim().toLowerCase(),
        password: credentials.password,
      });
      router.replace("/home");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Ocurrió un error al iniciar sesión.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <Text
        className={`text-center text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
      >
        Bienvenido
      </Text>
      <Text
        className={`mb-6 mt-2 text-center leading-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}
      >
        Inicia sesión para descubrir videojuegos disponibles para intercambio.
      </Text>

      {registered === "true" ? (
        <View
          className={`mb-5 rounded-xl border px-4 py-3 ${isDark ? "border-emerald-800 bg-emerald-950" : "border-emerald-200 bg-emerald-50"}`}
        >
          <Text
            className={`text-sm leading-5 ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
          >
            Cuenta creada. Ya puedes iniciar sesión.
          </Text>
        </View>
      ) : null}

      {submitError ? (
        <View
          className={`mb-5 rounded-xl border px-4 py-3 ${isDark ? "border-red-900 bg-red-950" : "border-red-200 bg-red-50"}`}
        >
          <Text
            className={`text-sm leading-5 ${isDark ? "text-red-300" : "text-red-700"}`}
          >
            {submitError}
          </Text>
        </View>
      ) : null}

      <Field
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Correo electrónico"
        onChangeText={(value) => updateField("email", value)}
        placeholder="tu@correo.com"
        returnKeyType="next"
        textContentType="emailAddress"
        value={credentials.email}
        error={errors.email}
      />
      <Field
        autoComplete="current-password"
        label="Contraseña"
        onChangeText={(value) => updateField("password", value)}
        onSubmitEditing={handleLogin}
        placeholder="Tu contraseña"
        returnKeyType="go"
        secureTextEntry
        textContentType="password"
        value={credentials.password}
        error={errors.password}
      />

      <Pressable
        accessibilityRole="button"
        className={`mt-2 min-h-14 items-center justify-center rounded-2xl bg-brand ${
          isSubmitting ? "opacity-60" : "active:bg-brand-dark"
        }`}
        disabled={isSubmitting}
        onPress={handleLogin}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">Iniciar sesión</Text>
        )}
      </Pressable>

      <View className="mt-6 flex-row justify-center gap-1">
        <Text
          className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          ¿Aún no tienes cuenta?
        </Text>
        <Link asChild href="/register">
          <Pressable accessibilityRole="link">
            <Text className="text-sm font-bold text-violet-500">
              Crear cuenta
            </Text>
          </Pressable>
        </Link>
      </View>
    </AuthLayout>
  );
}
