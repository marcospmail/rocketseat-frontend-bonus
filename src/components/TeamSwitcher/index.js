import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TeamActions from '~/store/ducks/teams';
import AuthActions from '~/store/ducks/auth';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

import { Container, TeamList, Team, NewTeam, Logout } from './styles';

export default function() {
  const [newTeamName, setNewTeamName] = useState('');

  const activeTeam = useSelector(state => state.teams.active);
  const teams = useSelector(state => state.teams.data);
  const teamModalOpen = useSelector(state => state.teams.teamModalOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeamActions.getTeamsRequest());
  }, []);

  function handleOnTeamSelect(team) {
    dispatch(TeamActions.selectTeam(team));
  }

  function handleOpenTeamModal() {
    dispatch(TeamActions.openTeamModal());
  }

  function handleCloseTeamModal() {
    dispatch(TeamActions.closeTeamModal());
  }

  function handleNewTeamSubmit(e) {
    e.preventDefault();
    dispatch(TeamActions.createTeamRequest(newTeamName));
    setNewTeamName('');
  }

  return (
    <Container>
      <TeamList>
        {teams.map(t => (
          <Team
            key={t.id}
            active={t.id === activeTeam.id}
            onClick={() => handleOnTeamSelect(t)}
          >
            <img
              src={`https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${t.name}`}
              alt={t.name}
            />
          </Team>
        ))}

        <NewTeam onClick={handleOpenTeamModal}>NOVO</NewTeam>

        {teamModalOpen && (
          <Modal>
            <h1>Criar time</h1>

            <form onSubmit={handleNewTeamSubmit}>
              <span>NOME</span>
              <input
                onChange={e => setNewTeamName(e.target.value)}
                value={newTeamName}
              />

              <Button size="big" type="submit">
                Salvar
              </Button>

              <Button size="small" color="gray" onClick={handleCloseTeamModal}>
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
      </TeamList>

      <Logout
        onClick={() => {
          dispatch(AuthActions.signOut());
        }}
      >
        Sair
      </Logout>
    </Container>
  );
}
