/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tab, Button, Form } from 'semantic-ui-react';

import selectors from '../../../selectors';
import entryActions from '../../../entry-actions';

import styles from './ThemePane.module.scss';

const DEFAULT_COLORS = {
  cardBackground: '#f8f9fa',
  cardHover: '#f1f3f5',
  cardShadow: 'rgba(0, 0, 0, 0.08)',
};

const ThemePane = React.memo(() => {
  const user = useSelector(selectors.selectCurrentUser);
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const [cardBackgroundColor, setCardBackgroundColor] = useState(
    user.themeCardBackgroundColor || DEFAULT_COLORS.cardBackground,
  );
  const [cardHoverColor, setCardHoverColor] = useState(
    user.themeCardHoverColor || DEFAULT_COLORS.cardHover,
  );
  const [cardShadowColor, setCardShadowColor] = useState(
    user.themeCardShadowColor || DEFAULT_COLORS.cardShadow,
  );

  // Update local state when user changes
  useEffect(() => {
    setCardBackgroundColor(user.themeCardBackgroundColor || DEFAULT_COLORS.cardBackground);
    setCardHoverColor(user.themeCardHoverColor || DEFAULT_COLORS.cardHover);
    setCardShadowColor(user.themeCardShadowColor || DEFAULT_COLORS.cardShadow);
  }, [user.themeCardBackgroundColor, user.themeCardHoverColor, user.themeCardShadowColor]);

  const handleColorChange = useCallback(
    (field, value) => {
      if (field === 'cardBackground') {
        setCardBackgroundColor(value);
      } else if (field === 'cardHover') {
        setCardHoverColor(value);
      } else if (field === 'cardShadow') {
        setCardShadowColor(value);
      }
    },
    [],
  );

  const handleSave = useCallback(() => {
    dispatch(
      entryActions.updateCurrentUser({
        themeCardBackgroundColor: cardBackgroundColor,
        themeCardHoverColor: cardHoverColor,
        themeCardShadowColor: cardShadowColor,
      }),
    );
  }, [dispatch, cardBackgroundColor, cardHoverColor, cardShadowColor]);

  const handleReset = useCallback(() => {
    setCardBackgroundColor(DEFAULT_COLORS.cardBackground);
    setCardHoverColor(DEFAULT_COLORS.cardHover);
    setCardShadowColor(DEFAULT_COLORS.cardShadow);
    dispatch(
      entryActions.updateCurrentUser({
        themeCardBackgroundColor: null,
        themeCardHoverColor: null,
        themeCardShadowColor: null,
      }),
    );
  }, [dispatch]);

  // Generate preview CSS
  const previewStyle = {
    '--card-bg': cardBackgroundColor,
    '--card-hover': cardHoverColor,
    '--card-shadow': cardShadowColor,
  };

  return (
    <Tab.Pane attached={false} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>{t('common.themeCardBackground', { defaultValue: 'Card Background Color' })}</h4>
          <div className={styles.colorPickerRow}>
            <input
              type="color"
              value={cardBackgroundColor}
              onChange={(e) => handleColorChange('cardBackground', e.target.value)}
              className={styles.colorInput}
            />
            <input
              type="text"
              value={cardBackgroundColor}
              onChange={(e) => handleColorChange('cardBackground', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#f8f9fa"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h4>{t('common.themeCardHover', { defaultValue: 'Card Hover Color' })}</h4>
          <div className={styles.colorPickerRow}>
            <input
              type="color"
              value={cardHoverColor}
              onChange={(e) => handleColorChange('cardHover', e.target.value)}
              className={styles.colorInput}
            />
            <input
              type="text"
              value={cardHoverColor}
              onChange={(e) => handleColorChange('cardHover', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#f1f3f5"
            />
          </div>
        </div>

        <div className={styles.section}>
          <h4>{t('common.themeCardShadow', { defaultValue: 'Card Shadow Color' })}</h4>
          <div className={styles.colorPickerRow}>
            <input
              type="text"
              value={cardShadowColor}
              onChange={(e) => handleColorChange('cardShadow', e.target.value)}
              className={styles.colorTextInput}
              placeholder="rgba(0, 0, 0, 0.08)"
            />
          </div>
          <p className={styles.helpText}>
            {t('common.themeCardShadowHelp', {
              defaultValue: 'Use rgba() format for shadows (e.g., rgba(0, 0, 0, 0.08))',
            })}
          </p>
        </div>

        <div className={styles.section}>
          <h4>{t('common.themePreview', { defaultValue: 'Live Preview' })}</h4>
          <div className={styles.previewContainer} style={previewStyle}>
            <div className={styles.previewCard}>
              <div className={styles.previewCardTitle}>
                {t('common.themePreviewCardTitle', { defaultValue: 'Example Card' })}
              </div>
              <div className={styles.previewCardContent}>
                {t('common.themePreviewCardContent', {
                  defaultValue: 'This is how your cards will look with the selected colors.',
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button primary onClick={handleSave}>
            {t('common.save', { defaultValue: 'Save' })}
          </Button>
          <Button onClick={handleReset}>
            {t('common.resetToDefault', { defaultValue: 'Reset to Default' })}
          </Button>
        </div>
      </div>
    </Tab.Pane>
  );
});

export default ThemePane;
