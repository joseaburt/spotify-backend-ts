import { Query } from '../shared//query';
import { EntityId, Optional, WithUserId } from '../shared/entity';
import { CreatePlaylistDTO, Playlist, UpdatePlaylistDTO } from './index.model';

export interface PlaylistRepository {
  like(id: EntityId, userId: EntityId): Promise<void>;
  isFavorite(playlistId: EntityId, userId: EntityId): Promise<boolean>;
  findTracks(playlistId: EntityId, query?: Query): Promise<Playlist[]>;
  findByAll(query?: Query): Promise<Optional<Playlist>>;
  findById(id: EntityId): Promise<Optional<Playlist>>;
  create(payload: WithUserId<CreatePlaylistDTO>): Promise<EntityId>;
  update(id: EntityId, payload: WithUserId<UpdatePlaylistDTO>): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
}
