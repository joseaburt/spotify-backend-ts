import { Query } from '../shared/query';
import { EntityId, Optional, WithUserId } from '../shared/entity';
import { Album, CreateAlbumDTO, UpdateAlbumDTO } from './index.model';

export interface AlbumRepository {
  findAllByArtistId(id: EntityId, query?: Query): Promise<Album[]>;
  findById(id: EntityId): Promise<Optional<Album>>;
  create(payload: WithUserId<CreateAlbumDTO>): Promise<EntityId>;
  update(id: EntityId, payload: WithUserId<UpdateAlbumDTO>): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
}
