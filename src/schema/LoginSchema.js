import * as z from "zod"

export const LoginSchema = z
    .object({
        email: z
            .string()
            .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),

            password: z.string().regex(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Password must be at least 8 characters and include uppercase, lowercase, and number'
            )

    })

