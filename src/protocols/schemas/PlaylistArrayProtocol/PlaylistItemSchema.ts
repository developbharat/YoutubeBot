import z from 'zod';
import { ThumbnailItemSchema } from '../common/Thumbnail.js';

export const PlaylistItemSchema = z.object({
  gridPlaylistRenderer: z.object({
    playlistId: z.string(),
    thumbnail: z.object({
      thumbnails: z.array(ThumbnailItemSchema)
    }),
    title: z.object({
      runs: z.array(
        z.object({
          text: z.string()
        })
      )
    }),
    videoCountText: z.object({ runs: z.array(z.object({ text: z.string() })) }),
    publishedTimeText: z.object({ simpleText: z.string() }).optional(),
    videoCountShortText: z.object({ simpleText: z.string() })
  })
});

export type IPlaylistItemSchema = z.infer<typeof PlaylistItemSchema>;

export const isPlaylistItem = (data: any): boolean => {
  const parsed = PlaylistItemSchema.safeParse(data);
  return parsed.success;
};
