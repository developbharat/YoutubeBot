import z from 'zod';

export const APIResponseSchema = z.object({
  responseContext: z.object({
    visitorData: z.string(),
    serviceTrackingParams: z.array(
      z.object({
        service: z.string(),
        params: z.array(z.object({ key: z.string(), value: z.string() }))
      })
    ),
    maxAgeSeconds: z.number(),
    mainAppWebResponseContext: z.object({
      loggedOut: z.boolean(),
      trackingParam: z.string()
    }),
    webResponseContextExtensionData: z.object({ hasDecorated: z.boolean() })
  }),
  trackingParams: z.string(),
  onResponseReceivedEndpoints: z.array(
    z.object({
      clickTrackingParams: z.string(),
      appendContinuationItemsAction: z.object({
        continuationItems: z.array(
          z.object({
            aboutChannelRenderer: z.object({
              metadata: z.object({
                aboutChannelViewModel: z.object({
                  description: z.string(),
                  descriptionLabel: z.object({
                    content: z.string(),
                    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
                  }),
                  country: z.string(),
                  customLinksLabel: z.object({
                    content: z.string(),
                    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
                  }),
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
                  customUrlOnTap: z.object({
                    innertubeCommand: z.object({
                      clickTrackingParams: z.string(),
                      commandMetadata: z.object({
                        webCommandMetadata: z.object({
                          ignoreNavigation: z.boolean()
                        })
                      }),
                      shareEntityEndpoint: z.object({
                        serializedShareEntity: z.string(),
                        sharePanelType: z.string()
                      })
                    })
                  }),
                  videoCountText: z.string(),
                  signInForBusinessEmail: z.object({
                    content: z.string(),
                    commandRuns: z.array(
                      z.object({
                        startIndex: z.number(),
                        length: z.number(),
                        onTap: z.object({
                          innertubeCommand: z.object({
                            clickTrackingParams: z.string(),
                            commandMetadata: z.object({
                              webCommandMetadata: z.object({
                                url: z.string(),
                                webPageType: z.string(),
                                rootVe: z.number()
                              })
                            }),
                            signInEndpoint: z.object({
                              nextEndpoint: z.object({
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
                                  params: z.string(),
                                  canonicalBaseUrl: z.string()
                                })
                              })
                            })
                          })
                        })
                      })
                    ),
                    styleRuns: z.array(z.object({ startIndex: z.number(), length: z.number() }))
                  }),
                  links: z.array(
                    z.union([
                      z.object({
                        channelExternalLinkViewModel: z.object({
                          title: z.object({ content: z.string() }),
                          link: z.object({
                            content: z.string(),
                            commandRuns: z.array(
                              z.object({
                                startIndex: z.number(),
                                length: z.number(),
                                onTap: z.object({
                                  innertubeCommand: z.object({
                                    clickTrackingParams: z.string(),
                                    commandMetadata: z.object({
                                      webCommandMetadata: z.object({
                                        url: z.string(),
                                        webPageType: z.string(),
                                        rootVe: z.number()
                                      })
                                    }),
                                    urlEndpoint: z.object({
                                      url: z.string(),
                                      nofollow: z.boolean()
                                    })
                                  })
                                })
                              })
                            )
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
                      z.object({
                        channelExternalLinkViewModel: z.object({
                          title: z.object({ content: z.string() }),
                          link: z.object({
                            content: z.string(),
                            commandRuns: z.array(
                              z.object({
                                startIndex: z.number(),
                                length: z.number(),
                                onTap: z.object({
                                  innertubeCommand: z.object({
                                    clickTrackingParams: z.string(),
                                    commandMetadata: z.object({
                                      webCommandMetadata: z.object({
                                        url: z.string(),
                                        webPageType: z.string(),
                                        rootVe: z.number()
                                      })
                                    }),
                                    urlEndpoint: z.object({
                                      url: z.string(),
                                      target: z.string(),
                                      nofollow: z.boolean()
                                    })
                                  })
                                })
                              })
                            )
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
                      })
                    ])
                  )
                })
              }),
              shareChannel: z.object({
                buttonRenderer: z.object({
                  style: z.string(),
                  size: z.string(),
                  text: z.object({
                    runs: z.array(z.object({ text: z.string() }))
                  }),
                  icon: z.object({ iconType: z.string() }),
                  trackingParams: z.string(),
                  accessibilityData: z.object({
                    accessibilityData: z.object({ label: z.string() })
                  }),
                  command: z.object({
                    clickTrackingParams: z.string(),
                    commandMetadata: z.object({
                      webCommandMetadata: z.object({ sendPost: z.boolean() })
                    }),
                    signalServiceEndpoint: z.object({
                      signal: z.string(),
                      actions: z.array(
                        z.object({
                          clickTrackingParams: z.string(),
                          openPopupAction: z.object({
                            popup: z.object({
                              menuPopupRenderer: z.object({
                                items: z.array(
                                  z.union([
                                    z.object({
                                      menuServiceItemRenderer: z.object({
                                        text: z.object({
                                          runs: z.array(z.object({ text: z.string() }))
                                        }),
                                        trackingParams: z.string(),
                                        command: z.object({
                                          clickTrackingParams: z.string(),
                                          commandMetadata: z.object({
                                            webCommandMetadata: z.object({
                                              sendPost: z.boolean(),
                                              apiUrl: z.string()
                                            })
                                          }),
                                          shareEntityServiceEndpoint: z.object({
                                            serializedShareEntity: z.string(),
                                            commands: z.array(
                                              z.object({
                                                clickTrackingParams: z.string(),
                                                openPopupAction: z.object({
                                                  popup: z.object({
                                                    unifiedSharePanelRenderer: z.object({
                                                      trackingParams: z.string(),
                                                      showLoadingSpinner: z.boolean()
                                                    })
                                                  }),
                                                  popupType: z.string(),
                                                  beReused: z.boolean()
                                                })
                                              })
                                            )
                                          })
                                        })
                                      })
                                    }),
                                    z.object({
                                      menuServiceItemRenderer: z.object({
                                        text: z.object({
                                          runs: z.array(z.object({ text: z.string() }))
                                        }),
                                        trackingParams: z.string(),
                                        command: z.object({
                                          clickTrackingParams: z.string(),
                                          copyTextEndpoint: z.object({
                                            text: z.string(),
                                            successActions: z.array(
                                              z.object({
                                                clickTrackingParams: z.string(),
                                                commandMetadata: z.object({
                                                  webCommandMetadata: z.object({
                                                    sendPost: z.boolean()
                                                  })
                                                }),
                                                signalServiceEndpoint: z.object({
                                                  signal: z.string(),
                                                  actions: z.array(
                                                    z.object({
                                                      clickTrackingParams: z.string(),
                                                      openPopupAction: z.object({
                                                        popup: z.object({
                                                          notificationActionRenderer: z.object({
                                                            responseText: z.object({
                                                              runs: z.array(
                                                                z.object({
                                                                  text: z.string()
                                                                })
                                                              )
                                                            }),
                                                            trackingParams: z.string()
                                                          })
                                                        }),
                                                        popupType: z.string()
                                                      })
                                                    })
                                                  )
                                                })
                                              })
                                            )
                                          })
                                        })
                                      })
                                    })
                                  ])
                                )
                              })
                            }),
                            popupType: z.string()
                          })
                        })
                      )
                    })
                  })
                })
              })
            })
          })
        ),
        targetId: z.string()
      })
    })
  )
});

export type IAPIResonseSchema = z.infer<typeof APIResponseSchema>;
