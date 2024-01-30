import { z } from 'zod';
import { ContinuationItemSchema } from '../common/ContinuationItemSchema.js';
import { PlaylistVideoSchema, WebJsonHeaderSchema } from './common.js';

export const WebpageJsonSchema = z.object({
  contents: z.object({
    twoColumnBrowseResultsRenderer: z.object({
      tabs: z.array(
        z.object({
          tabRenderer: z.object({
            content: z.object({
              sectionListRenderer: z.object({
                contents: z.array(
                  z.union([
                    z.object({
                      itemSectionRenderer: z.array(
                        z.object({
                          contents: z.array(z.union([PlaylistVideoSchema, ContinuationItemSchema]))
                        })
                      )
                    }),
                    z.any()
                  ])
                )
              })
            })
          })
        })
      )
    })
  }),
  header: z.object({
    playlistHeaderRenderer: WebJsonHeaderSchema
  })
});

export type IWebpageJsonSchema = z.infer<typeof WebpageJsonSchema>;
