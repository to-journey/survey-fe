import { z } from "zod"

export const userAttributionSchema = z.object({
  name: z.string().min(1),
  defaultValue: z.string(),
})

export type UserAttribution = z.infer<typeof userAttributionSchema> & {
  id?: string
}
