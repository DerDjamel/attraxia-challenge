import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: '#333', boxShadow: 0 }}>
        <Toolbar></Toolbar>
      </AppBar>
    </Box>
  );
}
