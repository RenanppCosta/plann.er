import z from "zod";

export const tripSchema = z.object({
    destination: z.string().min(4),
    starts_at: z.coerce.date(),
    ends_at: z.coerce.date(),
}).refine(data => data.starts_at < data.ends_at, {
    message: "A data de início não pode ser antes da data de término.",
    path: ["starts_at"],
})