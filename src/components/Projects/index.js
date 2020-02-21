import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';
import MembersActions from '~/store/ducks/members';

import Can from '~/components/Can';
import MembersModal from '~/components/Members';
import Modal from '~/components/Modal';

import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

const Projects = () => {
  const dispatch = useDispatch();

  const [newProject, setNewProject] = useState('');

  const activeTeam = useSelector(state => state.teams.active);
  const projects = useSelector(state => state.projects.data);
  const projectModalOpen = useSelector(
    state => state.projects.projectModalOpen
  );
  const membersModalOpen = useSelector(state => state.members.membersModalOpen);

  useEffect(() => {
    if (activeTeam) dispatch(ProjectsActions.getProjectsRequest());
  }, [activeTeam]);

  function openProjectModal() {
    dispatch(ProjectsActions.openProjectModal());
  }

  function closeProjectModal() {
    dispatch(ProjectsActions.closeProjectModal());
  }

  function handleNewProjectSubmit(e) {
    e.preventDefault();
    dispatch(ProjectsActions.createNewProjectRequest(newProject));
  }

  function openMembersModal() {
    dispatch(MembersActions.openMembersModal());
  }

  if (!activeTeam) return null;

  return (
    <Container>
      <header>
        <h1>{activeTeam.name}</h1>
        <div>
          <Can checkPermission="projects_create">
            <Button onClick={openProjectModal}>+ Novo</Button>
          </Can>
          <Button onClick={openMembersModal}>Membros</Button>
        </div>
      </header>

      {membersModalOpen && <MembersModal />}

      {projects.map(project => (
        <Project key={project.id}>
          <p>{project.title}</p>
        </Project>
      ))}

      {projectModalOpen && (
        <Modal>
          <h1>Criar projeto</h1>

          <form onSubmit={e => handleNewProjectSubmit(e)}>
            <span>NOME</span>
            <input
              value={newProject}
              onChange={e => setNewProject(e.target.value)}
            />

            <Button size="big" type="submit">
              Salvar
            </Button>

            <Button onClick={closeProjectModal} size="small" color="gray">
              Cancelar
            </Button>
          </form>
        </Modal>
      )}
    </Container>
  );
};

export default Projects;
