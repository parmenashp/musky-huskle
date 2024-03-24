export type BoxStatuses =
  | "right"
  | "wrong"
  | "partial"
  | "wrong up"
  | "wrong down";

export type CategoryValue<T> = {
  value: T;
  status: BoxStatuses;
};

export type MemberAvatar = {
  name: string;
  avatarUrl: string;
};

export type GameMemberData = {
  avatar: MemberAvatar;
  gender: CategoryValue<string>;
  age: CategoryValue<number>;
  fursonaSpecies: CategoryValue<string[]>;
  fursonaColor: CategoryValue<string>;
  workArea: CategoryValue<string[]>;
  sexuality: CategoryValue<string>;
  zodiacSign: CategoryValue<string>;
  memberSince: CategoryValue<string>;
};
