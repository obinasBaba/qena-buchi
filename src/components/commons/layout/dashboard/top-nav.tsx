import { Box, Stack, Typography } from '@mui/material';
import s from './layoutdashboard.module.scss';
import Link from 'next/link';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

/*TopNav.propTypes = {
  onNavOpen: PropTypes.func
};*/

type PropsType = {
  onNavOpen: () => void;
};

export const TopNav = (props: PropsType) => {
  return (
    <>
      <Box
        component="header"
        className={s.top_nav}
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => '#A1612B',
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row">
            <Link href="/">
              <Typography variant="h5" color="wheat">
                BUCHI
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
