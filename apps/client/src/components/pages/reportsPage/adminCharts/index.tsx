import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function VacationsReport(props: { reportData: any }) {
  const { reportData } = props

  const labels = reportData?.map((v: any) => v?.vacation_destination)
  const data = reportData?.map((v: any) => v?.number_of_followers)

  return (
    reportData?.length > 0
      ?
      <Bar options={
        {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Vacations Report',
            },

          },
          scales: {
            y: {
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      }
        data={
          {
            labels,
            datasets: [
              {
                label: 'Follow count',
                data,
                backgroundColor: '#7E7E7E',
              }
            ],
          }
        } />
      :
      <h2> There is no vacations with at least one follow </h2>
  );
}
