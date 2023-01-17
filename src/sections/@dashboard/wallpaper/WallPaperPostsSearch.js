// @mui
import {alpha, styled} from '@mui/material/styles';
import {InputAdornment, OutlinedInput, Popper} from '@mui/material';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
    width: '280px !important',
});

// ----------------------------------------------------------------------

const StyledSearch = styled(OutlinedInput)(({theme}) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
        boxShadow: theme.customShadows.z8,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

export default function WallPaperPostsSearch({filterName, onFilterName}) {
    return (
        <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
                <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{color: 'text.disabled', width: 20, height: 20}}/>
                </InputAdornment>
            }
        />
        // <Autocomplete
        //   sx={{ width: 280 }}
        //   autoHighlight
        //   popupIcon={null}
        //   PopperComponent={StyledPopper}
        //   options={posts}
        //   getOptionLabel={(post) => post.title}
        //   isOptionEqualToValue={(option, value) => option.id === value.id}
        //   renderInput={(params) => (
        //     <TextField
        //       {...params}
        //       placeholder="Search Wallpaper..."
        //       InputProps={{
        //         ...params.InputProps,
        //         startAdornment: (
        //           <InputAdornment position="start">
        //             <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
        //           </InputAdornment>
        //         ),
        //       }}
        //     />
        //   )}
        // />
    );
}
