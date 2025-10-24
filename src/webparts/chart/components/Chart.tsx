import * as React from "react";
import type { IChartProps } from "./IChartProps";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  // DoughnutController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // DoughnutController,
  ArcElement
);

export default class Charts extends React.Component<IChartProps> {
  public render(): React.ReactElement<IChartProps> {
    const data = {
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Sample",
          data: [10, 20, 30],
          backgroundColor: "rgba(33, 153, 153, 0.4)",
        },
        {
          label: "Sample2",
          data: [20, 25, 35],
          backgroundColor: "rgba(20, 86, 86, 0.4)",
        },
        {
          label: "Sample2",
          data: [30, 40, 50],
          backgroundColor: "rgba(22, 72, 143, 0.4)",
        },
      ],
    };

    return <Bar data={data} />;
  }
}
