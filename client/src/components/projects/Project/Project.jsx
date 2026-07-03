/*!
 * Copyright (c) 2024 PLANKA Software GmbH
 * Licensed under the Fair Use License: https://github.com/plankanban/planka/blob/master/LICENSE.md
 */

import React from 'react';
import { useSelector } from 'react-redux';

import selectors from '../../../selectors';
import { DARK_BACKGROUND_GRADIENTS } from '../../../constants/BackgroundGradients';
import { ProjectBackgroundTypes } from '../../../constants/Enums';
import ModalTypes from '../../../constants/ModalTypes';
import ProjectSettingsModal from '../ProjectSettingsModal';
import Boards from '../../boards/Boards';
import BoardSettingsModal from '../../boards/BoardSettingsModal';

import styles from './Project.module.scss';

const CARD_BG_ALPHA_LIGHT = 0.5;
const CARD_BG_ALPHA_DARK = 0.7;
const CARD_HOVER_ALPHA_LIGHT = 0.65;
const CARD_HOVER_ALPHA_DARK = 0.82;

const Project = React.memo(() => {
  const modal = useSelector(selectors.selectCurrentModal);
  const project = useSelector(selectors.selectCurrentProject);

  const isDarkBoard =
    project?.backgroundType === ProjectBackgroundTypes.GRADIENT &&
    project?.backgroundGradient &&
    DARK_BACKGROUND_GRADIENTS.has(project.backgroundGradient);
  const isImageBoard = project?.backgroundType === ProjectBackgroundTypes.IMAGE;
  let cardBgAlpha = CARD_BG_ALPHA_LIGHT;
  let cardHoverAlpha = CARD_HOVER_ALPHA_LIGHT;
  if (isDarkBoard) {
    cardBgAlpha = CARD_BG_ALPHA_DARK;
    cardHoverAlpha = CARD_HOVER_ALPHA_DARK;
  } else if (isImageBoard) {
    cardBgAlpha = 0.6;
    cardHoverAlpha = 0.72;
  }

  let modalNode = null;
  if (modal) {
    switch (modal.type) {
      case ModalTypes.PROJECT_SETTINGS:
        modalNode = <ProjectSettingsModal />;

        break;
      case ModalTypes.BOARD_SETTINGS:
        modalNode = <BoardSettingsModal />;

        break;
      default:
    }
  }

  return (
    <>
      <div
        className={styles.wrapper}
        style={
          project?.backgroundType
            ? {
                '--planka-card-bg-alpha': cardBgAlpha,
                '--planka-card-hover-bg-alpha': cardHoverAlpha,
              }
            : undefined
        }
      >
        <Boards />
      </div>
      {modalNode}
    </>
  );
});

export default Project;
