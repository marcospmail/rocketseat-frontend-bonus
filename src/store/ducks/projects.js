import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  createNewProjectRequest: ['title'],
  createNewProjectSuccess: ['project'],
});

export const ProjectsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
});

const success = (state, { data }) => state.merge({ data });

const openProjectModal = state => state.merge({ projectModalOpen: true });

const closeProjectModal = state => state.merge({ projectModalOpen: false });

const createProject = (state, { project }) =>
  state.merge({ data: [...state.data, project] });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.OPEN_PROJECT_MODAL]: openProjectModal,
  [Types.CLOSE_PROJECT_MODAL]: closeProjectModal,
  [Types.CREATE_NEW_PROJECT_SUCCESS]: createProject,
});
