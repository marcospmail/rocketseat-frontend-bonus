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

    console.log('caiuuu');

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Success',
        message: 'Roles updated!',
      })
    );
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
