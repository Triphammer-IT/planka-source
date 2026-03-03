/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

/**
 * GET /api/users/me/theme.css — serve dynamic CSS from current user's theme settings.
 * Requires authentication. Returns text/css with CSS custom properties for card styling.
 */

const DEFAULT_THEME = {
  cardBackground: 'rgba(255, 255, 255, 0.5)',
  cardBorder: 'rgba(0, 0, 0, 0.08)',
  cardShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
  cardHoverBackground: 'rgba(255, 255, 255, 0.65)',
  cardHoverShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
};

const Errors = {
  UNAUTHORIZED: {
    unauthorized: 'Unauthorized',
  },
};

function buildThemeCss(theme) {
  const t = { ...DEFAULT_THEME, ...theme };
  return `:root {
  --planka-card-background: ${t.cardBackground};
  --planka-card-border: ${t.cardBorder};
  --planka-card-shadow: ${t.cardShadow};
  --planka-card-hover-background: ${t.cardHoverBackground};
  --planka-card-hover-shadow: ${t.cardHoverShadow};
}
`;
}

module.exports = {
  inputs: {},

  exits: {
    unauthorized: {
      responseType: 'unauthorized',
    },
  },

  async fn() {
    const { currentUser } = this.req;

    if (!currentUser || currentUser.id === User.INTERNAL.id || currentUser.id === User.OIDC.id) {
      throw Errors.UNAUTHORIZED;
    }

    const theme = currentUser.themeSettings || {};
    const css = buildThemeCss(theme);

    this.res.type('text/css');
    this.res.set('Cache-Control', 'private, max-age=0');
    return this.res.send(css);
  },
};
