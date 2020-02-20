import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import api from '~/services/api';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

import MembersActions from '~/store/ducks/members';

import { MembersList } from './styles';

const Members = () => {
  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);

  const members = useSelector(state => state.members.data);

  useEffect(() => {
    async function getRoles() {
      const response = await api.get('roles');
      setRoles(response.data);
    }

    getRoles();
    dispatch(MembersActions.getMembersRequest());
  }, []);

  function closeMembersModal() {
    dispatch(MembersActions.closeMembersModal());
  }

  function handleMemberRolesChange(id, newRoles) {
    dispatch(MembersActions.updateRolesRequest(id, newRoles));
  }

  return (
    <Modal size="big">
      <h1>Membros</h1>

      <form>
        <MembersList>
          {members.map(m => (
            <li key={m.id}>
              <strong>{m.user.name}</strong>

              <Select
                isMulti
                options={roles}
                value={m.roles}
                getOptionLabel={role => role.name}
                getOptionValue={role => role.id}
                onChange={value => handleMemberRolesChange(m.id, value)}
              />
            </li>
          ))}
        </MembersList>

        <Button onClick={closeMembersModal} filled={false} color="gray">
          Cancelar
        </Button>
      </form>
    </Modal>
  );
};

export default Members;
