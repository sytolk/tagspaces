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
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import DocumentationIcon from '@material-ui/icons/Help';
import AboutIcon from '@material-ui/icons/BlurOn';
import ChangeLogIcon from '@material-ui/icons/ImportContacts';
import OnboardingIcon from '@material-ui/icons/Explore';
import WebClipperIcon from '@material-ui/icons/Transform';
import EmailIcon from '@material-ui/icons/Email';
import IssueIcon from '@material-ui/icons/BugReport';
import TranslationIcon from '@material-ui/icons/Translate';
import NewFeatureIcon from '@material-ui/icons/Gesture';
import SocialIcon from '@material-ui/icons/ThumbUp';
import Social2Icon from '@material-ui/icons/Mood';
import KeyShortcutsIcon from '@material-ui/icons/Keyboard';
import ProTeaserIcon from '@material-ui/icons/FlightTakeoff';
import CustomLogo from './CustomLogo';
import ProTeaser from '../assets/images/spacerocket_undraw.svg';
import styles from './SidePanels.css';
import AppConfig from '../config';
import i18n from '../services/i18n';
import { Pro } from '../pro';

interface Props {
  classes?: any;
  theme?: any;
  openURLExternally: (url: string, skipConfirmation?: boolean) => void;
  openFileNatively: (url: string) => void;
  toggleAboutDialog?: () => void;
  toggleKeysDialog: () => void;
  toggleOnboardingDialog: () => void;
  toggleProTeaser: () => void;
  style?: any;
}

const HelpFeedbackPanel = (props: Props) => {
  const {
    classes,
    openURLExternally,
    openFileNatively,
    toggleAboutDialog,
    toggleKeysDialog,
    toggleOnboardingDialog,
    toggleProTeaser
  } = props;

  return (
    <div className={classes.panel} style={props.style}>
      <CustomLogo />
      <Typography
        className={classNames(classes.panelTitle, classes.header)}
        variant="subtitle1"
      >
        Help & Feedback
      </Typography>
      <div className={classes.helpFeedbackArea}>
        <List dense={false} component="nav" aria-label="main help area">
          <ListItem
            button
            onClick={toggleAboutDialog}
            title="Opens the about dialog"
          >
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:aboutTitle')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() =>
              openURLExternally(AppConfig.documentationLinks.general, true)
            }
          >
            <ListItemIcon>
              <DocumentationIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('Open Documentation')}
            </Typography>
          </ListItem>
          <ListItem button onClick={toggleKeysDialog}>
            <ListItemIcon>
              <KeyShortcutsIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:shortcutKeys')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() =>
              openURLExternally(AppConfig.links.changelogURL, true)
            }
            title="Opens the changelog of the app"
          >
            <ListItemIcon>
              <ChangeLogIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:whatsNew')}
            </Typography>
          </ListItem>
          <ListItem button onClick={toggleOnboardingDialog}>
            <ListItemIcon>
              <OnboardingIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:onboardingWizard')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.webClipper, true)}
          >
            <ListItemIcon>
              <WebClipperIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:webClipper')}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.suggestFeature)}
          >
            <ListItemIcon>
              <NewFeatureIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:suggestNewFeatures')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.reportIssue)}
          >
            <ListItemIcon>
              <IssueIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:reportIssues')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.helpTranslating)}
          >
            <ListItemIcon>
              <TranslationIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:helpWithTranslation')}
            </Typography>
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => openFileNatively(AppConfig.links.emailContact)}
          >
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:emailContact')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.twitter)}
          >
            <ListItemIcon>
              <Social2Icon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:followOnTwitter')}
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => openURLExternally(AppConfig.links.facebook)}
          >
            <ListItemIcon>
              <SocialIcon />
            </ListItemIcon>
            <Typography style={{ color: props.theme.palette.text.primary }}>
              {i18n.t('core:likeUsOnFacebook')}
            </Typography>
          </ListItem>
          {Pro && (
            <React.Fragment>
              <Divider />
              <ListItem button onClick={toggleProTeaser}>
                <ListItemIcon>
                  <ProTeaserIcon />
                </ListItemIcon>
                <Typography style={{ color: props.theme.palette.text.primary }}>
                  {i18n.t('TagSpaces Pro Overview')}
                </Typography>
              </ListItem>
            </React.Fragment>
          )}
        </List>
        {!Pro && (
          <React.Fragment>
            {/* <Divider /> */}
            <div
              onClick={toggleProTeaser}
              role="button"
              tabIndex={0}
              style={{
                backgroundColor: 'rgba(29, 209, 159, 0.08)',
                textAlign: 'center'
              }}
            >
              <CardContent
                style={{
                  paddingBottom: 0
                }}
              >
                <Typography color="textSecondary" gutterBottom>
                  Achieve more with
                </Typography>
                <Typography variant="h6" component="h2" color="textPrimary">
                  TagSpaces Pro
                </Typography>
                <img
                  style={{ maxHeight: 80, marginTop: 10 }}
                  src={ProTeaser}
                  alt=""
                />
              </CardContent>
              <CardActions
                style={{ flexDirection: 'row', justifyContent: 'center' }}
              >
                <Button
                  size="small"
                  onClick={(event: any) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleProTeaser();
                  }}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  onClick={(event: any) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openURLExternally(AppConfig.links.productsOverview, true);
                  }}
                >
                  Get It
                </Button>
              </CardActions>
            </div>
            {/* <Divider /> */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(HelpFeedbackPanel);
