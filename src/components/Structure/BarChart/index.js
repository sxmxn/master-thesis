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

const BarChart = ({ title, chartId, box, labelYAxis, labelXAxis }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      colors: ['#A8DADC'],
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
      yaxis: {
        title: {
          text: labelYAxis ? labelYAxis : undefined,
        },
      },
      xaxis: {
        title: {
          text: labelXAxis ? labelXAxis : undefined,
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
          data: box.vibration.details_bar_chart.map(dataPoint => ({
            y: dataPoint.average,
            x: dataPoint.time,
            goals: [
              {
                name: 'max',
                value: dataPoint.max,
                strokeHeight: 3,
                strokeColor: '#E63946',
              },
            ],
          })),
        },
      ];

      const options = {
        ...chartState.options,
        title: {
          ...chartState.options.title,
          text: title,
        },
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
        type="bar"
        width={450}
      />
    </Container>
  );
};

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  box: PropTypes.object,
  chartId: PropTypes.string.isRequired,
  labelYAxis: PropTypes.string,
  labelXAxis: PropTypes.string,
};

export default BarChart;
