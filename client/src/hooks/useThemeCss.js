/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import selectors from '../selectors';

const useThemeCss = () => {
  const user = useSelector(selectors.selectCurrentUser);
  const linkRef = useRef(null);

  useEffect(() => {
    if (!user) {
      // Remove theme CSS if user is not logged in
      if (linkRef.current) {
        linkRef.current.remove();
        linkRef.current = null;
      }
      return;
    }

    // Create or update the link element
    if (!linkRef.current) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = 'planka-user-theme';
      link.href = '/api/users/me/theme.css';
      document.head.appendChild(link);
      linkRef.current = link;
    } else {
      // Update href to force reload if theme changed
      const newHref = `/api/users/me/theme.css?t=${Date.now()}`;
      if (linkRef.current.href !== newHref) {
        linkRef.current.href = newHref;
      }
    }

    // Cleanup on unmount
    return () => {
      if (linkRef.current) {
        linkRef.current.remove();
        linkRef.current = null;
      }
    };
  }, [
    user,
    user?.themeCardBackgroundColor,
    user?.themeCardHoverColor,
    user?.themeCardShadowColor,
  ]);
};

export default useThemeCss;
