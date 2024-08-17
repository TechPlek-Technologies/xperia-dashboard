import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

import logoIcon from 'assets/images/newlogo.webp';
import logoIconDark from 'assets/images/logo.webp';
import { ThemeMode } from 'config';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = () => {
  const theme = useTheme();
  return <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="icon logo" width="200" />;
};

LogoMain.propTypes = {
  reverse: PropTypes.bool
};

export default LogoMain;
