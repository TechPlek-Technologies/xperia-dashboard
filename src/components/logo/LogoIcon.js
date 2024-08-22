// material-ui
import { useTheme } from '@mui/material/styles';

import logoIcon from 'assets/images/logo1.webp';
import logoIconDark from 'assets/images/logo1.webp';
import { ThemeMode } from 'config';

const LogoIcon = () => {
  const theme = useTheme();

  return <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="icon logo" width="28" height="28" />;
};

export default LogoIcon;
