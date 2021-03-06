import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------
const user = sessionStorage && JSON.parse(sessionStorage.getItem('user'));
const campaignOneClicks = [];
const campaignTwoClicks = [];
const campaignThreeClicks = [];
for(let i = 0; i< user?.campaignClicks?.length; i++) {
  campaignOneClicks.push(user?.campaignClicks[i]?.campaignOneClicks);
  campaignTwoClicks.push(user?.campaignClicks[i]?.campaignTwoClicks);
  campaignThreeClicks.push(user?.campaignClicks[i]?.campaignThreeClicks)
}
const CHART_DATA = [
  { name: 'Campaign 1', data: campaignOneClicks},//[80, 50, 30, 40, 100, 20] },
  { name: 'Campaign 2', data: campaignTwoClicks},//[20, 30, 40, 80, 20, 80] },
  { name: 'Campaign 3', data: campaignThreeClicks}//[44, 76, 78, 13, 43, 10] }
];

export default function AppCurrentSubject() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: ['New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune'],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary
          ]
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Campaign Clicks" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="radar" series={CHART_DATA} options={chartOptions} height={340} />
      </ChartWrapperStyle>
    </Card>
  );
}
