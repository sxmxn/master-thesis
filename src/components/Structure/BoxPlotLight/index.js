import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
import apexchart from 'apexcharts';

export const Container = styled.div`
  text {
    fill: #fff !important;
  };
  
  .apexcharts-boxPlot-series {
    text {
      fill: ${({ theme }) => theme.palette.primary.main} !important;
    };
    path {
      stroke-width: 4;
      stroke-linejoin: round;
      stroke: ${({ theme }) => theme.palette.primary.lighter};
      fill: ${({ theme }) => theme.palette.primary.lighter};
    }
    
    
    
    ${({ type }) =>
      type === 'VIBRATION' &&
      `
       path:nth-child(odd) {
      stroke-width: 0;
      display: none;
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
        enabled: true,
        formatter: function (val, opt) {
          return boxes[opt.dataPointIndex].average;
        },
        style: {
          colors: ['transparent'],
        },
        offsetY: 0,
        background: {
          enabled: true,
          borderColor: 'transparent',
        },
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
            y: [
              box.min,
              box.average - 0.7,
              box.average,
              box.average + 0.7,
              box.max,
            ],
          };
        }

        return {
          x: box.boxId,
          y: [
            box.min,
            box.average - 0.7,
            box.average,
            box.average + 0.7,
            box.max,
          ],
        };
      });

      const seriesData = [
        {
          ...boxPlotLightState.series[0],
          data: data,
        },
      ];

      const showAnnotations = boxes.some(box => box.max > 23);

      //build options to set annotations dynamically
      const options = {
        ...boxPlotLightState.options,
        dataLabels: {
          ...boxPlotLightState.options.dataLabels,
          offsetY: boxes.length <= 1 ? 0 : -1,
        },
        ...(showAnnotations &&
          type === 'TEMPERATURE' && {
            annotations: {
              yaxis: [
                {
                  y: 25,
                  borderColor: '#E63946',
                  offsetX: boxes.length <= 1 ? 0 : -50,
                  width: boxes.length <= 1 ? '100%' : '200%',
                },
              ],
            },
          }),
      };

      // rebuild chart with new serie data
      apexchart.exec(chartId, 'updateOptions', {
        ...options,
        series: seriesData,
      });

      setBoxPlotLightState({
        series: seriesData,
        options: options,
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
        height={230}
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
