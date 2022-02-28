import React, { useEffect, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAuth } from "../Context/AuthContext";
import { getLogHistory } from "../Firebase/WorkoutApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Your Progression",
    },
  },
};

const data = {
  labels: [],
  datasets: [
    {
      label: "Exercise",
      data: ["1", "2", "3", "4", "5", "6", "2"],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Progression = (props) => {
  const { currentUser } = useAuth();
  let { id } = useParams();
  const [, updateState] = useState();

  useEffect(() => {
    async function fetchLogData() {
      await getLogHistory(currentUser.uid, id).then((snapshot) => {
        data.labels = Object.keys(snapshot.val());
        updateState({});
      });
    }
    fetchLogData();
  }, [id]);

  return (
    <Container>
      <Line options={options} data={data} type={"line"} />;
    </Container>
  );
};

export default Progression;
