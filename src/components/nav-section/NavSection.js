import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { ListItemText, Stack } from '@mui/material';
//
import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Stack {...other} direction={'row'} spacing={5}>
      {data.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        padding: 2,
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
          fontSize: '18px',
        },
      }}
    >
      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  );
}
