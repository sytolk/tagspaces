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

import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import ColorPickerDialog from './ColorPickerDialog';
import { TagGroup } from '-/reducers/taglibrary';
import i18n from '-/services/i18n';
import TransparentBackground from '../TransparentBackground';

interface Props {
  open: boolean;
  fullScreen?: boolean;
  editTagGroup: (tagGroup: TagGroup) => void;
  selectedTagGroupEntry: TagGroup;
  onClose: () => void;
}

const EditTagGroupDialog = (props: Props) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState<boolean>(
    false
  );
  const [inputError, setInputError] = useState<boolean>(false);
  // const [disableConfirmButton, setDisableConfirmButton] = useState<boolean>(true);
  const [applyChanges, setApplyChanges] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.selectedTagGroupEntry.title);
  const [color, setColor] = useState<string>(props.selectedTagGroupEntry.color);
  const [textcolor, setTextcolor] = useState<string>(
    props.selectedTagGroupEntry.textcolor
  );
  // const [modifiedDate, setModifiedDate] = useState<string>('');

  useEffect(() => {
    handleValidation();
  }, [title]);

  const handleTagGroupTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    const { value, name } = target;

    if (name === 'title') {
      setTitle(value);
      // this.setState({ title: value }, this.handleValidation);
    }
  };

  const handleValidation = () => {
    if (title && title.length > 0) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const disableConfirmButton = () => inputError;

  const onConfirm = () => {
    const { selectedTagGroupEntry } = props;
    if (disableConfirmButton()) {
      return;
    }

    if (selectedTagGroupEntry && selectedTagGroupEntry.children) {
      props.editTagGroup({
        ...selectedTagGroupEntry,
        title,
        color,
        textcolor,
        children: selectedTagGroupEntry.children.map(tag => ({
          ...tag,
          color: applyChanges ? color : tag.color,
          textcolor: applyChanges ? textcolor : tag.textcolor,
          style: tag.style
        }))
      });
      // setInputError(false);
      // this.setState({ inputError: false, disableConfirmButton: true });
      props.onClose();
    }
  };

  const renderTitle = () => (
    <DialogTitle style={{ overflow: 'visible' }}>
      {i18n.t('core:editTagGroupTitle')}
      {` '${title}'`}
    </DialogTitle>
  );

  const renderContent = () => {
    const styles = {
      color: {
        width: '100%',
        height: 30,
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        padding: '5px',
        background: color
      },
      textcolor: {
        width: '100%',
        height: 30,
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        padding: '5px',
        background: textcolor
      },
      helpText: {
        marginBottom: '5px',
        fontSize: '1rem'
      }
    };

    return (
      <DialogContent style={{ overflow: 'visible' }}>
        <FormControl
          fullWidth={true}
          error={inputError}
          style={{ overflow: 'visible' }}
        >
          {/* {modifiedDate && (
            <div
              className="tag-date"
              style={{
                fontSize: 12,
                position: 'relative',
                bottom: 20,
                color: '#808080'
              }}
            >
              <span className="text" style={{ fontWeight: 600 }}>
                {`${i18n.t('core:modifiedDate')}: `}
              </span>
              <time>{format(new Date(modifiedDate), 'yyyy-mm-dd')}</time>
            </div>
          )} */}
          <TextField
            error={inputError}
            margin="dense"
            name="title"
            autoFocus
            label={i18n.t('core:editTagGroupNewName')}
            onChange={handleTagGroupTitleChange}
            value={title}
            data-tid="editTagGroupInput"
            fullWidth={true}
          />
          {inputError && (
            <FormHelperText>
              {i18n.t('core:taggroupTitleHelper')}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth={true}>
          <FormHelperText style={styles.helpText}>
            {i18n.t('core:tagBackgroundColor')}
          </FormHelperText>
          <TransparentBackground>
            <Button
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
              data-tid="editTagGroupBackgroundColor"
              style={styles.color}
            >
              &nbsp;
            </Button>
          </TransparentBackground>
          {displayColorPicker && (
            <ColorPickerDialog
              open={displayColorPicker}
              setColor={value => setColor(value)}
              onClose={() => setDisplayColorPicker(false)}
              color={color}
            />
          )}
        </FormControl>
        <FormControl fullWidth={true}>
          <FormHelperText style={styles.helpText}>
            {i18n.t('core:tagForegroundColor')}
          </FormHelperText>
          <TransparentBackground>
            <Button
              onClick={() => setDisplayTextColorPicker(!displayTextColorPicker)}
              data-tid="editTagGroupForegroundColor"
              style={styles.textcolor}
              role="presentation"
            >
              &nbsp;
            </Button>
          </TransparentBackground>
          {displayTextColorPicker && (
            <ColorPickerDialog
              open={displayTextColorPicker}
              setColor={txtcolor => setTextcolor(txtcolor)}
              onClose={() => setDisplayTextColorPicker(!displayTextColorPicker)}
              color={textcolor}
            />
          )}
        </FormControl>
        <FormControl>
          <FormHelperText style={styles.helpText}>
            {i18n.t('core:colorChangesToAllTags')}
          </FormHelperText>
          <Switch
            data-tid="editTagGroupSwitch"
            onClick={() => setApplyChanges(!applyChanges)}
            checked={applyChanges}
          />
        </FormControl>
      </DialogContent>
    );
  };

  const renderActions = () => (
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        {i18n.t('core:cancel')}
      </Button>
      <Button
        disabled={disableConfirmButton()}
        onClick={onConfirm}
        data-tid="editTagGroupConfirmButton"
        color="primary"
      >
        {i18n.t('core:ok')}
      </Button>
    </DialogActions>
  );

  const { open, fullScreen } = props;
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={props.onClose}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          event.preventDefault();
          event.stopPropagation();
          onConfirm();
        } else if (event.key === 'Escape') {
          props.onClose();
        }
      }}
    >
      {renderTitle()}
      {renderContent()}
      {renderActions()}
    </Dialog>
  );
};

export default EditTagGroupDialog;
