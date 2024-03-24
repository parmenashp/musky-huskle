import styled from "styled-components";

const SpanStrike = styled.span<{ $textColor?: string; $strokeSize?: string }>`
  position: relative;
  &::before {
    content: attr(data-text);
    -webkit-text-stroke: ${(props) => props.$strokeSize || "2px"} #000000;
    position: absolute;
    align-self: center;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

function TextStroke(props: {
  children: React.ReactNode | React.ReactNode[];
  strokeSize?: string;
  className?: string;
}) {
  return (
    <SpanStrike
      className={props.className}
      data-text={props.children}
      $strokeSize={props.strokeSize}
    >
      {props.children}
    </SpanStrike>
  );
}

export default TextStroke;
