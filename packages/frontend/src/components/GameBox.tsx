import styled from "styled-components";
import TextStroke from "./TextStroke";

type variant = "right" | "wrong" | "partial" | "avatar";

type BoxProps = {
  children?: string;
  avatar?: string;
  variant: variant;
};

type BoxStyleProps = {
  avatar?: string;
};
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
  z-index: 10;

  &.right {
    background-color: #40ac2e;
  }
  &.wrong {
    background-color: #bb2121;
  }
  &.partial {
    background-color: #c7b248;
  }
  &.avatar {
    background-image: url(${(props) => props.avatar});
    background-size: cover;
    background-repeat: no-repeat;

    ${HoverTextStroke} {
      opacity: 0;
    }

    &:hover {
      ${HoverTextStroke} {
        opacity: 1;
        backdrop-filter: blur(0.125rem);
      }
    }
  }
`;

function GameBox(props: BoxProps) {
  const { variant, avatar } = props;

  function RenderText() {
    if (variant === "avatar") {
      return <HoverTextStroke>{props.children}</HoverTextStroke>;
    } else {
      return <TextStroke strokeSize="3px">{props.children}</TextStroke>;
    }
  }

  return (
    <Box className={variant} avatar={avatar}>
      {RenderText()}
    </Box>
  );
}

export default GameBox;
