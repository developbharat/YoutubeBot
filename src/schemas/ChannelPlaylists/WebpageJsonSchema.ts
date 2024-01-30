import z from 'zod';
import { ContinuationItemSchema } from '../common/index.js';
import { PlaylistItemSchema } from './common.js';

export const TabDataSchema = z.object({
  tabRenderer: z.object({
    title: z.string(),
    selected: z.boolean(),
    content: z.object({
      sectionListRenderer: z.object({
        contents: z.array(
          z.object({
            itemSectionRenderer: z.object({
              contents: z.array(
                z.object({
                  gridRenderer: z.object({
                    items: z.array(z.union([PlaylistItemSchema, ContinuationItemSchema, z.any()]))
                  })
                })
              )
            })
          })
        ),
        disablePullToRefresh: z.boolean()
      })
    })
  })
});

export const WebpageJsonSchema = z.object({
  contents: z.object({
    twoColumnBrowseResultsRenderer: z.object({
      tabs: z.array(z.union([TabDataSchema, z.any()]))
    })
  })
});

export type IWebpageJsonSchema = z.infer<typeof WebpageJsonSchema>;
export type ITabDataSchema = z.infer<typeof TabDataSchema>;
