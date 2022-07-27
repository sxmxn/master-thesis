import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import apexchart from 'apexcharts';

export const Container = styled.div`
  text {
    fill: #fff !important;
  }
`;

const AreaChart = ({ title, chartId, box }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      colors: ['#E2FEFF'],
      markers: {
        size: 6,
        strokeWidth: 0,
      },
      annotations: {
        yaxis: [
          {
            y: 50,
            y2: 25,
            fillColor: '#E63946',
          },
          {
            y: 10,
            y2: 0,
            fillColor: '#457B9D',
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      chart: {
        id: chartId,
        height: 250,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
      },
      labels: [],
      title: {
        text: title,
        style: {
          color: '#FFF',
        },
      },
      legend: {
        labels: {
          colors: '#fff',
          useSeriesColors: false,
        },
      },
    },
  });

  useEffect(() => {
    if (box) {
      //build data series for area chart
      const series = [
        {
          name: box.id,
          data: box.temperature?.details.map(dataPoint => dataPoint.value),
          type: 'area',
        },
      ];

      //build options to set label dynamically
      const options = {
        ...chartState.options,
        title: {
          ...chartState.options.title,
          text: title,
        },
        labels: box.temperature?.details.map(dataPoint => dataPoint.time),
      };

      // rebuild chart with new serie data and options
      apexchart.exec(chartId, 'updateOptions', { ...options, series });

      setChartState({
        series: series,
        options: options,
        ...chartState,
      });
    }
    // eslint-disable-next-line
  }, [title, box]);

  return (
    <Container id="chart">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="area"
        width={550}
      />
    </Container>
  );
};

AreaChart.propTypes = {
  title: PropTypes.string.isRequired,
  box: PropTypes.object,
  chartId: PropTypes.string.isRequired,
};

export default AreaChart;
