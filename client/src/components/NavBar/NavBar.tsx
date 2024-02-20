import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';

export const NavBar = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="primary"
        enableColorOnDark
        elevation={0}
        sx={{ lineHeight: '55px' }}
      >
        WorldwideTrade
      </AppBar>
    </Stack>
  );
};
