import { connect } from 'react-redux';
import { compose } from 'redux';

import Splash from './Component';

const mapStateToProps = state => ({
});

const mapDispatchToProps = { };

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const SplashContainer = enhance(Splash);

export default Splash;
