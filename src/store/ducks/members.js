import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  openMembersModal: null,
  closeMembersModal: null,
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateRolesRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
});

export const MembersTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false,
});

const openMembersModal = state => state.merge({ membersModalOpen: true });

const closeMembersModal = state => state.merge({ membersModalOpen: false });

const success = (state, { data }) => state.merge({ data });

const updateRoles = (state, { id, roles }) =>
  state.merge({
    data: state.data.map(member =>
      member.id === id ? { ...member, roles } : member
    ),
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBERS_MODAL]: openMembersModal,
  [Types.CLOSE_MEMBERS_MODAL]: closeMembersModal,
  [Types.GET_MEMBERS_SUCCESS]: success,
  [Types.UPDATE_ROLES_REQUEST]: updateRoles,
});
