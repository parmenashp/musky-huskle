import GameBox from "./GameBox";
import { statuses } from "./GameBox";

export type CategoryValue<T> = {
  value: T;
  status: statuses;
};

export type MemberAvatar = {
  name: string;
  avatarUrl: string;
};

export type GameMemberData = {
  avatar: MemberAvatar;
  gender: CategoryValue<string>;
  age: CategoryValue<number>;
  fursonaSpecies: CategoryValue<[string]>;
  fursonaColor: CategoryValue<string>;
  workArea: CategoryValue<[string]>;
  sexuality: CategoryValue<string>;
  zodiacSign: CategoryValue<string>;
  memberSince: CategoryValue<string>;
};

function GameRow(props: { memberData: GameMemberData }) {
  const { avatar, ...restMemberData } = props.memberData;

  return (
    <div className="flex gap-1">
      <GameBox data={avatar} />
      {Object.entries(restMemberData).map(([key, data]) => (
        <GameBox key={key} data={data} />
      ))}
    </div>
  );
}

export default GameRow;
