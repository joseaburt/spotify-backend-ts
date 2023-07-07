export type EntityId = number;

export type Entity = {
  id: EntityId;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};

export type BaseMediaEntity = Entity & {
  name: string;
  image: string;
};

export type Optional<T> = T | undefined;

export type WithoutUserId<T> = Omit<T, 'userId'>;

export type WithUserId<T> = T & { userId: EntityId };

export type JustIdTitleAndImage<T extends BaseMediaEntity> = Pick<T, 'id' | 'name' | 'image'>;
