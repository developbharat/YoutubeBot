import { DataClass } from '../common/IDataClass.js';
import { IThumbnail, Thumbnail } from '../common/index.js';
import { IPlaylistVideoItem, PlaylistVideoItem } from './PlaylistVideoItem.js';

export type IPlaylistDetails = Omit<PlaylistDetails, keyof DataClass>;

export class PlaylistDetails extends DataClass {
  public readonly thumbnail: IThumbnail; // Playlist thumbnail image
  public readonly name: string; // name of playlist
  public readonly description: string; // playlist description
  public readonly totalVideosCountText: string; // total videos available in playlist
  public readonly totalVideosCount: string; // total videos available in playlist
  public readonly totalViewsCountText: string; // total views on videos in playlist
  public readonly totalViewsCount: string; // total views on videos in playlist
  public readonly videos: IPlaylistVideoItem[]; // videos in a playlist
  public readonly channelId: string; // channelId
  public readonly playlistId: string; // playlistId
  public readonly lastUpdatedText: string; // last updated on 31 Jul 2023

  constructor(options: IPlaylistDetails) {
    super();
    this.thumbnail = options.thumbnail;
    this.name = options.name;
    this.description = options.description;
    this.totalVideosCountText = options.totalVideosCountText;
    this.totalVideosCount = options.totalVideosCount;
    this.totalViewsCountText = options.totalViewsCountText;
    this.totalViewsCount = options.totalViewsCount;
    this.videos = options.videos;
    this.channelId = options.channelId;
    this.playlistId = options.playlistId;
    this.lastUpdatedText = options.lastUpdatedText;
  }

  isValid(): boolean {
    return true;
    // TODO: implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      thumbnail: new Thumbnail(this.thumbnail).toJSON(),
      name: this.name,
      description: this.description,
      totalVideosCountText: this.totalVideosCountText,
      totalVideosCount: this.totalVideosCount,
      totalViewsCountText: this.totalViewsCountText,
      totalViewsCount: this.totalViewsCount,
      videos: this.videos.map((item) => new PlaylistVideoItem(item).toJSON()),
      channelId: this.channelId,
      playlistId: this.playlistId,
      lastUpdatedText: this.lastUpdatedText
    };
  }
}
