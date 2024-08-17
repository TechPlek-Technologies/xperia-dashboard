// material-ui
import { useTheme } from '@mui/material/styles';

import logoIcon from 'assets/images/newlogo.webp';
import logoIconDark from 'assets/images/logo.webp';
import { ThemeMode } from 'config';

const LogoIcon = () => {
  const theme = useTheme();

  return <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="icon logo" width="200" />;
};

export default LogoIcon;
