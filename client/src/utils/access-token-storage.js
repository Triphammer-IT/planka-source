/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import Config from '../constants/Config';

/**
 * In cross-origin dev (e.g. Vite on :3000, API on :8080), use sameSite: 'lax'
 * so the cookie is sent with fetch() to the API after a hard reload. Strict
 * would block the cookie on that cross-origin request and bootstrap fails.
 */
const cookieSameSite = Config.SERVER_BASE_URL ? 'lax' : 'strict';

export const setAccessToken = (accessToken) => {
  const { exp } = jwtDecode(accessToken);
  const expires = new Date(exp * 1000);

  Cookies.set(Config.ACCESS_TOKEN_KEY, accessToken, {
    expires,
    secure: window.location.protocol === 'https:',
    sameSite: cookieSameSite,
  });

  Cookies.set(Config.ACCESS_TOKEN_VERSION_KEY, Config.ACCESS_TOKEN_VERSION, {
    expires,
  });
};

export const removeAccessToken = () => {
  Cookies.remove(Config.ACCESS_TOKEN_KEY);
  Cookies.remove(Config.ACCESS_TOKEN_VERSION_KEY);
};

export const getAccessToken = () => {
  let accessToken = Cookies.get(Config.ACCESS_TOKEN_KEY);
  const accessTokenVersion = Cookies.get(Config.ACCESS_TOKEN_VERSION_KEY);

  if (accessToken && accessTokenVersion !== Config.ACCESS_TOKEN_VERSION) {
    removeAccessToken();
    accessToken = undefined;
  }

  return accessToken;
};
