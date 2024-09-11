import GearSvg from "./assets/gear.svg";
import FireSvg from "./assets/fire.svg";
import Heart from "./assets/heart.svg";
import QuestionSvg from "./assets/question-mark.svg";
import PolygonButton from "./components/PolygonButton";
import { useState } from "react";
import GameTable from "./components/GameTable";
import GameResult from "./components/GameResult";
import MuskyBarSvg from "./assets/musky-bar.svg";
import GameStatistics from "./components/GameStatistics";
import fetchMember from "./api";
import { GameMemberData } from "./types";
import NameInput from "./components/NameInput";

function App() {
  type OptionType = { value: string; label: string };

  const [searchTerm, setSearchTerm] = useState("");
  const [gameData, setGameData] = useState<GameMemberData[]>([]);
  const [count, setCount] = useState(0);

  const options = () => 
    new Promise<OptionType[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { value: "Lucky", label: "Lucky" },
        { value: "Jamie", label: "Jamie" },
        { value: "Blob", label: "Blob" },
        { value: "Blub", label: "Blub" },
      ]);
    }, 1000);
  });
  
  const handleSearchSubmit = () => {
    // not empty search
    if (!searchTerm.trim().length) return;
    // TODO:
    // only searchs of valid options
    // if (!options.find((option) => option.value === searchTerm)) return;

    fetchMember(searchTerm).then((data) => {
      // append the new data to the existing data
      console.log(data);
      setGameData(state => [...data, ...state]);
    });
  };

  const onSearchChange = (option: OptionType | null) => {
    setSearchTerm(option?.value || "");
  }

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
          <span className="text-accent">{count}</span>
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
            onChange={onSearchChange}
            loadOptions={options}
            placeholder="Digite o nome"
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
