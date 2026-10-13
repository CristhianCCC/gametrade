export const cities = [
  { value: "BOGOTA", label: "Bogotá" },
  { value: "MEDELLIN", label: "Medellín" },
  { value: "CALI", label: "Cali" },
  { value: "BARRANQUILLA", label: "Barranquilla" },
  { value: "CARTAGENA", label: "Cartagena" },
  { value: "CUCUTA", label: "Cúcuta" },
  { value: "BUCARAMANGA", label: "Bucaramanga" },
  { value: "PEREIRA", label: "Pereira" },
  { value: "SANTA_MARTA", label: "Santa Marta" },
  { value: "IBAGUE", label: "Ibagué" },
  { value: "MANIZALES", label: "Manizales" },
  { value: "VILLAVICENCIO", label: "Villavicencio" },
  { value: "PASTO", label: "Pasto" },
  { value: "MONTERIA", label: "Montería" },
  { value: "NEIVA", label: "Neiva" },
  { value: "ARMENIA", label: "Armenia" },
  { value: "POPAYAN", label: "Popayán" },
  { value: "VALLEDUPAR", label: "Valledupar" },
  { value: "SINCELEJO", label: "Sincelejo" },
  { value: "TUNJA", label: "Tunja" },
  { value: "RIOHACHA", label: "Riohacha" },
  { value: "QUIBDO", label: "Quibdó" },
  { value: "FLORENCIA", label: "Florencia" },
  { value: "YOPAL", label: "Yopal" },
  { value: "LETICIA", label: "Leticia" },
  { value: "MOCOA", label: "Mocoa" },
  { value: "PUERTO_CARRENO", label: "Puerto Carreño" },
  { value: "INIRIDA", label: "Inírida" },
  { value: "SAN_JOSE_DEL_GUAVIARE", label: "San José del Guaviare" },
  { value: "MITU", label: "Mitú" },
  { value: "ARAUCA", label: "Arauca" },
  { value: "SAN_ANDRES", label: "San Andrés" },
] as const;

export type City = (typeof cities)[number]["value"];

export function getCityLabel(city?: City) {
  return cities.find((option) => option.value === city)?.label;
}
