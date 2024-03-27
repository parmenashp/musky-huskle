import styled from "styled-components";
import GameBox from "./GameBox";
import { GameMemberData } from "../types";

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
      <p key={index} className="pb-1">
        {header}
      </p>
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
