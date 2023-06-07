import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ["2Days Ago", "YesterDay", "Today"];

// export const options = {
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

// 한현우 수정 : 전역변수를 Chart 컴포넌트 안으로 이동

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: "",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
//       borderColor: "rgb(1, 152, 117,0.5)",
//       backgroundColor: "rgba(104, 195, 163, 0.548)",
//     },
//   ],
// };

function Chart({studyTimeData}) {
  // 한현우 수정 : DashLeft에서 data 가져오기, State, 전역변수 data 이동, 차트 data 변경
  // const [studyTimes, setStudyTimes] = useState(studyTimeData);

  let studyTimes = {...studyTimeData};

  let studyTimeArr = [studyTimes.dayBeforeYesterday, studyTimes.yesterday, studyTimes.today];

  const options = {
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "",
        // data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
        data: labels.map((_, index) => studyTimeArr[index]),  // 한현우 수정
        borderColor: "rgb(1, 152, 117,0.5)",
        backgroundColor: "rgba(104, 195, 163, 0.548)",
      },
    ],
  };

  // 한현우 수정 : width(원래 80)
  return <Line data={data} options={options} height="200px" width="200px" style={{marginTop:"50px",marginBottom:"20px"}} />;
}

export default Chart;