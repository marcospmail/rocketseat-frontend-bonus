import { all, takeLatest, fork } from 'redux-saga/effects';

import { signIn, signUp, signOut, getPermissions } from './auth';
import { AuthTypes } from '../ducks/auth';

import { getTeams, createTeam } from './teams';
import { TeamTypes } from '../ducks/teams';

import { getProjects, createProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { getMembers, updateRoles, inviteMember } from './members';
import { MembersTypes } from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    fork(getPermissions),

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGN_OUT, signOut),

    takeLatest(TeamTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamTypes.CREATE_TEAM_REQUEST, createTeam),
    takeLatest(TeamTypes.SELECT_TEAM, getPermissions),

    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectsTypes.CREATE_NEW_PROJECT_REQUEST, createProject),

    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    takeLatest(MembersTypes.UPDATE_ROLES_REQUEST, updateRoles),
    takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
  ]);
}
