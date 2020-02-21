import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: ['data'],
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
  createTeamRequest: ['name'],
  createTeamSuccess: ['team'],
  signOut: null,
});

export const TeamTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  teamModalOpen: false,
  active: JSON.parse(localStorage.getItem('@Omni:team')) || null,
});

const getSuccess = (state, { data }) => state.merge({ data });

const selectTeam = (state, { team }) => {
  localStorage.setItem('@Omni:team', JSON.stringify(team));

  return state.merge({ active: team });
};

const openModal = state => state.merge({ teamModalOpen: true });

const closeModal = state => state.merge({ teamModalOpen: false });

const createTeam = (state, { team }) =>
  state.merge({ data: [...state.data, team] });

const logout = state => state.merge({ active: null });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAMS_SUCCESS]: getSuccess,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openModal,
  [Types.CLOSE_TEAM_MODAL]: closeModal,
  [Types.CREATE_TEAM_SUCCESS]: createTeam,
  [Types.SIGN_OUT]: logout,
});
