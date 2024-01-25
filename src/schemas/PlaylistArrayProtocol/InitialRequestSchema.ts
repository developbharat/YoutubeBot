import z from 'zod';
import { InitialRequestTabSchema } from './InitialRequestTabSchema.js';

export const InitialRequestSchema = z.object({
  contents: z.object({
    twoColumnBrowseResultsRenderer: z.object({
      tabs: z.array(z.union([InitialRequestTabSchema, z.any()]))
    })
  })
});

export type IInitialRequestSchema = z.infer<typeof InitialRequestSchema>;

export const isInitialRequest = (data: any): boolean => {
  const parsed = InitialRequestSchema.safeParse(data);
  return parsed.success;
};
