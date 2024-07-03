import styled from "styled-components";
import copySvg from "../assets/copy.svg";

const RainbowBorder = styled.div`
  border-radius: 0.375rem;
  padding: 0.375rem;
  min-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      to right,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 154, 0, 1) 10%,
      rgba(208, 222, 33, 1) 20%,
      rgba(79, 220, 74, 1) 30%,
      rgba(63, 218, 216, 1) 40%,
      rgba(47, 201, 226, 1) 50%,
      rgba(28, 127, 238, 1) 60%,
      rgba(95, 21, 242, 1) 70%,
      rgba(186, 12, 248, 1) 80%,
      rgba(251, 7, 217, 1) 90%,
      rgba(255, 0, 0, 1) 100%
    )
    0 0/200% 100%;

  animation: a 2s linear infinite;
  @keyframes a {
    to {
      background-position: -200% 0;
    }
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
  border-radius: 0.313rem;
  background: linear-gradient(
    180deg,
    rgba(105, 113, 132, 1) -50%,
    rgba(50, 50, 50, 1) 150%
  );
`;

const AvatarSVG = ({ avatarUrl }: { avatarUrl: string }) => (
  <svg width="100" height="113" viewBox="0 0 100 113">
    <path
      d="M93.3503 27.3324L53.75 4.46912C51.4295 3.12938 48.5705 3.12938 46.25 4.46912L6.64969 27.3324C4.32919 28.6721 2.89969 31.1481 2.89969 33.8276V79.5541C2.89969 82.2336 4.32918 84.7095 6.64969 86.0492L46.25 108.912C48.5705 110.252 51.4295 110.252 53.75 108.912L93.3503 86.0492C95.6708 84.7095 97.1003 82.2336 97.1003 79.5541V33.8276C97.1003 31.1481 95.6708 28.6721 93.3503 27.3324Z"
      fill="url(#avatar-pattern)"
    />
    <defs>
      <mask id="avatar-mask">
        <path
          d="M93.3503 27.3324L53.75 4.46912C51.4295 3.12938 48.5705 3.12938 46.25 4.46912L6.64969 27.3324C4.32919 28.6721 2.89969 31.1481 2.89969 33.8276V79.5541C2.89969 82.2336 4.32918 84.7095 6.64969 86.0492L46.25 108.912C48.5705 110.252 51.4295 110.252 53.75 108.912L93.3503 86.0492C95.6708 84.7095 97.1003 82.2336 97.1003 79.5541V33.8276C97.1003 31.1481 95.6708 28.6721 93.3503 27.3324Z"
          fill="transparent"
          stroke="white"
          stroke-width="0.375rem"
        />
      </mask>
      <pattern
        id="avatar-pattern"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use href="#avatar" transform="scale(0.01)" />
      </pattern>
      <image id="avatar" width="100" height="100" href={avatarUrl} />
    </defs>
  </svg>
);

const AvatarBorder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;

  mask-image: url(#avatar-mask);
  background: linear-gradient(
      to right,
      rgba(208, 222, 33, 1) 0%,
      rgba(79, 220, 74, 1) 10%,
      rgba(63, 218, 216, 1) 20%,
      rgba(47, 201, 226, 1) 30%,
      rgba(28, 127, 238, 1) 40%,
      rgba(95, 21, 242, 1) 50%,
      rgba(186, 12, 248, 1) 60%,
      rgba(251, 7, 217, 1) 70%,
      rgba(255, 0, 0, 1) 80%,
      rgba(255, 154, 0, 1) 90%,
      rgba(208, 222, 33, 1) 100%
    )
    0 0/200% 100%;

  animation: a 2s linear infinite;
`;

function GameResult() {
  return (
    <RainbowBorder>
      <InnerDiv className="relative">
        <div className="flex">
          <AvatarSVG avatarUrl="https://cdn.discordapp.com/avatars/141007689265315840/a_415f92b26e0199962f1f197b73668db7.png?size=128" />
          <AvatarBorder />
        </div>
        <div className="text-3xl mb-3">Ichy</div>
        <p className="text-xl">
          <span>Você acertou em: &nbsp;</span>
          <span className="text-accent">2 tentativas</span>
        </p>
        <p className="text-5xl mb-6">Excelente!</p>
        <div className="text-xl flex flex-col">
          <p>Eu sei quem é o Musky Huskle de hoje!</p>
          🟩🟩🟩🟩🟩🟩🟩
          <br />
          🟩🟥🟥🟨🟥🟥🔼
          <p>https://muskyhuskle.net</p>
        </div>
        <button className="flex gap-1 mt-2">
          <img src={copySvg} alt="Copy" />
          <span>Copiar</span>
        </button>
      </InnerDiv>
    </RainbowBorder>
  );
}

export default GameResult;
