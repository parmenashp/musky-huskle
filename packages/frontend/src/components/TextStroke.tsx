import styled from "styled-components";

const SpanStrike = styled.span<{ $textColor?: string; $strokeSize?: string }>`
  white-space: nowrap;

  &:before {
    content: attr(data-text);
    -webkit-text-stroke: ${(props) => props.$strokeSize || "2px"} #000000;
    position: absolute;
    z-index: -1;
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
