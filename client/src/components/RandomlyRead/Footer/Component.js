import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ListItemIcon from "@mui/material/ListItemIcon";
import List from '@mui/material/List';
import CheckboxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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