import GearSvg from "./assets/gear.svg";
import FireSvg from "./assets/fire.svg";
import QuestionSvg from "./assets/question-mark.svg";

function App() {
  return (
    <>
      <div className="flex max-w-4xl justify-center pt-12 gap-7 flex-col text-center items-center">
        <h1 className="text-7xl">Musky Huskle</h1>
        <h2 className="text-3xl">Jogo diário do Musky</h2>
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
      </div>
    </>
  );
}

export default App;
