import z from 'zod'

export const ThumbnailItemSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

export type IThumbnailItem = z.infer<typeof ThumbnailItemSchema>
