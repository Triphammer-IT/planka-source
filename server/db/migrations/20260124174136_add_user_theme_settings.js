/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

exports.up = async (knex) => {
  return knex.schema.alterTable('user_account', (table) => {
    table.string('theme_card_background_color', 7).nullable();
    table.string('theme_card_hover_color', 7).nullable();
    table.string('theme_card_shadow_color', 20).nullable();
  });
};

exports.down = async (knex) => {
  return knex.schema.alterTable('user_account', (table) => {
    table.dropColumn('theme_card_background_color');
    table.dropColumn('theme_card_hover_color');
    table.dropColumn('theme_card_shadow_color');
  });
};
