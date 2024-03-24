import styled from "styled-components";
import TextStrokeComp from "./TextStroke";
import RedArrowSvg from "../assets/red-arrow.svg";
import { MemberAvatar, CategoryValue } from "../types";

type BoxProps = {
  data: CategoryValue<string | number | string[]> | MemberAvatar;
};

type BoxStyleProps = {
  $avatarurl?: string;
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
    background-image: url(${(props) => props.$avatarurl});
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

function GameBox({
  data,
  ...rest
}: BoxProps & React.HTMLAttributes<HTMLDivElement>) {
  const isAvatar = data.hasOwnProperty("avatarUrl");

  function renderText(value: string | string[] | number) {
    if (Array.isArray(value)) {
      return value.join(", ");
    } else {
      return value.toString();
    }
  }

  function renderBox() {
    if (isAvatar) {
      data = data as MemberAvatar;
      return (
        <Box className="avatar" $avatarurl={data.avatarUrl} {...rest}>
          <HoverTextStroke>{data.name}</HoverTextStroke>
        </Box>
      );
    } else {
      data = data as CategoryValue<string | number | string[]>;
      return (
        <Box className={data.status} {...rest}>
          <TextStroke strokeSize="4px">{renderText(data.value)}</TextStroke>
        </Box>
      );
    }
  }

  return renderBox();
}

export default GameBox;
