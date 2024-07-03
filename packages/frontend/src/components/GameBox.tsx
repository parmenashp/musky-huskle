import styled from "styled-components";
import RedArrowSvg from "../assets/red-arrow.svg";
import { MemberAvatar, CategoryValue } from "../types";

type BoxProps = {
  data: CategoryValue<string | number | string[]> | MemberAvatar;
};

type BoxStyleProps = {
  $avatarurl?: string;
};

const HoverText = styled.p`
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
  border-radius: 0.313rem;

  &.right {
    background-color: var(--right);
  }

  &.wrong {
    background-color: var(--wrong);
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
      p {
        transform: rotate(-180deg);
      }
    }
  }

  &.partial {
    background-color: var(--partial);
  }

  &.avatar {
    background-image: url(${(props) => props.$avatarurl});
    background-size: cover;
    background-repeat: no-repeat;
    ${HoverText} {
      opacity: 0;
      transition: backdrop-filter 0.1s;
    }
    &:hover {
      ${HoverText} {
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
          <HoverText>{data.name}</HoverText>
        </Box>
      );
    } else {
      data = data as CategoryValue<string | number | string[]>;
      return (
        <Box className={data.status} {...rest}>
          <p>{renderText(data.value)}</p>
        </Box>
      );
    }
  }

  return renderBox();
}

export default GameBox;
