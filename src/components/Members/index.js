import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import api from '~/services/api';

import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';
import Can from '~/components/Can';

import MembersActions from '~/store/ducks/members';

import { MembersList, Invite } from './styles';

const Members = () => {
  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);
  const [invitedUser, setInvitedUser] = useState('');

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

  function handleInvite(e) {
    e.preventDefault();
    dispatch(MembersActions.inviteMemberRequest(invitedUser));
  }

  return (
    <Modal size="big">
      <h1>Membros</h1>

      <Can checkPermission="invites_create">
        <Invite
          onSubmit={e => {
            handleInvite(e);
          }}
        >
          <input
            placeholder="Invite user to team"
            value={invitedUser}
            onChange={e => setInvitedUser(e.target.value)}
          />
          <Button type="submit">Invite</Button>
        </Invite>
      </Can>

      <form>
        <MembersList>
          {members.map(m => (
            <li key={m.id}>
              <strong>{m.user.name}</strong>

              <Can checkRole="administrator">
                {can => (
                  <Select
                    isMulti
                    isDisabled={!can}
                    options={roles}
                    value={m.roles}
                    getOptionLabel={role => role.name}
                    getOptionValue={role => role.id}
                    onChange={value => handleMemberRolesChange(m.id, value)}
                  />
                )}
              </Can>
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
