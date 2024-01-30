import { z } from 'zod';
import { ThumbnailItemSchema } from '../common/Thumbnail.js';

export const PlaylistVideoSchema = z.object({
  playlistVideoRenderer: z.object({
    videoId: z.string(),
    thumbnail: z.object({
      thumbnails: z.array(ThumbnailItemSchema)
    }),
    title: z.object({
      runs: z.array(z.object({ text: z.string() }))
    }),
    index: z.object({ simpleText: z.string() }),
    shortBylineText: z.object({
      runs: z.array(
        z.object({
          text: z.string(),
          browseEndpoint: z.object({
            browseId: z.string(),
            canonicalBaseUrl: z.string()
          })
        })
      )
    }),
    lengthText: z.object({
      accessibility: z.object({
        accessibilityData: z.object({
          label: z.string()
        })
      }),
      simpleText: z.string()
    }),
    lengthSeconds: z.string(),
    videoInfo: z.object({
      runs: z.array(z.object({ text: z.string() }))
    })
  })
});

export const WebJsonHeaderSchema = z.object({
  playlistId: z.string(),
  title: z.object({ simpleText: z.string() }),
  numVideosText: z.object({
    runs: z.array(z.object({ text: z.string() }))
  }),
  descriptionText: z.object({ simpleText: z.string() }),
  ownerText: z.object({
    runs: z.array(
      z.object({
        text: z.string(),
        navigationEndpoint: z.object({
          browseEndpoint: z.object({
            browseId: z.string(),
            canonicalBaseUrl: z.string()
          })
        })
      })
    )
  }),
  viewCountText: z.object({ simpleText: z.string() }),
  privacy: z.string(),
  ownerEndpoint: z.object({
    browseEndpoint: z.object({
      browseId: z.string(),
      canonicalBaseUrl: z.string()
    })
  }),
  playlistHeaderBanner: z.object({
    heroPlaylistThumbnailRenderer: z.object({
      thumbnail: z.object({
        thumbnails: z.array(
          z.object({
            url: z.string(),
            width: z.number(),
            height: z.number()
          })
        )
      })
    })
  }),
  byline: z.array(
    z.union([
      z.object({
        playlistBylineRenderer: z.object({
          text: z.object({ runs: z.array(z.object({ text: z.string() })) })
        })
      }),
      z.object({
        playlistBylineRenderer: z.object({
          text: z.object({ simpleText: z.string() })
        })
      })
    ])
  )
});

export type IPlaylistVideoSchema = z.infer<typeof PlaylistVideoSchema>;
export type IWebJsonHeaderSchema = z.infer<typeof WebJsonHeaderSchema>;
