import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------
const user = sessionStorage && JSON.parse(sessionStorage.getItem('user'));
// canadaConversionRate: 666
// chinaConversionRate: 639
// conversionRatesId: 2
// franceConversionRate: 737
// germanyConversionRate: 771
// incrementConversionRateCompareToLastYear: 29
// italyConversionRate: 528
// japanConversionRate: 556
// netherlandsConversionRate: 972
// southKoreaConversionRate: 895
// unitedKingdomConversionRate: 1175
// unitedStatesConversionRate: 1062
const CHART_DATA = [{ data: [
  user?.conversionRates?.italyConversionRate,
  user?.conversionRates?.japanConversionRate,
  user?.conversionRates?.chinaConversionRate,
  user?.conversionRates?.canadaConversionRate,
  user?.conversionRates?.franceConversionRate,
  user?.conversionRates?.germanyConversionRate,
  user?.conversionRates?.southKoreaConversionRate,
  user?.conversionRates?.netherlandsConversionRate,
  user?.conversionRates?.unitedStatesConversionRate,
  user?.conversionRates?.unitedKingdomConversionRate,
]}];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'Italy',
        'Japan',
        'China',
        'Canada',
        'France',
        'Germany',
        'South Korea',
        'Netherlands',
        'United States',
        'United Kingdom'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Conversion Rates" subheader="(+43%) than last year" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
