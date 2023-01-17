import PropTypes from 'prop-types';
// @mui
import {Box, FormControl, MenuItem, Select} from '@mui/material';

// ----------------------------------------------------------------------

WallpaperPostSort.propTypes = {
    options: PropTypes.array,
    onSort: PropTypes.func,
};

export default function WallpaperPostSort({options, onSort, selected}) {
    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <Select id="demo-simple-select" value={selected} onChange={(newVal) => onSort(newVal.target.value)}>
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
