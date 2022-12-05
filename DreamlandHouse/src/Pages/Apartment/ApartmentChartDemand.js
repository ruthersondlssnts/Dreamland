import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { Button, Divider } from "@mui/material";
import moment from "moment";
import { getApartmentDemandApi } from "../../apis";
import { CHART_TIMESCALE } from "../../constants/Constants";

export default function ApartmentChartDemand({ apartment }) {
  const [chartData, setChartData] = useState({
    data: {
      labels: "",
      datasets: [],
    },
  });

  const chartRef = useRef(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  ChartJS.defaults.font.family = "QuickSand";
  ChartJS.defaults.font.size = 16;

  useEffect(() => {
    getApartmentDemand(CHART_TIMESCALE.Max);
  }, []);

  function getApartmentDemand(timescale) {
    getApartmentDemandApi(timescale, apartment.referenceNumber).then((res) => {
      let demand = {};
      switch (timescale) {
        case CHART_TIMESCALE.Max:
          demand.labels = res.data.map((d) =>
            new moment(d.dateTime).format("YYYY")
          );
          demand.title = "All time";
          break;
        case CHART_TIMESCALE.FiveDays:
          demand.labels = res.data.map((d) =>
            new moment(d.dateTime).format("MMM D")
          );
          demand.title = "Past 5 days";
          break;
        case CHART_TIMESCALE.SixMonths:
          demand.labels = res.data.map((d) =>
            new moment(d.dateTime).format("MMM YYYY")
          );
          demand.title = "Past 6 months";
          break;
        case CHART_TIMESCALE.YearToDate:
          demand.labels = res.data.map((d) =>
            new moment(d.dateTime).format("MMM YYYY")
          );
          demand.title = "Year to date";
          break;
        case CHART_TIMESCALE.OneMonth:
          demand.labels = res.data.map((d) =>
            new moment(d.dateTime).format("MMM D")
          );
          demand.title = "Past month";
          break;
        default:
          break;
      }

      const gradient = chartRef.current.ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");

      let data = {
        data: {
          labels: res.data.map((d) => new moment(d.dateTime).format("ll")),
          datasets: [
            {
              label: demand.title + " Enquiries",
              data: res.data.map((d) => d.count),
              borderColor: "black",
              backgroundColor: grey[700],
              fill: true,
              tension: 0.4,
              pointRadius: 2,
              backgroundColor: gradient,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Demand for ${apartment?.name} by ${apartment?.project}`,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 2,
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 5,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };
      setChartData(data);
    });
  }

  return (
    <Box display="flex" flexDirection={"column"} gap={2}>
      <Box>
        <Line
          ref={chartRef}
          options={chartData?.options}
          data={chartData?.data}
        />
      </Box>
      <Box display="flex" flexDirection="row" gap={1} justifyContent="center">
        <Button onClick={() => getApartmentDemand(CHART_TIMESCALE.FiveDays)}>
          5D
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={() => getApartmentDemand(CHART_TIMESCALE.OneMonth)}>
          1M
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={() => getApartmentDemand(CHART_TIMESCALE.SixMonths)}>
          6M
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={() => getApartmentDemand(CHART_TIMESCALE.YearToDate)}>
          YTD
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button onClick={() => getApartmentDemand(CHART_TIMESCALE.Max)}>
          Max
        </Button>
      </Box>
    </Box>
  );
}
