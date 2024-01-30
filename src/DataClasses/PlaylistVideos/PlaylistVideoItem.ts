import { DataClass } from '../common/IDataClass.js';
import { IThumbnail, Thumbnail } from '../common/index.js';

export type IPlaylistVideoItem = Omit<PlaylistVideoItem, keyof DataClass>;

export class PlaylistVideoItem extends DataClass {
  public readonly videoId: string; // H8W9oMNSuwo
  public readonly thumbnail: IThumbnail; // video thumbnail image
  public readonly title: string; // Free CCNA | Network Devices | Day 1 | CCNA 200-301 Complete Course
  public readonly videoIndexInPlaylist: number; // 1
  public readonly channelYoutubeId: string; // UC0Q7Hlz75NYhYAuq6O0fqHw
  public readonly durationText: string; // 30:26
  public readonly durationSeconds: string; // 1826
  public readonly viewsCountText: string; // 256M views
  public readonly viewsCount: string; // 256000000
  public readonly estimatedUploadedAtText: string; // 4 years ago

  constructor(options: IPlaylistVideoItem) {
    super();
    this.videoId = options.videoId;
    this.thumbnail = options.thumbnail;
    this.title = options.title;
    this.videoIndexInPlaylist = options.videoIndexInPlaylist;
    this.channelYoutubeId = options.channelYoutubeId;
    this.durationText = options.durationText;
    this.durationSeconds = options.durationSeconds;
    this.viewsCountText = options.viewsCountText;
    this.viewsCount = options.viewsCount;
    this.estimatedUploadedAtText = options.estimatedUploadedAtText;
  }

  isValid(): boolean {
    return true;
    // TODO: implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      videoId: this.videoId,
      thumbnail: new Thumbnail(this.thumbnail).toJSON(),
      title: this.title,
      videoIndexInPlaylist: this.videoIndexInPlaylist,
      channelYoutubeId: this.channelYoutubeId,
      durationText: this.durationText,
      durationSeconds: this.durationSeconds,
      viewsCountText: this.viewsCountText,
      viewsCount: this.viewsCount,
      estimatedUploadedAtText: this.estimatedUploadedAtText
    };
  }
}
