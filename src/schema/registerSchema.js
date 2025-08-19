import * as z from "zod"

export const registerSchema = z.object({
    name: z.string()
        .min(3, 'min length 3')
        .max(50, 'max length 50'),

    email: z.string()
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),

    password: z.string().regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Password must be at least 8 characters and include uppercase, lowercase, and number'
    )

    ,
    rePassword: z.string(),

    dateOfBirth: z.coerce.date()
        .min(new Date("1900-01-01"), { message: "Too old!" })
        .max(new Date(), { message: "Date must be in the past!" }),

    gender: z.string()
        .regex(/^(male|female)$/, 'invalid gender')
})
    .refine((data) => data.password === data.rePassword, {
        message: "password and rePassword must be same",
        path: ['rePassword'],
    });

