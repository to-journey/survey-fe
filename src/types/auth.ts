import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  attributions: z.optional(z.array(z.object({
    key: z.string(),
    value: z.string(),
  }))),
})

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>

export type LoginResponse = {
  token: string
}

export type RegisterResponse = {
  token: string
}
