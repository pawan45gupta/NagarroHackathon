import { Icon } from '@iconify/react';
// import alert-filled as alertFilled from '@iconify/icons-ant-design/alert-filled';
// material
import appleFilled from '@iconify/icons-ant-design/alert-filled';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.light
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
const user = sessionStorage && JSON.parse(sessionStorage.getItem('user'));
const TOTAL = user?.userStatistics?.creditScore;

export default function AppFraud() {
  return (
    <RootStyle> 
      {/* //onClick={() => window.location.href = "/fraud-detection"}> */}
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Credit Score
      </Typography>
    </RootStyle>
  );
}
