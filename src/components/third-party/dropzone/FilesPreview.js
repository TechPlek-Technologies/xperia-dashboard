import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemText, ListItem } from '@mui/material';

// project-imports
import { DropzopType } from 'config';
import IconButton from 'components/@extended/IconButton';

// assets
import { CloseCircle, Document } from 'iconsax-react';

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //

export default function FilesPreview({ showList = false, files, onRemove, type }) {
  const theme = useTheme();
  const hasFile = files.length > 0;
  const layoutType = type;
  console.log('Files Name', files);

  return (
    <List
      disablePadding
      sx={{
        ...(hasFile && type !== DropzopType.standard && { my: 3 }),
        ...(type === DropzopType.standard && { width: 'calc(100% - 84px)' })
      }}
    >
      {files.map((file, index) => {
        // Assuming file contains the necessary data directly
        const { type: fileType } = file; // Extract preview and type
        if (showList) {
          return (
            <ListItem
              key={index}
              sx={{
                p: 0,
                m: 0.5,
                width: layoutType === DropzopType.standard ? 64 : 80,
                height: layoutType === DropzopType.standard ? 64 : 80,
                borderRadius: 1.25,
                position: 'relative',
                display: 'inline-flex',
                verticalAlign: 'text-top',
                border: `solid 1px ${theme.palette.divider}`,
                overflow: 'hidden'
              }}
            >
              {
                <img
                  alt="preview"
                  src={`${process.env.REACT_APP_API_URL}${file.url}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              }
              {!fileType?.includes('image') && <Document variant="Bold" style={{ width: '100%', fontSize: '1.5rem' }} />}

              {onRemove && (
                <IconButton
                  size="small"
                  color="error"
                  shape="rounded"
                  onClick={() => onRemove(file)}
                  sx={{
                    fontSize: '0.875rem',
                    bgcolor: 'background.paper',
                    p: 0,
                    width: 'auto',
                    height: 'auto',
                    top: 2,
                    right: 2,
                    position: 'absolute'
                  }}
                >
                  <CloseCircle variant="Bold" />
                </IconButton>
              )}
            </ListItem>
          );
        }

        return (
          <ListItem
            key={index}
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: 0.75,
              border: `solid 1px ${theme.palette.divider}`
            }}
          >
            <Document variant="Bold" style={{ width: '30px', height: '30px', fontSize: '1.15rem', marginRight: 4 }} />

            <ListItemText
              primary={typeof file === 'string' ? file : file.path}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                <CloseCircle variant="Bold" style={{ fontSize: '1.15rem' }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

FilesPreview.propTypes = {
  showList: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  type: PropTypes.string
};
