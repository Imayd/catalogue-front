import React, { useEffect, useState, useRef } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const Repo = () => {
  const chartContainer = useRef(null);
  const [modules, setModules] = useState(["hh", "hhh", "hoo", "hokka"]);
  const [prc, setprc] = useState([3, 7, 8, 19]);
  const [chartInstance, setChartInstance] = useState(null);
  const chartConfig = {
    type: "bar",
    data: {
      labels: modules,
      datasets: [
        {
          data: prc,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              callback: function (value) {
                return value + "%";
              },
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Percentage d'absence",
            },
          },
        ],
      },
    },
  };

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Repo;
