import { IconButton, InputBase, Stack, SxProps, Theme } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import debounce from 'lodash.debounce';

const SearchInput = ({
  sx,
  searchValue,
  setSearchValue
}: {
  sx?: SxProps<Theme> | undefined;
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Stack
      direction={'row'}
      sx={{ backgroundColor: '#F2F2F2', borderRadius: '23px', ...sx }}>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchRoundedIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, paddingRight: 2 }}
        placeholder="Search Tickets"
        size={'small'}
        value={searchValue}
        onChange={(e) => {
          if (setSearchValue) setSearchValue(e.target.value);
        }}
      />
    </Stack>
  );
};

export default SearchInput;
