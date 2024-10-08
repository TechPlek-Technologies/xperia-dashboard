import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project-imports
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { Trash } from 'iconsax-react';
import { deleteData } from 'utils/clientFunctions';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertCustomerDelete({ title, open, handleClose, delete1, setDelete }) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose(false);
      }}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <Trash variant="Bold" />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete?
            </Typography>
            <Typography align="center">Deleted project data cannot be recovered</Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              fullWidth
              color="error"
              variant="contained"
              onClick={async () => {
                const response = await deleteData(`${process.env.REACT_APP_API_URL}/projects/${title}`);
                if (response.success) {
                  setDelete(delete1 + 1);
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: 'Data deleted successfully.',
                      variant: 'alert',
                      // anchorOrigin: {
                      //   vertical: 'top',
                      //   horizontal: 'right'
                      // },
                      alert: {
                        color: 'success'
                      },
                      close: false
                    })
                  );
                } else {
                  dispatch(
                    openSnackbar({
                      open: true,
                      message: 'Failed to delete data. Please try again.',
                      variant: 'alert',
                      // anchorOrigin: {
                      //   vertical: 'top',
                      //   horizontal: 'right'
                      // },
                      alert: {
                        color: 'error'
                      },
                      close: false
                    })
                  );
                }
                handleClose(true);
              }}
              autoFocus
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertCustomerDelete.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  delete1: PropTypes.number,
  setDelete: PropTypes.func
};
