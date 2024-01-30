import { z } from 'zod';
import { ContinuationItemSchema } from '../common/ContinuationItemSchema.js';
import { PlaylistVideoItemSchema } from './PlaylistVideoItemSchema.js';

export const InitialRequestSchema = z.object({
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
                      itemSectionRenderer: PlaylistVideoItemSchema
                    }),
                    ContinuationItemSchema
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
    playlistHeaderRenderer: z.object({
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
              clickTrackingParams: z.string(),
              commandMetadata: z.object({
                webCommandMetadata: z.object({
                  url: z.string(),
                  webPageType: z.string(),
                  rootVe: z.number(),
                  apiUrl: z.string()
                })
              }),
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
        clickTrackingParams: z.string(),
        commandMetadata: z.object({
          webCommandMetadata: z.object({
            url: z.string(),
            webPageType: z.string(),
            rootVe: z.number(),
            apiUrl: z.string()
          })
        }),
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

      onDescriptionTap: z.object({
        clickTrackingParams: z.string(),
        openPopupAction: z.object({
          popup: z.object({
            fancyDismissibleDialogRenderer: z.object({
              dialogMessage: z.object({
                runs: z.array(z.object({ text: z.string() }))
              }),
              title: z.object({
                runs: z.array(z.object({ text: z.string() }))
              }),
              confirmLabel: z.object({
                runs: z.array(z.object({ text: z.string() }))
              }),
              trackingParams: z.string()
            })
          }),
          popupType: z.string()
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
    })
  }),
  metadata: z.object({
    playlistMetadataRenderer: z.object({
      title: z.string(),
      description: z.string()
    })
  })
  // sidebar: z.object({
  //   playlistSidebarRenderer: z.object({
  //     items: z.array(
  //       z.union([
  //         z.object({
  //           playlistSidebarPrimaryInfoRenderer: z.object({
  //             thumbnailRenderer: z.object({
  //               playlistVideoThumbnailRenderer: z.object({
  //                 thumbnail: z.object({
  //                   thumbnails: z.array(
  //                     z.object({
  //                       url: z.string(),
  //                       width: z.number(),
  //                       height: z.number()
  //                     })
  //                   )
  //                 }),
  //                 trackingParams: z.string()
  //               })
  //             }),
  //             title: z.object({
  //               runs: z.array(
  //                 z.object({
  //                   text: z.string(),
  //                   navigationEndpoint: z.object({
  //                     clickTrackingParams: z.string(),
  //                     commandMetadata: z.object({
  //                       webCommandMetadata: z.object({
  //                         url: z.string(),
  //                         webPageType: z.string(),
  //                         rootVe: z.number()
  //                       })
  //                     }),
  //                     watchEndpoint: z.object({
  //                       videoId: z.string(),
  //                       playlistId: z.string(),
  //                       playerParams: z.string(),
  //                       loggingContext: z.object({
  //                         vssLoggingContext: z.object({
  //                           serializedContextData: z.string()
  //                         })
  //                       }),
  //                       watchEndpointSupportedOnesieConfig: z.object({
  //                         html5PlaybackOnesieConfig: z.object({
  //                           commonConfig: z.object({ url: z.string() })
  //                         })
  //                       })
  //                     })
  //                   })
  //                 })
  //               )
  //             }),
  //             stats: z.array(
  //               z.union([
  //                 z.object({ runs: z.array(z.object({ text: z.string() })) }),
  //                 z.object({ simpleText: z.string() })
  //               ])
  //             ),
  //             menu: z.object({
  //               menuRenderer: z.object({
  //                 items: z.array(
  //                   z.object({
  //                     menuNavigationItemRenderer: z.object({
  //                       text: z.object({ simpleText: z.string() }),
  //                       icon: z.object({ iconType: z.string() }),
  //                       navigationEndpoint: z.object({
  //                         clickTrackingParams: z.string(),
  //                         commandMetadata: z.object({
  //                           webCommandMetadata: z.object({
  //                             ignoreNavigation: z.boolean()
  //                           })
  //                         }),
  //                         modalEndpoint: z.object({
  //                           modal: z.object({
  //                             modalWithTitleAndButtonRenderer: z.object({
  //                               title: z.object({ simpleText: z.string() }),
  //                               content: z.object({ simpleText: z.string() }),
  //                               button: z.object({
  //                                 buttonRenderer: z.object({
  //                                   style: z.string(),
  //                                   size: z.string(),
  //                                   isDisabled: z.boolean(),
  //                                   text: z.object({
  //                                     runs: z.array(z.object({ text: z.string() }))
  //                                   }),
  //                                   navigationEndpoint: z.object({
  //                                     clickTrackingParams: z.string(),
  //                                     commandMetadata: z.object({
  //                                       webCommandMetadata: z.object({
  //                                         url: z.string(),
  //                                         webPageType: z.string(),
  //                                         rootVe: z.number()
  //                                       })
  //                                     }),
  //                                     signInEndpoint: z.object({
  //                                       nextEndpoint: z.object({
  //                                         clickTrackingParams: z.string(),
  //                                         commandMetadata: z.object({
  //                                           webCommandMetadata: z.object({
  //                                             url: z.string(),
  //                                             webPageType: z.string(),
  //                                             rootVe: z.number(),
  //                                             apiUrl: z.string()
  //                                           })
  //                                         }),
  //                                         browseEndpoint: z.object({
  //                                           browseId: z.string()
  //                                         })
  //                                       })
  //                                     })
  //                                   }),
  //                                   trackingParams: z.string()
  //                                 })
  //                               })
  //                             })
  //                           })
  //                         })
  //                       }),
  //                       trackingParams: z.string()
  //                     })
  //                   })
  //                 ),
  //                 trackingParams: z.string(),
  //                 topLevelButtons: z.array(
  //                   z.union([
  //                     z.object({
  //                       toggleButtonRenderer: z.object({
  //                         style: z.object({ styleType: z.string() }),
  //                         size: z.object({ sizeType: z.string() }),
  //                         isToggled: z.boolean(),
  //                         isDisabled: z.boolean(),
  //                         defaultIcon: z.object({ iconType: z.string() }),
  //                         toggledIcon: z.object({ iconType: z.string() }),
  //                         trackingParams: z.string(),
  //                         defaultTooltip: z.string(),
  //                         toggledTooltip: z.string(),
  //                         defaultNavigationEndpoint: z.object({
  //                           clickTrackingParams: z.string(),
  //                           commandMetadata: z.object({
  //                             webCommandMetadata: z.object({
  //                               ignoreNavigation: z.boolean()
  //                             })
  //                           }),
  //                           modalEndpoint: z.object({
  //                             modal: z.object({
  //                               modalWithTitleAndButtonRenderer: z.object({
  //                                 title: z.object({ simpleText: z.string() }),
  //                                 content: z.object({ simpleText: z.string() }),
  //                                 button: z.object({
  //                                   buttonRenderer: z.object({
  //                                     style: z.string(),
  //                                     size: z.string(),
  //                                     isDisabled: z.boolean(),
  //                                     text: z.object({
  //                                       simpleText: z.string()
  //                                     }),
  //                                     navigationEndpoint: z.object({
  //                                       clickTrackingParams: z.string(),
  //                                       commandMetadata: z.object({
  //                                         webCommandMetadata: z.object({
  //                                           url: z.string(),
  //                                           webPageType: z.string(),
  //                                           rootVe: z.number()
  //                                         })
  //                                       }),
  //                                       signInEndpoint: z.object({
  //                                         nextEndpoint: z.object({
  //                                           clickTrackingParams: z.string(),
  //                                           commandMetadata: z.object({
  //                                             webCommandMetadata: z.object({
  //                                               url: z.string(),
  //                                               webPageType: z.string(),
  //                                               rootVe: z.number(),
  //                                               apiUrl: z.string()
  //                                             })
  //                                           }),
  //                                           browseEndpoint: z.object({
  //                                             browseId: z.string()
  //                                           })
  //                                         }),
  //                                         idamTag: z.string()
  //                                       })
  //                                     }),
  //                                     trackingParams: z.string()
  //                                   })
  //                                 })
  //                               })
  //                             })
  //                           })
  //                         }),
  //                         accessibilityData: z.object({
  //                           accessibilityData: z.object({ label: z.string() })
  //                         }),
  //                         toggledAccessibilityData: z.object({
  //                           accessibilityData: z.object({ label: z.string() })
  //                         })
  //                       })
  //                     }),
  //                     z.object({
  //                       buttonRenderer: z.object({
  //                         style: z.string(),
  //                         size: z.string(),
  //                         isDisabled: z.boolean(),
  //                         icon: z.object({ iconType: z.string() }),
  //                         navigationEndpoint: z.object({
  //                           clickTrackingParams: z.string(),
  //                           commandMetadata: z.object({
  //                             webCommandMetadata: z.object({
  //                               url: z.string(),
  //                               webPageType: z.string(),
  //                               rootVe: z.number()
  //                             })
  //                           }),
  //                           watchEndpoint: z.object({
  //                             videoId: z.string(),
  //                             playlistId: z.string(),
  //                             params: z.string(),
  //                             playerParams: z.string(),
  //                             loggingContext: z.object({
  //                               vssLoggingContext: z.object({
  //                                 serializedContextData: z.string()
  //                               })
  //                             }),
  //                             watchEndpointSupportedOnesieConfig: z.object({
  //                               html5PlaybackOnesieConfig: z.object({
  //                                 commonConfig: z.object({ url: z.string() })
  //                               })
  //                             })
  //                           })
  //                         }),
  //                         accessibility: z.object({ label: z.string() }),
  //                         tooltip: z.string(),
  //                         trackingParams: z.string()
  //                       })
  //                     }),
  //                     z.object({
  //                       buttonRenderer: z.object({
  //                         style: z.string(),
  //                         size: z.string(),
  //                         isDisabled: z.boolean(),
  //                         serviceEndpoint: z.object({
  //                           clickTrackingParams: z.string(),
  //                           commandMetadata: z.object({
  //                             webCommandMetadata: z.object({
  //                               sendPost: z.boolean(),
  //                               apiUrl: z.string()
  //                             })
  //                           }),
  //                           shareEntityServiceEndpoint: z.object({
  //                             serializedShareEntity: z.string(),
  //                             commands: z.array(
  //                               z.object({
  //                                 clickTrackingParams: z.string(),
  //                                 openPopupAction: z.object({
  //                                   popup: z.object({
  //                                     unifiedSharePanelRenderer: z.object({
  //                                       trackingParams: z.string(),
  //                                       showLoadingSpinner: z.boolean()
  //                                     })
  //                                   }),
  //                                   popupType: z.string(),
  //                                   beReused: z.boolean()
  //                                 })
  //                               })
  //                             )
  //                           })
  //                         }),
  //                         icon: z.object({ iconType: z.string() }),
  //                         accessibility: z.object({ label: z.string() }),
  //                         tooltip: z.string(),
  //                         trackingParams: z.string()
  //                       })
  //                     })
  //                   ])
  //                 ),
  //                 accessibility: z.object({
  //                   accessibilityData: z.object({ label: z.string() })
  //                 })
  //               })
  //             }),
  //             thumbnailOverlays: z.array(
  //               z.object({
  //                 thumbnailOverlaySidePanelRenderer: z.object({
  //                   text: z.object({ simpleText: z.string() }),
  //                   icon: z.object({ iconType: z.string() })
  //                 })
  //               })
  //             ),
  //             navigationEndpoint: z.object({
  //               clickTrackingParams: z.string(),
  //               commandMetadata: z.object({
  //                 webCommandMetadata: z.object({
  //                   url: z.string(),
  //                   webPageType: z.string(),
  //                   rootVe: z.number()
  //                 })
  //               }),
  //               watchEndpoint: z.object({
  //                 videoId: z.string(),
  //                 playlistId: z.string(),
  //                 playerParams: z.string(),
  //                 loggingContext: z.object({
  //                   vssLoggingContext: z.object({
  //                     serializedContextData: z.string()
  //                   })
  //                 }),
  //                 watchEndpointSupportedOnesieConfig: z.object({
  //                   html5PlaybackOnesieConfig: z.object({
  //                     commonConfig: z.object({ url: z.string() })
  //                   })
  //                 })
  //               })
  //             }),
  //             description: z.object({ simpleText: z.string() }),
  //             showMoreText: z.object({
  //               runs: z.array(z.object({ text: z.string() }))
  //             })
  //           })
  //         }),
  //         z.object({
  //           playlistSidebarSecondaryInfoRenderer: z.object({
  //             videoOwner: z.object({
  //               videoOwnerRenderer: z.object({
  //                 thumbnail: z.object({
  //                   thumbnails: z.array(
  //                     z.object({
  //                       url: z.string(),
  //                       width: z.number(),
  //                       height: z.number()
  //                     })
  //                   )
  //                 }),
  //                 title: z.object({
  //                   runs: z.array(
  //                     z.object({
  //                       text: z.string(),
  //                       navigationEndpoint: z.object({
  //                         clickTrackingParams: z.string(),
  //                         commandMetadata: z.object({
  //                           webCommandMetadata: z.object({
  //                             url: z.string(),
  //                             webPageType: z.string(),
  //                             rootVe: z.number(),
  //                             apiUrl: z.string()
  //                           })
  //                         }),
  //                         browseEndpoint: z.object({
  //                           browseId: z.string(),
  //                           canonicalBaseUrl: z.string()
  //                         })
  //                       })
  //                     })
  //                   )
  //                 }),
  //                 navigationEndpoint: z.object({
  //                   clickTrackingParams: z.string(),
  //                   commandMetadata: z.object({
  //                     webCommandMetadata: z.object({
  //                       url: z.string(),
  //                       webPageType: z.string(),
  //                       rootVe: z.number(),
  //                       apiUrl: z.string()
  //                     })
  //                   }),
  //                   browseEndpoint: z.object({
  //                     browseId: z.string(),
  //                     canonicalBaseUrl: z.string()
  //                   })
  //                 }),
  //                 trackingParams: z.string()
  //               })
  //             }),
  //             button: z.object({
  //               buttonRenderer: z.object({
  //                 style: z.string(),
  //                 size: z.string(),
  //                 isDisabled: z.boolean(),
  //                 text: z.object({
  //                   runs: z.array(z.object({ text: z.string() }))
  //                 }),
  //                 navigationEndpoint: z.object({
  //                   clickTrackingParams: z.string(),
  //                   commandMetadata: z.object({
  //                     webCommandMetadata: z.object({
  //                       ignoreNavigation: z.boolean()
  //                     })
  //                   }),
  //                   modalEndpoint: z.object({
  //                     modal: z.object({
  //                       modalWithTitleAndButtonRenderer: z.object({
  //                         title: z.object({ simpleText: z.string() }),
  //                         content: z.object({ simpleText: z.string() }),
  //                         button: z.object({
  //                           buttonRenderer: z.object({
  //                             style: z.string(),
  //                             size: z.string(),
  //                             isDisabled: z.boolean(),
  //                             text: z.object({ simpleText: z.string() }),
  //                             navigationEndpoint: z.object({
  //                               clickTrackingParams: z.string(),
  //                               commandMetadata: z.object({
  //                                 webCommandMetadata: z.object({
  //                                   url: z.string(),
  //                                   webPageType: z.string(),
  //                                   rootVe: z.number()
  //                                 })
  //                               }),
  //                               signInEndpoint: z.object({
  //                                 nextEndpoint: z.object({
  //                                   clickTrackingParams: z.string(),
  //                                   commandMetadata: z.object({
  //                                     webCommandMetadata: z.object({
  //                                       url: z.string(),
  //                                       webPageType: z.string(),
  //                                       rootVe: z.number(),
  //                                       apiUrl: z.string()
  //                                     })
  //                                   }),
  //                                   browseEndpoint: z.object({
  //                                     browseId: z.string()
  //                                   })
  //                                 }),
  //                                 continueAction: z.string(),
  //                                 idamTag: z.string()
  //                               })
  //                             }),
  //                             trackingParams: z.string()
  //                           })
  //                         })
  //                       })
  //                     })
  //                   })
  //                 }),
  //                 trackingParams: z.string()
  //               })
  //             })
  //           })
  //         })
  //       ])
  //     ),
  //     trackingParams: z.string()
  //   })
  // })
});

export type IInitialRequestSchema = z.infer<typeof InitialRequestSchema>;
