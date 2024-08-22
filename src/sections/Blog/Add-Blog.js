import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project-imports
import ReactDraft from 'sections/forms/plugins/ReactDraft';
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { ThemeDirection, ThemeMode } from 'config';

// ==============================|| PLUGIN - EDITOR ||============================== //

const Editor = ({ subtitle, setValue, value }) => {
  const theme = useTheme();
  const { themeDirection } = useConfig();
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sx={{
          '& .rdw-editor-wrapper': {
            bgcolor: theme.palette.background.paper,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '4px',
            overflow: 'visible',
            '& .rdw-editor-main': {
              px: 2,
              py: 0.5,
              border: 'none'
            },
            '& .rdw-editor-toolbar': {
              pt: 1.25,
              border: 'none',
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
              '& .rdw-option-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                borderColor: theme.palette.divider
              },
              '& .rdw-dropdown-wrapper': {
                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.lighter',
                borderColor: theme.palette.divider,
                '& .rdw-dropdown-selectedtext': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                },
                '& .rdw-dropdownoption-default': {
                  color: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[100] : 'secondary.darker'
                },
                '& .rdw-dropdown-carettoopen': {
                  position: themeDirection === ThemeDirection.RTL ? 'initial' : 'absolute'
                }
              },
              '& .rdw-emoji-modal': {
                left: { xs: -140, sm: -195, md: 5 }
              },
              '& .rdw-embedded-modal': {
                left: { xs: -100, sm: -165, md: 5 }
              },
              '& .rdw-link-modal': {
                left: { xs: 0, sm: -100, md: 5 }
              },
              '& .rdw-image-modal': {
                left: { xs: -190, sm: 30, md: 5 },
                top: '15px'
              },
              '& .rdw-colorpicker-modal': {
                left: { xs: -150, sm: 5 }
              }
            },
            ...(theme.direction === ThemeDirection.RTL && {
              '.rdw-dropdown-carettoopen': {
                position: 'absolute !important',
                right: '10%',
                left: 'inherit'
              },
              '.rdw-dropdown-carettoclose': {
                right: '10%',
                left: 'inherit'
              }
            })
          }
        }}
      >
        <MainCard title={subtitle} sx={{ overflow: 'visible' }}>
          <ReactDraft value={value} setValue={setValue} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Editor;

Editor.propTypes = {
  subtitle: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func
};
