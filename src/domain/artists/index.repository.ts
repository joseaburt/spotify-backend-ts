import { Query } from '../shared/query';
import { EntityId, Optional, WithUserId } from '../shared/entity';
import { Artist, CreateArtistDTO, UpdateArtistDTO } from './index.model';

export default interface ArtistRepository {
  countFollowers(id: EntityId): Promise<number>;
  follow(id: EntityId, followerId: EntityId): Promise<boolean>;
  isFollowing(artistId: EntityId, userId: EntityId): Promise<boolean>;
  findByAll(query?: Query): Promise<Optional<Artist>>;
  findById(id: EntityId): Promise<Optional<Artist>>;
  create(payload: WithUserId<CreateArtistDTO>): Promise<EntityId>;
  update(id: EntityId, payload: WithUserId<UpdateArtistDTO>): Promise<boolean>;
  deleteById(id: EntityId): Promise<boolean>;
}
