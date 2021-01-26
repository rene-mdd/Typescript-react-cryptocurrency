import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { ChartProps } from '../typescriptHelper/typescripthelpers';

const DataGraph: React.FC<ChartProps> = ({ props }: ChartProps) => {
  const pricesArray: number[] = [];

  useEffect(() => {
    if (props.data) {
      props.data.prices.map((price: Array<number>) => {
        pricesArray.push(price[1]);
        return pricesArray.length;
      });

      const ctx = 'myChart';
      (() => new Chart(ctx, {
        type: 'line',
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: 'Price fluctuation',
              data: pricesArray.slice(-7),
              fill: false,
              borderColor: 'rgba(44, 130, 201, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [
              {
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: 'Amount'
                }
              }
            ],
            xAxes: [
              {
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: 'Last 7 days'
                }
              }
            ]
          }
        }
      }))();
    }
  });

  return (
    <div className="chart-container">
      <canvas id="myChart" />
    </div>
  );
};

export default DataGraph;
