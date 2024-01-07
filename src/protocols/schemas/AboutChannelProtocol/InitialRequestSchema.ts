import z from 'zod';
import { ContinuationItemSchema } from '../common/ContinuationItemSchema.js';

export const InitialRequestSchema = z.object({
  header: z.object({
    c4TabbedHeaderRenderer: z.object({
      channelId: z.string(),
      title: z.string(),
      avatar: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      banner: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      badges: z.array(
        z.object({
          metadataBadgeRenderer: z.object({
            icon: z.object({ iconType: z.string() }),
            style: z.string(),
            tooltip: z.string(),
            trackingParams: z.string(),
            accessibilityData: z.object({ label: z.string() })
          })
        })
      ),
      subscriberCountText: z.object({
        accessibility: z.object({
          accessibilityData: z.object({ label: z.string() })
        }),
        simpleText: z.string()
      }),
      tvBanner: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      mobileBanner: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      channelHandleText: z.object({
        runs: z.array(z.object({ text: z.string() }))
      }),
      videosCountText: z.object({
        runs: z.array(z.object({ text: z.string() }))
      }),
      tagline: z.object({
        channelTaglineRenderer: z.object({
          content: z.string(),
          maxLines: z.number(),
          moreLabel: z.string(),
          moreEndpoint: z.object({
            showEngagementPanelEndpoint: z.object({
              engagementPanel: z.object({
                engagementPanelSectionListRenderer: z.object({
                  content: z.object({
                    sectionListRenderer: z.object({
                      contents: z.array(
                        z.object({
                          itemSectionRenderer: z.object({
                            contents: z.array(ContinuationItemSchema)
                          })
                        })
                      )
                    })
                  })
                })
              })
            })
          }),
          moreIcon: z.object({ iconType: z.string() })
        })
      })
    })
  }),
  metadata: z.object({
    channelMetadataRenderer: z.object({
      title: z.string(),
      description: z.string(),
      rssUrl: z.string(),
      channelConversionUrl: z.string(),
      externalId: z.string(),
      keywords: z.string(),
      ownerUrls: z.array(z.string()),
      avatar: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      channelUrl: z.string(),
      isFamilySafe: z.boolean(),
      facebookProfileId: z.string().optional(),
      availableCountryCodes: z.array(z.string()).default([]),
      androidDeepLink: z.string(),
      androidAppindexingLink: z.string(),
      iosAppindexingLink: z.string(),
      vanityChannelUrl: z.string()
    })
  }),
  microformat: z.object({
    microformatDataRenderer: z.object({
      urlCanonical: z.string(),
      title: z.string(),
      description: z.string(),
      thumbnail: z.object({
        thumbnails: z.array(z.object({ url: z.string(), width: z.number(), height: z.number() }))
      }),
      siteName: z.string(),
      appName: z.string(),
      androidPackage: z.string(),
      iosAppStoreId: z.string(),
      iosAppArguments: z.string(),
      ogType: z.string(),
      urlApplinksWeb: z.string(),
      urlApplinksIos: z.string(),
      urlApplinksAndroid: z.string(),
      urlTwitterIos: z.string(),
      urlTwitterAndroid: z.string(),
      twitterCardType: z.string(),
      twitterSiteHandle: z.string(),
      schemaDotOrgType: z.string(),
      noindex: z.boolean(),
      unlisted: z.boolean(),
      familySafe: z.boolean(),
      tags: z.array(z.string()),
      availableCountries: z.array(z.string().length(2)),
      linkAlternates: z.array(z.object({ hrefUrl: z.string() }))
    })
  })
});

export type IInitialRequestSchema = z.infer<typeof InitialRequestSchema>;
