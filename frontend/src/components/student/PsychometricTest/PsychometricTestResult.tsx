import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const colors = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

const PsychometricTestResult: React.FC = () => {
  const { user } = useAppSelector((state) => state.student);
  const [psychometricResults, setPsychometricResults] = useState<{
    [key: string]: number;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.psychometric_result) {
      setPsychometricResults(user.psychometric_result);
    } else if (user && !user.psychometric_result) {
      navigate("/psychometric-test");
    }
  }, [navigate, user]);

  const data: ChartData<"bar"> = {
    labels: Object.keys(psychometricResults),
    datasets: [
      {
        label: "Scores",
        data: Object.values(psychometricResults),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
        borderRadius: 7,
        barThickness: 50,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: true,
          color: "rgba(0, 0, 0, 1)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="md:mt-14 md:ms-24 lg:mt-14 mt-14 ms-12 lg:ms-24">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Psychometric Test Results</h2>
      </div>
      {Object.keys(psychometricResults).length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
      <div className="flex flex-wrap mt-4">
        {Object.keys(psychometricResults).map((category, index) => (
          <div
            key={category}
            className="flex items-center mr-4 mb-2"
            style={{ color: borderColors[index] }}
          >
            <div
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: colors[index] }}
            ></div>
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychometricTestResult;
