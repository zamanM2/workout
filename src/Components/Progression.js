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
    async function fetchLogData() {
      await getLogHistory(currentUser.uid, id).then((snapshot) => {
        const keys = Object.keys(snapshot.val());
        data.labels = keys;
        const myDataArray = [
          {
            label: "Yellow",
            data: [],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ];
        for (let i = 0; i < keys.length; i++) {
          let max =-1;
          for (let j = 0; j < snapshot.val()[keys[i]].length; j++) {
          if(snapshot.val()[keys[i]][j].weight > max){
            max = snapshot.val()[keys[i]][j].weight;
          }
          }
           myDataArray[0].data.push(max)
        }

        data.datasets = myDataArray;

        updateState({});

      });
    }
    fetchLogData();
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
