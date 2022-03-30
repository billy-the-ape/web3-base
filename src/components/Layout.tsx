import { Box } from '@mui/material';
import AppBar from './AppBar';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box width="100%">
      <AppBar />
      {children}
    </Box>
  );
};

export default Layout;
