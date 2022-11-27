import { useSetRecoilState } from 'recoil';
import { message } from 'antd';
import authAtom from '../_state/auth';
import usersAtom from '../_state/users';

import useFetchWrapper from '../_helpers/fetch_wrapper';

export default function useUserActions() {
  const baseUrl = `${process.env.REACT_APP_API_BASE}`;
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  function saveFact(text) {
    return fetchWrapper.post(`${baseUrl}/v1/facts`, { text, animal: 'cat' })
      .then(() => {})
      .catch((error) => {
        message.error(error);
      });
  }

  function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/v1/auth/login`, { email, password })
      .then((user) => {
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
        };

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function register(email, password) {
    return fetchWrapper.post(`${baseUrl}/v1/auth/register`, { email, password })
      .then((user) => {
        const saveUser = {
          data: user.user,
          token: user.token,
          at: user.token.accessToken,
        };

        // store user details and jwt token in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(saveUser));
        setAuth(saveUser);

        // get return url from location state or default to home page
        // const { from } = history.location.state || { from: { pathname: '/' } };
        // history.push('/collections');
        window.location.reload(false);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/users`).then(setUsers);
  }

  return {
    login,
    logout,
    getAll,
    register,
    saveFact,
  };
}
