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

const MultiLineChart = ({ title, chartId, boxes = [] }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      annotations: {
        yaxis: [
          {
            y: 25,
            borderColor: '#E63946',
          },
          {
            y: 10,
            borderColor: '#E63946',
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
        type: 'line',
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
        align: 'left',
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
    if (boxes.length) {
      //build data series of multi line chart
      const series = boxes.map(box => {
        return {
          name: box.id,
          data: box.temperature?.details.map(dataPoint => dataPoint.value),
        };
      });

      //build options to set label dynamically
      const options = {
        ...chartState.options,
        labels: boxes[boxes.length - 1].temperature?.details.map(
          dataPoint => dataPoint.time
        ),
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
  }, [title, boxes]);

  return (
    <Container id="chart">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={250}
        width={450}
      />
    </Container>
  );
};

MultiLineChart.propTypes = {
  title: PropTypes.string.isRequired,
  boxes: PropTypes.array.isRequired,
  chartId: PropTypes.string.isRequired,
};

export default MultiLineChart;
