import { DataClass } from '../common/IDataClass.js';
import { IThumbnail, Thumbnail } from '../common/index.js';

export type IPlaylistItem = Omit<PlaylistItem, keyof DataClass>;

export class PlaylistItem extends DataClass {
  public readonly playlistId: string;
  public readonly name: string;
  public readonly videosCountText: string;
  public readonly videosCount: string;
  public readonly thumbnail: IThumbnail;
  public readonly isRecentlyUpdated: boolean;

  constructor(options: IPlaylistItem) {
    super();
    this.playlistId = options.playlistId;
    this.name = options.name;
    this.videosCountText = options.videosCountText;
    this.videosCount = options.videosCount;
    this.thumbnail = options.thumbnail;
    this.isRecentlyUpdated = options.isRecentlyUpdated;
  }

  isValid(): boolean {
    return true;
    // TODO: implement this.
    // throw new Error('Method not implemented.');
  }

  toJSON() {
    return {
      playlistId: this.playlistId,
      name: this.name,
      videosCountText: this.videosCountText,
      videosCount: this.videosCount,
      thumbnail: new Thumbnail(this.thumbnail).toJSON(),
      isRecentlyUpdated: this.isRecentlyUpdated
    };
  }
}
