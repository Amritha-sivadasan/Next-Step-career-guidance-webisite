import React, { useEffect, useState } from "react";
import { fetchAllDetails } from "../../../services/api/adminApi";
import { IBooking } from "../../../@types/booking";
import { IvidoeCall } from "../../../@types/videoCall";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { IExpert } from "../../../@types/expert";
import LoadingPage from "../../common/Loading/LoadingPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard: React.FC = () => {
  const [details, setDetails] = useState<{
    bookings: IBooking[];
    experts: number;
    meetings: IvidoeCall[];
    students: number;
  }>();
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthltPayment, setmonthltPayment] = useState<number[]>([]);
  const [categoryData, setCategoryData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetChData = async () => {
      const response = await fetchAllDetails();
      setDetails(response.data);

      const totalpayment: IBooking[] = response.data.bookings;
      const sum = totalpayment.reduce((acc, curr) => {
        if (curr.paymentStatus === "completed") {
          acc += Number(curr.paymentAmount);
        }
        return acc;
      }, 0);
      setTotalAmount(sum);

      const paymentBuMonth: number[] = new Array(12).fill(0);
      totalpayment.forEach((booking) => {
        if (booking.paymentStatus === "completed") {
          const date = new Date(booking.createdAt);
          const month = date.getMonth();
          paymentBuMonth[month] += Number(booking.paymentAmount);
        }
      });
      setmonthltPayment(paymentBuMonth);

      const categoryMap = new Map<string, number>();
      totalpayment.forEach((booking) => {
        const expert = booking.expertId as IExpert;
        const category = expert.subCatName;

        if (categoryMap.has(category)) {
          categoryMap.set(category, categoryMap.get(category)! + 1);
        } else {
          categoryMap.set(category, 1);
        }
      });
   

      const labels = Array.from(categoryMap.keys());
      const data = Array.from(categoryMap.values());
      console.log("Category Data", { labels, data });

      setCategoryData({
        labels,
        data,
      });
    };
    fetChData();
    setLoading(false)
  }, []);

  const monthlyPaymentsData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Payments",
        data: monthltPayment,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };

  const categoryChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        label: "Best Category",
        data: categoryData.data,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(75, 192, 192, 0.6)"); 
          gradient.addColorStop(1, "rgba(75, 192, 192, 0.2)"); 
          return gradient;
        },
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "rgb(75, 75, 75)",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(75, 75, 75)",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(75, 75, 75)",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoadingPage />
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Payment Amount</h2>
          <p className="text-2xl font-semibold">{totalAmount}</p>
          <p className="text-red-500">2.5% Down from yesterday</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Completed Session</h2>
          <p className="text-2xl font-semibold">{details?.meetings.length}</p>
          <p className="text-green-500">1.3% Up from yesterday</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Experts</h2>
          <p className="text-2xl font-semibold">{details?.experts}</p>
          <p className="text-green-500">1.2% Up from past week</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-2xl font-semibold">{details?.students}</p>
          <p className="text-green-500">1.5% Up from past week</p>
        </div>
      </div>
      <div className="flex max-w-screen-lg">
        <div className="mt-6 bg-white p-4 shadow rounded-lg w-6/12">
          <h2 className="text-gray-500">Payment Details</h2>
          <div className="h-80">
            <Line data={monthlyPaymentsData} options={options} />
          </div>
        </div>
        <div className="mt-6 bg-white p-4 shadow rounded-lg w-6/12">
          <h2 className="text-gray-500">Category Details</h2>
          <div className="h-80">
            <Bar data={categoryChartData} options={options} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
