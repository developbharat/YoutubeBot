import z from 'zod';
import { PlaylistItemSchema } from './PlaylistItemSchema.js';
import { ContinuationItemSchema } from '../common/ContinuationItemSchema.js';

export const InitialRequestTabSchema = z.object({
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

export type IInitialRequestTabSchema = z.infer<typeof InitialRequestTabSchema>;

export const isInitialRequestTab = (data: any): boolean => {
  const parsed = InitialRequestTabSchema.safeParse(data);
  return parsed.success;
};
