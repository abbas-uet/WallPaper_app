// @flow
import * as React from 'react';
import Draggable from 'react-draggable';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Link, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

Draggable.propTypes = {
  cancel: PropTypes.string,
  handle: PropTypes.string,
  children: PropTypes.node,
};

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

DialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  data: PropTypes.object,
};

export function DialogComponent({ open, handleClose, data }) {
  const { id, cover, title } = data;
  return (
    <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Download
      </DialogTitle>
      <DialogContent>
        <Card sx={{ position: 'relative' }}>
          <StyledCardMedia
            sx={{
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '1500%',
                height: '1500%',
                position: 'absolute',
                //  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }}
          >
            <StyledCover alt={title} src={cover} />
          </StyledCardMedia>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose}>Download</Button>
      </DialogActions>
    </Dialog>
  );
}
