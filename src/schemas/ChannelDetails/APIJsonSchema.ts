import z from 'zod';

export const MetadataSchema = z.object({
  description: z.string(),
  descriptionLabel: z.object({
    content: z.string(),
    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
  }),
  country: z.string(),
  subscriberCountText: z.string(),
  viewCountText: z.string(),
  joinedDateText: z.object({
    content: z.string(),
    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
  }),
  canonicalChannelUrl: z.string(),
  channelId: z.string(),
  additionalInfoLabel: z.object({
    content: z.string(),
    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
  }),
  videoCountText: z.string(),
  links: z
    .array(
      z.union([
        z.object({
          channelExternalLinkViewModel: z.object({
            title: z.object({ content: z.string() }),
            link: z.object({
              content: z.string()
            }),
            favicon: z.object({
              sources: z.array(
                z.object({
                  url: z.string(),
                  width: z.number(),
                  height: z.number()
                })
              )
            })
          })
        }),
        z.any()
      ])
    )
    .optional()
});

export const APIJsonSchema = z.object({
  onResponseReceivedEndpoints: z.array(
    z.object({
      appendContinuationItemsAction: z.object({
        continuationItems: z.array(
          z.object({
            aboutChannelRenderer: z.object({
              metadata: z.object({
                aboutChannelViewModel: MetadataSchema
              })
            })
          })
        )
      })
    })
  )
});

export type IAPIJsonSchema = z.infer<typeof APIJsonSchema>;
export type IMetadataSchema = z.infer<typeof MetadataSchema>;
