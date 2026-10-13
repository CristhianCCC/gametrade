import { router } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { Field } from "@/components/auth/Field";
import { cities, getCityLabel, type City } from "@/constants/cities";
import { useTheme } from "@/providers/ThemeProvider";
import { ApiError } from "@/services/api";
import { authService, type RegistrationInput } from "@/services/auth.service";
import { validateRegistration, type FormErrors } from "@/utils/auth-validation";

type RegistrationForm = Omit<RegistrationInput, "city"> & {
  confirmPassword: string;
  city?: City;
};

const initialForm: RegistrationForm = {
  names: "",
  lastnames: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  city: undefined,
  password: "",
  confirmPassword: "",
};

const initialBirthDate = new Date(2000, 0, 1);

function dateFromFormValue(value: string) {
  if (!value) {
    return initialBirthDate;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  const isValidDate =
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day;

  return !isValidDate
    ? initialBirthDate
    : parsedDate;
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getLatestBirthDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);

  return date;
}

export default function RegisterScreen() {
  const { isDark } = useTheme();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors<keyof RegistrationForm>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState(initialBirthDate);

  const latestBirthDate = getLatestBirthDate();

  function updateField(field: keyof RegistrationForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(undefined);
  }

  function selectCity(city: City) {
    setForm((current) => ({ ...current, city }));
    setErrors((current) => ({ ...current, city: undefined }));
    setIsCityPickerOpen(false);
  }

  function openDatePicker() {
    setSelectedBirthDate(dateFromFormValue(form.dateOfBirth));
    setIsDatePickerOpen(true);
  }

  function saveBirthDate(date: Date) {
    updateField("dateOfBirth", toDateInputValue(date));
  }

  function handleBirthDateChange(_: unknown, date: Date) {
    setSelectedBirthDate(date);

    if (Platform.OS === "android") {
      saveBirthDate(date);
      setIsDatePickerOpen(false);
    }
  }

  async function handleRegistration() {
    const nextErrors = validateRegistration(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);

    try {
      await authService.register({
        names: form.names.trim(),
        lastnames: form.lastnames.trim(),
        email: form.email.trim().toLowerCase(),
        phoneNumber: form.phoneNumber.trim(),
        dateOfBirth: form.dateOfBirth,
        city: form.city as City,
        password: form.password,
      });
      router.replace("/login?registered=true");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Ocurrió un error al crear tu cuenta. Inténtalo otra vez.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <Pressable
        accessibilityRole="button"
        className={`mb-7 self-start rounded-xl px-3 py-2 active:opacity-70 ${
          isDark ? "bg-slate-800" : "bg-violet-50"
        }`}
        onPress={() => router.replace("/login")}
      >
        <Text className="text-sm font-semibold text-violet-600">← Volver a iniciar sesión</Text>
      </Pressable>

      <Text className={`text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
        Crea tu cuenta
      </Text>
      <Text className={`mb-6 mt-2 leading-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        Completa tus datos para empezar a intercambiar videojuegos.
      </Text>

      {submitError ? (
        <View className={`mb-5 rounded-xl border px-4 py-3 ${isDark ? "border-red-900 bg-red-950" : "border-red-200 bg-red-50"}`}>
          <Text className={`text-sm leading-5 ${isDark ? "text-red-300" : "text-red-700"}`}>
            {submitError}
          </Text>
        </View>
      ) : null}

      <Field
        autoCapitalize="words"
        autoComplete="name"
        label="Nombres"
        onChangeText={(value) => updateField("names", value)}
        placeholder="Tus nombres"
        textContentType="givenName"
        value={form.names}
        error={errors.names}
      />
      <Field
        autoCapitalize="words"
        autoComplete="family-name"
        label="Apellidos"
        onChangeText={(value) => updateField("lastnames", value)}
        placeholder="Tus apellidos"
        textContentType="familyName"
        value={form.lastnames}
        error={errors.lastnames}
      />
      <Field
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Correo electrónico"
        onChangeText={(value) => updateField("email", value)}
        placeholder="tu@correo.com"
        textContentType="emailAddress"
        value={form.email}
        error={errors.email}
      />
      <Field
        autoComplete="tel"
        keyboardType="phone-pad"
        label="Teléfono"
        onChangeText={(value) => updateField("phoneNumber", value)}
        placeholder="300 123 4567"
        textContentType="telephoneNumber"
        value={form.phoneNumber}
        error={errors.phoneNumber}
      />
      {Platform.OS === "web" ? (
        <Field
          keyboardType="numbers-and-punctuation"
          label="Fecha de nacimiento"
          maxLength={10}
          onChangeText={(value) => updateField("dateOfBirth", value)}
          placeholder="AAAA-MM-DD"
          value={form.dateOfBirth}
          error={errors.dateOfBirth}
        />
      ) : (
        <View className="mb-4">
          <Text className={`mb-2 text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
            Fecha de nacimiento
          </Text>
          <Pressable
            accessibilityHint="Abre el calendario para elegir tu fecha de nacimiento"
            accessibilityRole="button"
            accessibilityValue={{ text: form.dateOfBirth || "Sin seleccionar" }}
            className={`min-h-14 flex-row items-center justify-between rounded-2xl border px-4 ${
              isDark ? "bg-slate-950" : "bg-white"
            } ${
              errors.dateOfBirth
                ? isDark
                  ? "border-red-400"
                  : "border-red-500"
                : isDark
                  ? "border-slate-700"
                  : "border-slate-300"
            }`}
            onPress={openDatePicker}
          >
            <Text
              className={`text-base ${
                form.dateOfBirth
                  ? isDark
                    ? "text-white"
                    : "text-slate-900"
                  : isDark
                    ? "text-slate-400"
                    : "text-slate-500"
              }`}
            >
              {form.dateOfBirth || "Selecciona tu fecha de nacimiento"}
            </Text>
            <Text className={`text-sm font-semibold ${isDark ? "text-violet-300" : "text-violet-600"}`}>
              Elegir
            </Text>
          </Pressable>
          {errors.dateOfBirth ? (
            <Text className={`mt-1.5 text-xs leading-5 ${isDark ? "text-red-300" : "text-red-600"}`}>
              {errors.dateOfBirth}
            </Text>
          ) : null}
        </View>
      )}

      {Platform.OS === "android" && isDatePickerOpen ? (
        <DateTimePicker
          display="calendar"
          maximumDate={latestBirthDate}
          mode="date"
          onDismiss={() => setIsDatePickerOpen(false)}
          onValueChange={handleBirthDateChange}
          value={selectedBirthDate}
        />
      ) : null}

      <View className="mb-4">
        <Text className={`mb-2 text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          Ciudad
        </Text>
        <Pressable
          accessibilityHint="Abre la lista de ciudades disponibles"
          accessibilityRole="button"
          accessibilityValue={{ text: getCityLabel(form.city) ?? "Sin seleccionar" }}
          className={`min-h-14 flex-row items-center justify-between rounded-2xl border px-4 ${
            isDark ? "bg-slate-950" : "bg-white"
          } ${
            errors.city ? (isDark ? "border-red-400" : "border-red-500") : isDark ? "border-slate-700" : "border-slate-300"
          }`}
          onPress={() => setIsCityPickerOpen(true)}
        >
          <Text
            className={
              form.city
                ? `text-base ${isDark ? "text-white" : "text-slate-900"}`
                : `text-base ${isDark ? "text-slate-400" : "text-slate-500"}`
            }
          >
            {getCityLabel(form.city) ?? "Selecciona tu ciudad"}
          </Text>
          <Text className={`text-lg ${isDark ? "text-violet-300" : "text-violet-600"}`}>⌄</Text>
        </Pressable>
        {errors.city ? (
          <Text className={`mt-1.5 text-xs leading-5 ${isDark ? "text-red-300" : "text-red-600"}`}>
            {errors.city}
          </Text>
        ) : null}
      </View>

      <Field
        autoComplete="new-password"
        label="Contraseña"
        onChangeText={(value) => updateField("password", value)}
        placeholder="Crea una contraseña segura"
        secureTextEntry
        textContentType="newPassword"
        value={form.password}
        error={errors.password}
      />
      <Field
        autoComplete="new-password"
        label="Confirmar contraseña"
        onChangeText={(value) => updateField("confirmPassword", value)}
        onSubmitEditing={handleRegistration}
        placeholder="Repite tu contraseña"
        returnKeyType="go"
        secureTextEntry
        textContentType="newPassword"
        value={form.confirmPassword}
        error={errors.confirmPassword}
      />

      <Text className={`mb-4 text-xs leading-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        La contraseña debe tener entre 8 y 64 caracteres, con mayúscula, minúscula, número y símbolo.
      </Text>

      <Pressable
        accessibilityRole="button"
        className={`min-h-14 items-center justify-center rounded-2xl bg-brand ${
          isSubmitting ? "opacity-60" : "active:bg-brand-dark"
        }`}
        disabled={isSubmitting}
        onPress={handleRegistration}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-base font-bold text-white">Crear cuenta</Text>
        )}
      </Pressable>

      <Modal
        animationType="slide"
        onRequestClose={() => setIsCityPickerOpen(false)}
        transparent
        visible={isCityPickerOpen}
      >
        <View className="flex-1 justify-end bg-black/70">
          <View className={`max-h-[78%] rounded-t-[32px] px-6 pb-9 pt-6 ${isDark ? "bg-slate-900" : "bg-white"}`}>
            <View className="mb-4 flex-row items-center justify-between">
              <Text className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                Selecciona tu ciudad
              </Text>
              <Pressable
                accessibilityRole="button"
                className={`rounded-xl px-3 py-2 ${isDark ? "bg-slate-800" : "bg-violet-50"}`}
                onPress={() => setIsCityPickerOpen(false)}
              >
                <Text className="font-semibold text-violet-600">Cerrar</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cities.map((city) => (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: form.city === city.value }}
                  key={city.value}
                  className={`mb-2 flex-row items-center justify-between rounded-2xl px-4 py-4 ${
                    form.city === city.value
                      ? "bg-brand"
                      : isDark
                        ? "bg-slate-800 active:bg-slate-700"
                        : "bg-slate-100 active:bg-slate-200"
                  }`}
                  onPress={() => selectCity(city.value)}
                >
                  <Text className={`text-base font-semibold ${form.city === city.value || isDark ? "text-white" : "text-slate-800"}`}>
                    {city.label}
                  </Text>
                  {form.city === city.value ? <Text className="text-base font-bold text-white">✓</Text> : null}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        onRequestClose={() => setIsDatePickerOpen(false)}
        presentationStyle="pageSheet"
        visible={Platform.OS === "ios" && isDatePickerOpen}
      >
        <View className={`flex-1 px-6 pb-10 pt-6 ${isDark ? "bg-slate-900" : "bg-white"}`}>
          <View className="flex-row items-center justify-between">
            <Text className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Fecha de nacimiento
            </Text>
            <Pressable
              accessibilityRole="button"
              className={`rounded-xl px-3 py-2 ${isDark ? "bg-slate-800" : "bg-violet-50"}`}
              onPress={() => setIsDatePickerOpen(false)}
            >
              <Text className="font-semibold text-violet-600">Cancelar</Text>
            </Pressable>
          </View>
          <DateTimePicker
            display="inline"
            maximumDate={latestBirthDate}
            mode="date"
            onValueChange={handleBirthDateChange}
            themeVariant={isDark ? "dark" : "light"}
            value={selectedBirthDate}
          />
          <Pressable
            accessibilityRole="button"
            className="mt-6 min-h-14 items-center justify-center rounded-2xl bg-brand active:bg-brand-dark"
            onPress={() => {
              saveBirthDate(selectedBirthDate);
              setIsDatePickerOpen(false);
            }}
          >
            <Text className="text-base font-bold text-white">Confirmar fecha</Text>
          </Pressable>
        </View>
      </Modal>
    </AuthLayout>
  );
}
