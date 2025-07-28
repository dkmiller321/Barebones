import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    myChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.title),
        datasets: [
          {
            label: 'Items',
            data: data.map(item => item.id),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  return () => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }
  };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
