import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bg);
  padding: 1.3rem 2.3rem;
  gap: 1rem;
  border-radius: 0.25rem;
`;

function GameStatistics() {
  return (
    <Container>
      <h1 className="text-2xl">Estatísticas</h1>
      <div>
        <div className="flex flex-col">
          <span className="text-streak-color">1 acerto em sequência</span>
          <span>Sequência máxima: 7</span>
          <span>Jogos ganhos: 24</span>
        </div>
      </div>
    </Container>
  );
}

export default GameStatistics;
