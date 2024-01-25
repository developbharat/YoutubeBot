import { z } from 'zod';
import { ThumbnailItemSchema } from '../common/Thumbnail.js';

export const PlaylistVideoItemSchema = z.object({
  contents: z.array(
    z.object({
      playlistVideoListRenderer: z.object({
        contents: z.array(
          z.object({
            playlistVideoRenderer: z.object({
              videoId: z.string(),
              thumbnail: z.object({
                thumbnails: z.array(ThumbnailItemSchema)
              }),
              title: z.object({
                runs: z.array(z.object({ text: z.string() }))
              }),
              index: z.object({ simpleText: z.string() }),
              lengthText: z.object({
                accessibility: z.object({
                  accessibilityData: z.object({
                    label: z.string()
                  })
                }),
                simpleText: z.string()
              })
            }),
            lengthSeconds: z.string(),
            isPlayable: z.boolean(),
            videoInfo: z.object({
              runs: z.array(z.object({ text: z.string() }))
            })
          })
        ),
        playlistId: z.string(),
        isEditable: z.boolean(),
        canReorder: z.boolean()
      })
    })
  )
});

export type IPlaylistVideoItemSchema = z.infer<typeof PlaylistVideoItemSchema>;
