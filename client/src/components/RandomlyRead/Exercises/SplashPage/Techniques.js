import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Technique2 from '../../Techniques/Technique2/Component.js';
import Technique3 from '../../Techniques/Technique3/Component.js';
import Technique4 from '../../Techniques/Technique4/Component.js';

const StyledTechniqueRoot = styled(Box)(({ theme }) => ({
  flexGrow: 1
}));

const StyledContentHeading = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0, 3.5, 0),
  color: "#0B0F65",
  fontWeight: "bold"
}));

const StyledTechniqueAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: "#fdfdfd"
}));

const StyledTechniqueMainHeading = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0),
  color: "#0B0F65",
  fontWeight: "bold"
}));

const StyledTechniqueAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: "#fdfdfd",
  paddingTop: theme.spacing(0)
}));

const StyledDefinitionListRoot = styled(List)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing(0, 0)
}));

const StyledDefinitionListHeading = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1.5, 0, 0.5, 0),
  color: "#0B0F65",
  fontWeight: "500",
  fontSize: "1.25rem"
}));

const StyledDefinitionHeading = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0),
  fontSize: "1.15rem"
}));

const StyledDefinitionSecondaryText = styled(Typography)(({ theme }) => ({
  display: "block",
}));

const StyledDefinitionIcon = styled(FontAwesomeIcon)(({ theme }) => ({
  color: "#EBECFB",
  margin: theme.spacing(1, 0, 1, 0),
  paddingRight: theme.spacing(1)
}));

const StyledTextLink = styled(Link)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  textDecoration: 'underline'
}));

function Techniques() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledTechniqueRoot>

      <StyledContentHeading variant="h5" component="h2">
        Advanced Techniques
      </StyledContentHeading>

      <Accordion elevation={3} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <StyledTechniqueAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12}>
              <StyledTechniqueMainHeading variant="h5" component="h2">
                Phonation & Articulation
              </StyledTechniqueMainHeading>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Articulate, Pinch
              </Typography>
            </Grid>
          </Grid>
        </StyledTechniqueAccordionSummary>
        <StyledTechniqueAccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Technique2 />
            </Grid>
          </Grid>
        </StyledTechniqueAccordionDetails>
      </Accordion>

      <Accordion elevation={3} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <StyledTechniqueAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Grid container>
            <Grid item xs={12}>
              <StyledTechniqueMainHeading variant="h5" component="h2">
                Phonation & Transfer
              </StyledTechniqueMainHeading>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Articulate, Transfer, Pinch
              </Typography>
            </Grid>
          </Grid>
        </StyledTechniqueAccordionSummary>
        <StyledTechniqueAccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Technique3 />
            </Grid>
          </Grid>
        </StyledTechniqueAccordionDetails>
      </Accordion>

      <Accordion elevation={3} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <StyledTechniqueAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Grid container>
            <Grid item xs={12}>
              <StyledTechniqueMainHeading variant="h5" component="h2">
                Resonant Speech
              </StyledTechniqueMainHeading>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                Stop, Breathe, Relax, Phonate, Transfer, Pinch, Resonance
              </Typography>
            </Grid>
          </Grid>
        </StyledTechniqueAccordionSummary>
        <StyledTechniqueAccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <Technique4 />
            </Grid>
          </Grid>
        </StyledTechniqueAccordionDetails>
      </Accordion>

      <br /><br />

      <StyledDefinitionListHeading variant="h5" component="h2" color="textPrimary">
        Definitions
      </StyledDefinitionListHeading>

      <StyledDefinitionListRoot>
        <ListItemText
          primary={
            <React.Fragment>
              <StyledDefinitionIcon icon={faInfoCircle} size="2x" pull="left" />
              <StyledDefinitionHeading variant="body1" component="span" color="textPrimary">
                Diaphragmatic Breathing
              </StyledDefinitionHeading>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <StyledDefinitionSecondaryText variant="body1" component="span" color="textSecondary">
                This technique is commonly used in meditation and focuses on driving the breath using your Diaphragm rather than your chest. The most basic type of diaphragmatic breathing is done by inhaling through your nose and breathing out through your mouth.
                <br /><br />
                Learn More:
                <StyledTextLink href="https://www.healthline.com/health/diaphragmatic-breathing" color="textSecondary" variant="body1">
                  What Is Diaphragmatic Breathing?
                </StyledTextLink>
              </StyledDefinitionSecondaryText>
            </React.Fragment>
          }
        />
        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <StyledDefinitionIcon icon={faInfoCircle} size="2x" pull="left" />
                <StyledDefinitionHeading variant="body1" component="span" color="textPrimary">
                  Phonation
                </StyledDefinitionHeading>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <StyledDefinitionSecondaryText variant="body1" component="span" color="textSecondary">
                  Phonation is the act of producing sound through the vibration of the vocal folds in the larynx. Phonation can be viewed as a sort of "droning" or "humming" sound and is used to drive the production of the vowel sounds which allows for the production of speech.
                  <br /><br />
                  Learn More:
                  <StyledTextLink href="https://www.valsalva.org/phonation-blocks.htm" color="textSecondary" variant="body1">
                    Phonation and Valsalva-Stuttering Blocks
                  </StyledTextLink>
                </StyledDefinitionSecondaryText>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <StyledDefinitionIcon icon={faInfoCircle} size="2x" pull="left" />
                <StyledDefinitionHeading variant="body1" component="span" color="textPrimary">
                  Transfer
                </StyledDefinitionHeading>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <StyledDefinitionSecondaryText variant="body1" component="span" color="textSecondary">
                  Transfer is the process of routing the "robotic" speech generated in the nasal passages into normal sounding speech which is centered in the mouth. Transfer can be verified by gently placing an index finger against the nose to see if you feel vibration (you should not feel any at completion of Transfer).
                  <br /><br />
                  Learn More:
                  <StyledTextLink href="https://thevoicelady.com/nasal-voice/" color="textSecondary" variant="body1">
                    Take This Test to See If Your Voice Is Nasal or Not
                  </StyledTextLink>
                </StyledDefinitionSecondaryText>
              </React.Fragment>
            }
          />
        </ListItem>


        <ListItem alignItems="flex-start" disableGutters>
          <ListItemText
            primary={
              <React.Fragment>
                <StyledDefinitionIcon icon={faInfoCircle} size="2x" pull="left" />
                <StyledDefinitionHeading variant="body1" component="span" color="textPrimary">
                  Resonance
                </StyledDefinitionHeading>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <StyledDefinitionSecondaryText variant="body1" component="span" color="textSecondary">
                  Resonant speech is the goal of this treatment program and is simply a "condensed" version of the Transfer concept. The idea is to begin speech production in the nasal passages, then quickly and smoothly transitioning that speech into the mouth in a way that produces natural-sounding speech.
                </StyledDefinitionSecondaryText>
              </React.Fragment>
            }
          />
        </ListItem>

      </StyledDefinitionListRoot>

    </StyledTechniqueRoot>
  );
}

export default Techniques;
