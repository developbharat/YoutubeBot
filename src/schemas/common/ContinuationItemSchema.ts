import z from 'zod';

export const ContinuationItemSchema = z.object({
  continuationItemRenderer: z.object({
    continuationEndpoint: z.object({
      commandMetadata: z.object({
        webCommandMetadata: z.object({
          sendPost: z.boolean(),
          apiUrl: z.string()
        })
      }),
      continuationCommand: z.object({
        token: z.string(),
        request: z.string()
      })
    })
  })
});

export type IContinuationItemSchema = z.infer<typeof ContinuationItemSchema>;

export const isContinuationItem = (data: any): boolean => {
  const { success } = ContinuationItemSchema.safeParse(data);
  return success;
};
