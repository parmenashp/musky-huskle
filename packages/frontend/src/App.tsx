import GearSvg from "./assets/gear.svg";
import FireSvg from "./assets/fire.svg";
import Heart from "./assets/heart.svg";
import QuestionSvg from "./assets/question-mark.svg";
import PolygonButton from "./components/PolygonButton";
import styled from "styled-components";
import { useState } from "react";
import GameTable from "./components/GameTable";
import { GameMemberData } from "./types";
import GameResult from "./components/GameResult";

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
        name: "Ichy",
        avatarUrl:
          "https://cdn.discordapp.com/avatars/141007689265315840/a_415f92b26e0199962f1f197b73668db7.png?size=128",
      },
      gender: { value: "Homem", status: "right" },
      age: { value: 29, status: "right" },
      fursonaSpecies: { value: ["Cachorro"], status: "right" },
      fursonaColor: { value: "Laranja", status: "right" },
      workArea: { value: ["Sexo"], status: "right" },
      sexuality: { value: "Gay", status: "right" },
      zodiacSign: { value: "Capricórnio", status: "right" },
      memberSince: { value: "2019", status: "right" },
    },
    {
      avatar: {
        name: "Mitsuaky",
        avatarUrl:
          "https://cdn.discordapp.com/avatars/182575852406571008/70ef4f9d6efdafaf20c20ed90f4e45b3.png?size=128",
      },
      gender: { value: "Homem", status: "right" },
      age: { value: 21, status: "wrong" },
      fursonaSpecies: { value: ["Cachorro"], status: "right" },
      fursonaColor: { value: "Cinza", status: "wrong" },
      workArea: { value: ["T.I.", "Sexo"], status: "partial" },
      sexuality: { value: "Bi", status: "wrong" },
      zodiacSign: { value: "Touro", status: "wrong" },
      memberSince: { value: "2019", status: "right" },
    },
    {
      avatar: {
        name: "Dônovan Carmona",
        avatarUrl:
          "https://cdn.discordapp.com/avatars/187366610368069632/86b3d9717d508531d89cdaf8162717b4.png?size=128",
      },
      gender: { value: "Homem", status: "right" },
      age: { value: 24, status: "wrong" },
      fursonaSpecies: { value: ["Gato", "Demônio"], status: "wrong" },
      fursonaColor: { value: "Cinza", status: "wrong" },
      workArea: {
        value: ["Design", "Edição"],
        status: "wrong",
      },
      sexuality: { value: "Gay", status: "right" },
      zodiacSign: { value: "Leão", status: "wrong" },
      memberSince: { value: "2020", status: "wrong down" },
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
        <p className="text-7xl">Musky Huskle</p>
        <p className="text-3xl">Jogo diário do Musky</p>

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

        <p className="text-xl">
          <span className="text-accent">18</span>
          &nbsp;
          <span>pessoas já descobriram hoje</span>
        </p>

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
        <GameTable tableData={gameData} />
        <GameResult />
      </div>
    </>
  );
}

export default App;
