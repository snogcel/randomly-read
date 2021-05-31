import React from 'react';
import { styles } from '../../../../exerciseThemeHandler';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

class Introduction extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Box>
          <Typography variant="h5" component="h2" className={classes.mobileHeading}>
            Introductory Text
          </Typography>

          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            Speech therapy with a focus on specific consonant and vowel sounds
          </Typography>

          <br />

          <Typography variant="body2" color="textPrimary" component="p" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras finibus est vitae sem fringilla varius in vitae tortor. Pellentesque ullamcorper sagittis justo at rutrum. Proin eu semper ligula. Cras maximus nec ligula a accumsan. Morbi pellentesque faucibus purus non congue. Fusce interdum hendrerit ipsum eget euismod. Vestibulum commodo vulputate neque, vitae aliquam velit placerat nec. Praesent in urna et augue mattis eleifend. Pellentesque bibendum urna neque, id maximus tellus ullamcorper sit amet. Vivamus elementum leo vitae auctor venenatis. Sed tincidunt justo eget lobortis vehicula. Etiam vehicula purus felis, ac dignissim nulla feugiat eu. Proin a felis vitae ipsum posuere lobortis vitae dignissim ex. Pellentesque imperdiet maximus mauris eu tempor. Integer elit ex, aliquam eget odio et, ornare aliquet dui. Curabitur hendrerit ultricies erat, at volutpat nibh pellentesque non.
          </Typography>
        </Box>
      </React.Fragment>
    );
  }
}

const IntroductionWrapped = withStyles(styles)(Introduction);

export default IntroductionWrapped;
