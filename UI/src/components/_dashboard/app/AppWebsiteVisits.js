import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------
const user = sessionStorage && JSON.parse(sessionStorage.getItem('user'));
const websiteVisits = user?.websiteVisits;

const googleVisits = websiteVisits.map(item => item.googleVisits);
const facebookVisits = websiteVisits.map(item => item.facebookVisits);
const youtubeVisits = websiteVisits.map(item => item.youtubeVisits);
const CHART_DATA = [
  {
    name: 'Google',
    type: 'column',
    data: [...googleVisits]
  },
  {
    name: 'Facebook',
    type: 'area',
    data: [...facebookVisits]
  },
  {
    name: 'YouTube',
    type: 'line',
    data: [...youtubeVisits]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2021',
      '02/01/2021',
      '03/01/2021',
      '04/01/2021',
      '05/01/2021',
      '06/01/2021',
      '07/01/2021',
      '08/01/2021',
      '09/01/2021',
      '10/01/2021',
      '11/01/2021'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Website Visits" subheader={`(+${user?.conversionRates?.incrementConversionRateCompareToLastYear}%) than last year`}/>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
