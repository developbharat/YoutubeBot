import z from 'zod';
import { ContinuationItemSchema } from '../common/index.js';
import { PlaylistItemSchema } from './common.js';

export const APIJsonSchema = z.object({
  onResponseReceivedActions: z.array(
    z.object({
      appendContinuationItemsAction: z.object({
        continuationItems: z.array(z.union([PlaylistItemSchema, ContinuationItemSchema, z.any()]))
      })
    })
  )
});

export type IAPIJsonSchema = z.infer<typeof APIJsonSchema>;
