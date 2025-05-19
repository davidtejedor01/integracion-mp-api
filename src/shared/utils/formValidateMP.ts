import z from 'zod'

export const formSchema = z.object({
    dni: z.string({
        required_error: " El DNI es requerido",
        invalid_type_error: "El DNI es invalido",
    })
        .regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos numéricos"),
    name: z.string({
        required_error: " es requerido",
        invalid_type_error: "El Nombre no puede ser numerico",
    })
        .min(1, "El nombre no puede estar vacío")
    ,
    last_name: z.string({
        required_error: " es requerido",
        invalid_type_error: "El Apellido no puede ser numerico ",

    }).min(1, "El apellido no puede estar vacío")
});

export type FormPreference = z.infer<typeof formSchema> // schema zod transformado a type de TS
