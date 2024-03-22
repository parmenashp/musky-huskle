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

const Box = styled.div<BoxStyleProps>`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.313rem solid #000000;
  z-index: -1;

  &.right {
    background-color: #40ac2e;
  }
  &.wrong {
    background-color: #ac2e2e;
  }
  &.partial {
    background-color: #c7b248;
  }
  &.avatar {
    background-image: url(${(props) => props.avatar});
    background-size: cover;
  }
`;

const HoverTextStroke = styled(TextStroke)``;

function GameBox(props: BoxProps) {
  const { variant, avatar } = props;

  function RenderText() {
    if (variant === "avatar") {
      return <HoverTextStroke>{props.children}</HoverTextStroke>;
    } else {
      return <TextStroke>{props.children}</TextStroke>;
    }
  }

  return (
    <Box className={variant} avatar={avatar}>
      {RenderText()}
    </Box>
  );
}

export default GameBox;
