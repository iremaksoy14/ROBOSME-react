import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

// Chart.js bileşenlerini kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PostChart = () => {
  const posts = useSelector((state) => state.posts.list);

  const userPostsCount = posts.reduce((acc, post) => {
    acc[post.userId] = acc[post.userId] ? acc[post.userId] + 1 : 1;
    return acc;
  }, {});

  console.log(userPostsCount);
  const chartData = {
    labels: Object.keys(userPostsCount),
    datasets: [
      {
        label: "Number of Posts per User",
        data: Object.values(userPostsCount),
        backgroundColor: "#1e90ff",
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Users and Post Counts",
      },
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={chartData} className="w-full" options={options} />;
};

export default PostChart;
