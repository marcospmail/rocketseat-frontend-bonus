import { useSelector } from 'react-redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) return false;

  if (checkPermission && !permissions.includes(checkPermission)) return false;

  return true;
}

const Can = ({ children, checkRole, checkPermission }) => {
  const auth = useSelector(state => state.auth);

  if (typeof children === 'function') {
    return children(checkAuth(auth, checkRole, checkPermission));
  }

  return checkAuth(auth, checkRole, checkPermission) && children;
};

export default Can;
