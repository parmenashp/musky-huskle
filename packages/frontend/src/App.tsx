import GearSvg from "./assets/gear.svg";
import FireSvg from "./assets/fire.svg";
import Heart from "./assets/heart.svg";
import QuestionSvg from "./assets/question-mark.svg";
import PolygonButton from "./components/PolygonButton";
import styled from "styled-components";
import { useState } from "react";
import GameTable from "./components/GameTable";
import GameResult from "./components/GameResult";
import MuskyBarSvg from "./assets/musky-bar.svg";
import GameStatistics from "./components/GameStatistics";
import fetchMember from "./api";
import { GameMemberData } from "./types";


const NameInput = styled.input`
  border: 0.25rem solid var(--menu-bg);
  border-radius: 0.25rem;
  padding: 0 1.5rem 0 1.5rem;
  height: 3rem;
  width: 18.75rem;
  background-color: var(--menu-bg);

  &::placeholder {
    opacity: 1; /* Firefox */
    color: var(--placeholder);
    font-size: 1.125rem;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gameData, setGameData] = useState<GameMemberData[]>([]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    fetchMember(searchTerm).then((data) => {
      // append the new data to the existing data
      setGameData(state => [...data, ...state]);
    });
    // setGameData((state) => [state[0], ...state]);
  };

  return (
    <>
      <div className="flex max-w-4xl justify-center pt-12 pb-6 gap-7 flex-col text-center items-center">
        <div className="">
          <img src={MuskyBarSvg} alt="Musky Bar" />
          <div className="mb-3 mt-1">
            <p className="text-7xl">Musky Huskle</p>
            <p className="text-3xl">Jogo diário do Musky</p>
          </div>
          <img src={MuskyBarSvg} alt="Musky Bar" />
        </div>
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

        <div className="flex gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <img key={index} src={Heart} alt="Heart" className="w-10" />
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
        <GameStatistics />
      </div>
    </>
  );
}

export default App;
