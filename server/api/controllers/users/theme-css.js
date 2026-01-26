/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

/**
 * @swagger
 * /users/me/theme.css:
 *   get:
 *     summary: Get user theme CSS
 *     description: Returns dynamically generated CSS based on the current user's theme settings
 *     tags:
 *       - Users
 *     operationId: getUserThemeCss
 *     responses:
 *       200:
 *         description: Theme CSS generated successfully
 *         content:
 *           text/css:
 *             schema:
 *               type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = {
  async fn() {
    const { currentUser } = this.req;

    if (!currentUser) {
      return this.res.status(401).send('Unauthorized');
    }

    const user = await User.qm.getOneById(currentUser.id);

    if (!user) {
      return this.res.status(401).send('Unauthorized');
    }

    // Default colors if not set
    const cardBackgroundColor = user.themeCardBackgroundColor || '#f8f9fa';
    const cardHoverColor = user.themeCardHoverColor || '#f1f3f5';
    const cardShadowColor = user.themeCardShadowColor || 'rgba(0, 0, 0, 0.08)';

    // Helper function to adjust color brightness
    const adjustColor = (color, amount) => {
      // Simple color adjustment - if it's a hex color, adjust brightness
      if (color.startsWith('#')) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
      }
      return color;
    };

    // Generate CSS
    const css = `
/* Planka User Theme - Dynamically Generated */
/* This CSS is generated from user theme settings */

/* Card background colors */
.ui.card,
[class*="card"],
[data-testid*="card"] {
  background-color: ${cardBackgroundColor} !important;
  border-color: ${adjustColor(cardBackgroundColor, -10)} !important;
  box-shadow: 0 1px 3px ${cardShadowColor} !important;
}

/* Card hover states */
.ui.card:hover,
[class*="card"]:hover,
[data-testid*="card"]:hover {
  background-color: ${cardHoverColor} !important;
  box-shadow: 0 2px 6px ${cardShadowColor} !important;
  transform: translateY(-1px);
  transition: all 0.2s ease;
}
`;

    this.res.type('text/css');
    return this.res.send(css);
  },
};
