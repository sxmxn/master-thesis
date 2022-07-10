import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import apexchart from 'apexcharts';

export const Container = styled.div`
  text {
    fill: #fff !important;
  },
  
  .apexcharts-boxPlot-series {
    path {
      stroke-width: 4;
    }
    
    ${({ type }) =>
      type === 'VIBRATION' &&
      `
       path:nth-child(odd) {
      stroke-width: 0;
     } 
    `}
  },
`;

const BoxPlotLight = ({ title, boxes, chartId, type }) => {
  const [boxPlotLightState, setBoxPlotLightState] = useState({
    series: [
      {
        type: 'boxPlot',
        data: [],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      stroke: {
        colors: ['#FFFFFF'],
      },
      chart: {
        id: chartId,
        type: 'boxPlot',
        height: 250,
        toolbar: {
          show: false,
        },
      },
      title: {
        text: title,
        align: 'left',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#FFF',
        },
      },
      grid: {
        show: false,
      },
    },
  });

  useEffect(() => {
    if (boxes.length) {
      //build data serie
      const data = boxes.map(box => {
        if (type === 'VIBRATION') {
          return {
            x: box.boxId,
            y: [box.min, box.average, box.average, box.average, box.max],
          };
        }

        return {
          x: box.boxId,
          y: [box.min, box.average, box.average, box.average, box.max],
        };
      });

      const seriesData = [
        {
          ...boxPlotLightState.series[0],
          data: data,
        },
      ];

      // rebuild chart with new serie data
      apexchart.exec(chartId, 'updateOptions', { series: seriesData });

      setBoxPlotLightState({
        series: seriesData,
        ...boxPlotLightState,
      });
    }
    // eslint-disable-next-line
  }, [title, boxes]);

  return (
    <Container id="chart" type={type}>
      <ReactApexChart
        options={boxPlotLightState.options}
        series={boxPlotLightState.series}
        type="boxPlot"
        height={250}
      />
    </Container>
  );
};

BoxPlotLight.propTypes = {
  title: PropTypes.string.isRequired,
  boxes: PropTypes.array.isRequired,
  chartId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['VIBRATION', 'TEMPERATURE']),
};

export default BoxPlotLight;
