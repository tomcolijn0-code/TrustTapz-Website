import { z } from "zod";

export const PRIJZEN: Record<number, number> = {
  1: 19.95,
  5: 79,
  10: 139,
  25: 279,
};

export const bestellenSchema = z.object({
  bedrijfsnaam: z.string().min(1, "Vul je bedrijfsnaam in"),
  contactpersoon: z.string().min(1, "Vul de naam van de contactpersoon in"),
  email: z.string().email("Vul een geldig e-mailadres in"),
  telefoon: z
    .string()
    .min(10, "Vul een geldig telefoonnummer in")
    .regex(/^[0-9\s\+\-\(\)]+$/, "Vul een geldig telefoonnummer in"),
  googleMapsUrl: z
    .string()
    .url("Vul een geldige URL in")
    .refine(
      (url) => url.includes("google") || url.includes("maps"),
      "Vul de Google Maps URL van je bedrijf in"
    ),
  aantalKaarten: z.number().refine((n) => n in PRIJZEN, {
    message: "Kies een geldig aantal kaarten",
  }),
  opmerking: z.string().max(500, "Maximaal 500 tekens").optional(),
});

export type BestellenFormData = z.infer<typeof bestellenSchema>;
