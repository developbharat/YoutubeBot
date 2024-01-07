import z from 'zod';
import { PlaylistItemSchema } from './PlaylistItemSchema.js';
import { ContinuationItemSchema } from '../common/ContinuationItemSchema.js';

export const PlaylistArrayAPIResponse = z.object({
  onResponseReceivedActions: z.array(
    z.object({
      clickTrackingParams: z.string(),
      appendContinuationItemsAction: z.object({
        continuationItems: z.array(z.union([PlaylistItemSchema, ContinuationItemSchema, z.any()])),
        targetId: z.string()
      })
    })
  )
});

export type IPlaylistArrayAPIResponse = z.infer<typeof PlaylistArrayAPIResponse>;

export const isPlaylistArrayAPIResponse = (data: any): boolean => {
  const status = PlaylistArrayAPIResponse.safeParse(data);
  if (!status.success) {
    console.log(JSON.stringify(status, null, 2));
  }
  return status.success;
};
