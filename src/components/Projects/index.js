import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProjectsActions from '~/store/ducks/projects';

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

  useEffect(() => {
    dispatch(ProjectsActions.getProjectsRequest());
  }, []);

  function openProjectModal() {
    dispatch(ProjectsActions.openProjectModal());
  }

  function closeProjectModal() {
    dispatch(ProjectsActions.closeProjectModal());
  }

  function handleNewProjectSubmit() {
    dispatch(ProjectsActions.createNewProjectRequest(newProject));
  }

  if (!activeTeam) return null;

  return (
    <Container>
      <header>
        <h1>{activeTeam.name}</h1>
        <div>
          <Button onClick={openProjectModal}>+ Novo</Button>
          <Button onClick={() => {}}>Membros</Button>
        </div>
      </header>

      {projects.map(project => (
        <Project>
          <p>{project.title}</p>
        </Project>
      ))}

      {projectModalOpen && (
        <Modal>
          <h1>Criar projeto</h1>

          <form onSubmit={handleNewProjectSubmit}>
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
