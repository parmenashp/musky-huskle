import styled from "styled-components";
import TextStrokeComp from "./TextStroke";
import RedArrowSvg from "../assets/red-arrow.svg";

type statuses = "right" | "wrong" | "partial" | "wrong up" | "wrong down";

type BoxProps = {
  children?: string;
  avatarUrl?: string;
  status?: statuses;
};

type BoxStyleProps = {
  avatarUrl?: string;
};

const TextStroke = styled(TextStrokeComp)``;

const HoverTextStroke = styled(TextStroke)`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div<BoxStyleProps>`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.313rem solid #000000;
  border-radius: 0.313rem;
  z-index: 10;

  &.right {
    background-color: #40ac2e;
  }

  &.wrong {
    background-color: #bb2121;
    &.down {
      background-image: url(${RedArrowSvg});
      background-position: center;
      background-repeat: no-repeat;
    }
    &.up {
      background-image: url(${RedArrowSvg});
      background-position: center;
      background-repeat: no-repeat;
      transform: rotate(180deg);
      ${TextStroke} {
        transform: rotate(-180deg);
      }
    }
  }

  &.partial {
    background-color: #c7b248;
  }

  &.avatar {
    background-image: url(${(props) => props.avatarUrl});
    background-size: cover;
    background-repeat: no-repeat;
    ${HoverTextStroke} {
      opacity: 0;
      transition: backdrop-filter 0.1s;
    }
    &:hover {
      ${HoverTextStroke} {
        opacity: 1;
        backdrop-filter: brightness(50%);
      }
    }
  }
`;

const GameBox: React.FC<BoxProps> = ({ status, avatarUrl, children }) => {
  const isAvatar = avatarUrl !== undefined;

  function RenderText() {
    if (isAvatar) {
      return <HoverTextStroke>{children}</HoverTextStroke>;
    } else {
      return <TextStroke strokeSize="3px">{children}</TextStroke>;
    }
  }

  return (
    <Box
      className={isAvatar ? "avatar" : status}
      avatarUrl={isAvatar ? avatarUrl : undefined}
    >
      {RenderText()}
    </Box>
  );
};

export default GameBox;
