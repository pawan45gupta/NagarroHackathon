import { Icon } from '@iconify/react';
// import alert-filled as alertFilled from '@iconify/icons-ant-design/alert-filled';
// material
import appleFilled from '@iconify/icons-ant-design/alert-filled';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.light,
  width: '100%',
  height: '100%'
}));

const AppFraudDetection = () => (
    <RootStyle>
        <iframe src="http://creditcard-frauddetection.coddeine.com/#/?_k=bns60j" title="Fraud Detection" frameBorder={0} allowFullScreen
      style=
      {{
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%",
          height: "800px",
      }}></iframe>
    </RootStyle>
);
export default AppFraudDetection;