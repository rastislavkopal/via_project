import React, { useEffect } from 'react';
import { Spin } from 'antd';
import useUserActions from '../../../_actions/user.actions';

export default function Logout() {
  const userActions = useUserActions();
  // const navigate = useNavigate();

  useEffect(() => {
    userActions.logout();
    // navigate('/', { replace: true });
  }, [userActions]);

  return (<Spin />);
}
