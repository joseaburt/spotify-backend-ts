import { Query } from '../shared/query';
import { CreateTrackDTO, Track, UpdateTrackDTO } from './index.model';
import { EntityId, JustIdTitleAndImage, Optional, WithUserId } from '../shared/entity';

export default interface TrackRepository {
  findAllByAlbumId(query?: Query): Promise<Track[]>;
  findAllByArtistId(id: EntityId, query?: Query): Promise<Track[]>;
  findById(id: EntityId): Promise<Optional<Track>>;
  findFavoriteByUserId(userId: EntityId, query?: Query): Promise<JustIdTitleAndImage<Track>[]>;
  like(trackId: EntityId, userId: EntityId): Promise<void>;
  isFavorite(userId: EntityId, trackId: EntityId): Promise<boolean>;
  create(payload: WithUserId<CreateTrackDTO>): Promise<EntityId>;
  update(id: EntityId, payload: WithUserId<UpdateTrackDTO>): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
  countLikes(id: EntityId): Promise<number>;
}
