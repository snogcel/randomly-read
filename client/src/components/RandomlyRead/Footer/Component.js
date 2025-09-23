import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from '@material-ui/core/List';
import CheckboxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';

import { styles } from '../../../exerciseThemeHandler';

import BuyMeACoffee from '../Donate/Component';

export default function SiteFooter() {
    return (
      <Paper sx={{marginTop: 'calc(10% + 60px)',
      width: '100%',
      position: 'fixed',
      backgroundColor: 'transparent',
      bottom: 0,      
      width: '100%'
      }} component="footer" square elevation={0}>
        <Container maxWidth="lg">  
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              Copyright ©2022. [] Limited
            </Typography>
          </Box>
        </Container>
      </Paper>
    );
  }