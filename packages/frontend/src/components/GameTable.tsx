import styled from "styled-components";
import GameBox from "./GameBox";
import { GameMemberData } from "../types";
import TextStroke from "./TextStroke";

const tableHeaders = [
  "Avatar",
  "Gênero",
  "Idade",
  "Espécie",
  "Cor",
  "Área",
  "Sexualidade",
  "Signo",
  "Entrou em",
];

type GameTableProps = {
  tableData: GameMemberData[];
};

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.25rem;
  justify-items: center;
`;

const HeaderText = styled.span`
  padding-bottom: 0.25rem;
`;

function GameTable({ tableData }: GameTableProps) {
  function renderTableRow(memberData: GameMemberData) {
    const { avatar, ...restMemberData } = memberData;
    return [
      <GameBox key="avatar" data={memberData.avatar} />,
      ...Object.values(restMemberData).map((data, index) => (
        <GameBox key={index} data={data} />
      )),
    ];
  }

  function renderTableHeader() {
    return tableHeaders.map((header, index) => (
      <TextStroke strokeSize="4px" key={index} className="pb-1">
        {header}
      </TextStroke>
    ));
  }

  return (
    <Table>
      {renderTableHeader()}
      {tableData.map((memberData) => renderTableRow(memberData))}
    </Table>
  );
}

export default GameTable;
