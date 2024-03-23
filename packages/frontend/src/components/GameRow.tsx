import GameBox from "./GameBox";

type statuses = "right" | "wrong" | "partial" | "wrong up" | "wrong down";

type GameMemberData = {
  name: string;
  avatarUrl: string;
  gender: string;
  age: number;
  fursonaSpecies: [string];
  fursonaColor: string;
  workArea: [string];
  sexuality: string;
  zodiacSign: string;
  memberSince: string;
};

type GameApiData = {
  gender: statuses;
  age: statuses;
  fursonaSpecies: statuses;
  fursonaColor: statuses;
  workArea: statuses;
  sexuality: statuses;
  zodiacSign: statuses;
  memberSince: statuses;
};

function GameRow(props: { memberData: GameMemberData; apiData: GameApiData }) {
  const { memberData, apiData } = props;

  function renderText(value: string | number | [string]) {
    if (Array.isArray(value)) {
      return value.join(", ");
    } else {
      return value.toString();
    }
  }

  return (
    <div className="flex gap-1">
      <GameBox avatarUrl={memberData.avatarUrl}>{memberData.name}</GameBox>
      {Object.entries(apiData).map(([key, status]) => (
        <GameBox key={key} status={status}>
          {renderText(memberData[key as keyof GameMemberData])}
        </GameBox>
      ))}
    </div>
  );
}

export default GameRow;
