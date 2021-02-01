/**
 * TagSpaces - universal file and folder organizer
 * Copyright (C) 2017-present TagSpaces UG (haftungsbeschraenkt)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License (version 3) as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import { DropTarget } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles/index';
import i18n from '../services/i18n';

const styles: any = (theme: any) => ({
  dropzone: {
    margin: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1dd19f40',
    zIndex: 1000,
    border: '3px dashed white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'white'
  }
});

const boxTarget = {
  /**
   * http://react-dnd.github.io/react-dnd/docs/api/drop-target
   */
  drop(props, monitor) {
    // component)
    //  return component.props.onDrop(props, monitor);
    return props.onDrop(props, monitor);
  }
};

interface Props {
  classes?: any;
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: any;
  children: Object;
}

const TargetFileBox = (props: Props) => {
  const { classes, canDrop, isOver, connectDropTarget, children } = props;
  const dragContent =
    canDrop && isOver ? (
      <div className={classes.dropzone}>{i18n.t('core:releaseToDrop')}</div>
    ) : (
      undefined
    );
  return connectDropTarget(
    <div>
      {dragContent}
      {children}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(
  DropTarget(
    props => props.accepts,
    boxTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  )(TargetFileBox)
);
