import GearSvg from "./assets/gear.svg";
import FireSvg from "./assets/fire.svg";
import Heart from "./assets/heart.svg";
import QuestionSvg from "./assets/question-mark.svg";
import PolygonButton from "./components/PolygonButton";
import TextStroke from "./components/TextStroke";
import styled from "styled-components";
import GameRow, { GameMemberData } from "./components/GameRow";
import { useState } from "react";

const NameInput = styled.input`
  border: 0.25rem solid #000000;
  border-radius: 0.25rem;
  padding: 1.375rem;
  height: 3.25rem;
  width: 20rem;
  background-color: #181818;

  &::placeholder {
    opacity: 1; /* Firefox */
    color: #6b6b6b;
    font-size: 1.125rem;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameData, setGameData] = useState<GameMemberData[]>([
    {
      avatar: {
        name: "Mitsuaky",
        avatarUrl:
          "https://cdn.discordapp.com/avatars/182575852406571008/70ef4f9d6efdafaf20c20ed90f4e45b3.png?size=128",
      },
      gender: { value: "Homem", status: "right" },
      age: { value: 20, status: "wrong" },
      fursonaSpecies: { value: ["Cachorro"], status: "right" },
      fursonaColor: { value: "Cinza", status: "wrong" },
      workArea: { value: ["TI"], status: "wrong" },
      sexuality: { value: "Bi", status: "right" },
      zodiacSign: { value: "Touro", status: "wrong" },
      memberSince: { value: "2019", status: "right" },
    },
  ]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm("");
    setGameData((state) => [state[0], ...state]);
  };

  return (
    <>
      <div className="flex max-w-4xl justify-center pt-12 gap-7 flex-col text-center items-center">
        <TextStroke strokeSize="10px" className="text-7xl">
          Musky Huskle
        </TextStroke>
        <TextStroke strokeSize="10px" className="text-3xl">
          Jogo diário do Musky
        </TextStroke>

        <div className="flex gap-8">
          <button>
            <img src={GearSvg} alt="Settings" />
          </button>
          <button>
            <img src={FireSvg} alt="Combo" />
          </button>
          <button>
            <img src={QuestionSvg} alt="Help" />
          </button>
        </div>

        <div className="text-xl">
          <TextStroke strokeSize="6px" className="text-accent">
            18
          </TextStroke>
          &nbsp;
          <TextStroke strokeSize="6px">pessoas já descobriram hoje</TextStroke>
        </div>

        <div className="flex">
          {Array.from({ length: 7 }).map((_, index) => (
            <img key={index} src={Heart} alt="Heart" />
          ))}
        </div>

        <div className="flex items-center">
          <NameInput
            id="name"
            type="text"
            placeholder="Digite o nome"
            onChange={onSearchChange}
            value={searchTerm}
          />
          <PolygonButton onClick={handleSearchSubmit} />
        </div>
        {gameData.map((data) => (
          <GameRow memberData={data} />
        ))}
      </div>
    </>
  );
}

export default App;
