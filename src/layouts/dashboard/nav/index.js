import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
// mock
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
const NAV_WIDTH = 280;
export default function Nav() {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
      }}
    >
      {/*

       <Box sx={{ mb: 5, mx: 2.5 }}>
         <Link underline="none">
           <StyledAccount>
             <Avatar src={account.photoURL} alt="photoURL" />

             <Box sx={{ ml: 2 }}>
               <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                 {account.displayName}
               </Typography>

               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 {account.role}
               </Typography>
             </Box>
           </StyledAccount>
         </Link>
       </Box>
 */}
      <NavSection data={navConfig} />
    </Box>
  );
}
