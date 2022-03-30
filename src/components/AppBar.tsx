import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Skeleton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { linkProps } from '@/util/form';
import AppIcon from '@mui/icons-material/CropOriginal';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import useWeb3Session from '@/hooks/useWeb3Session';
import { shortenAddress } from '@/util/string';
import NextNProgress from 'nextjs-progressbar';

const BUTTON_WIDTH = 170;

const HeaderBox = styled(Box)(({ theme: { palette } }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: palette.common.white,
  textDecoration: 'none',
}));

const AppBar: React.FC = () => {
  const { t } = useTranslation();

  const { signIn, signOut, status, address } = useWeb3Session();

  return (
    <MuiAppBar>
      <NextNProgress options={{ showSpinner: false }} />
      <Toolbar>
        <Box flex="1">
          <HeaderBox {...linkProps('/')}>
            <AppIcon />
            <Typography sx={{ ml: 1 }} variant="h5">
              {t('frames')}
            </Typography>
            <Typography fontSize="10px" component="sup" sx={{ ml: 0.5, mb: 1 }}>
              {t('beta')}
            </Typography>
          </HeaderBox>
        </Box>
        {status === 'loading' && (
          <Skeleton animation="wave" height={37} width={BUTTON_WIDTH} />
        )}
        {status === 'unauthenticated' && (
          <Button
            variant="outlined"
            sx={{
              width: BUTTON_WIDTH,
              display: 'flex',
            }}
            onClick={signIn}
          >
            <WalletIcon sx={{ mr: 1 }} />
            <Box flex="1" textAlign="center">
              {t('connect')}
            </Box>
          </Button>
        )}
        {status === 'authenticated' && address && (
          <Button
            variant="outlined"
            sx={{ width: BUTTON_WIDTH }}
            onClick={signOut}
          >
            <WalletIcon sx={{ mr: 1 }} />
            {shortenAddress(address)}
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
