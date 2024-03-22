import PawPng from "../assets/paw.png";
import PolygonSvg from "../assets/polygon.svg";
import styled from "styled-components";

const Button = styled.button`
  background-image: url(${PawPng});
  background-position: center;
  background-size: 3rem;
  background-repeat: no-repeat;

  &:active {
    background-size: 2.8rem;
    transition: background-size 0.01s;
  }
`;

function PolygonButton() {
  const handleClick = () => {
    console.log("Polygon button clicked");
  };

  return (
    <Button className="flex items-center justify-center" onClick={handleClick}>
      <img src={PolygonSvg} className="w-24 h-24 -z-10" />
    </Button>
  );
}

export default PolygonButton;
