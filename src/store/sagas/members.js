import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';

import MembersActions from '~/store/ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');
  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateRoles({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(r => r.id) });
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente!',
      })
    );
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });
    yield put(MembersActions.getMembersRequest());
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no login',
        message: 'Verifique seu e-mail/senha',
      })
    );
  }
}
