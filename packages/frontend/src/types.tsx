// export type BoxStatuses =
//   | "right"
//   | "wrong"
//   | "partial"
//   | "wrong up"
//   | "wrong down";

export type CategoryValue<T> = {
  value: T | undefined;
  status: string | undefined;
};

export type MemberAvatar = {
  name: string | undefined;
  avatarUrl: string | undefined;
};

export type GameMemberData = {
  avatar: MemberAvatar | undefined;
  gender: CategoryValue<string> | undefined;
  age: CategoryValue<number> | undefined;
  fursonaSpecies: CategoryValue<string[]> | undefined;
  fursonaColor: CategoryValue<string> | undefined;
  workArea: CategoryValue<string[]> | undefined;
  sexuality: CategoryValue<string> | undefined;
  zodiacSign: CategoryValue<string> | undefined;
  memberSince: CategoryValue<string> | undefined;
};
