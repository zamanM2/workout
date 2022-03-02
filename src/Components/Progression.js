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
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAuth } from "../Context/AuthContext";
import { getLogHistory } from "../Firebase/WorkoutApi";
import "../css/blackBtn.css";

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
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Progression = (props) => {
  const { currentUser } = useAuth();
  const [, updateState] = useState();
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    async function populateChartData() {
      await getLogHistory(currentUser.uid, id)
        .then((snapshot) => {
          const dates = Object.keys(snapshot.val());
          data.labels = dates.map((el) => {
            //x-axis
            return el.substr(5).replace("-", "/") + "/" + el.substr(0, 4);
          });
          const weightData = [
            {
              label: "Exercise",
              data: [], //y-axis
              borderColor: "#4169E1",
              backgroundColor: "#4169E1",
            },
          ];
          for (let i = 0; i < dates.length; i++) {
            let max = -1;
            for (let j = 0; j < snapshot.val()[dates[i]].length; j++) {
              if (
                parseFloat(snapshot.val()[dates[i]][j].weight) > parseFloat(max)
              ) {
                max = snapshot.val()[dates[i]][j].weight;
              }
            }
            weightData[0].data.push(max);
          }
          data.datasets = weightData;
          updateState({});
        })
        .catch((error) => {
          data.labels = [];
          data.datasets = [
            {
              label: "No Data",
              data: [],
              borderColor: "#4169E1",
              backgroundColor: "#4169E1",
            },
          ];
          updateState({});
        });
    }
    populateChartData();
  }, [id]);

  return (
    <Container>
      <Line options={options} data={data} type={"line"} />
      <br />
      <button onClick={() => navigate(-1)} className="blackBtn">
        Back
      </button>
    </Container>
  );
};

export default Progression;
