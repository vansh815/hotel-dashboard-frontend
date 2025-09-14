import React, { useEffect, useState, useRef } from "react";
import { fetchDistributionMarketingPerformance } from "../services/api";
import { fetchMarketBenchmarkingFutureOutlook } from "../services/api";
import { Chart, registerables } from "chart.js";
import "../index.css";

Chart.register(...registerables);

const DistributionMarketing = () => {
  const pieChartRef = useRef(null);
  const [data, setData] = useState(null);
  const [benchmarkData, setBenchmarkData] = useState(null);

  useEffect(() => {
    fetchDistributionMarketingPerformance()
      .then((response) => setData(response.distributionMarketingPerformance))
      .catch((error) =>
        console.error("Error fetching distribution data:", error)
      );
  }, []);

  useEffect(() => {
    fetchMarketBenchmarkingFutureOutlook()
      .then((response) =>
        setBenchmarkData(response.marketBenchmarkingFutureOutlook)
      )
      .catch((error) =>
        console.error("Error fetching market benchmarking data:", error)
      );
  }, []);

  useEffect(() => {
    if (!data || !pieChartRef.current) return;

    if (pieChartRef.current.chartInstance) {
      pieChartRef.current.chartInstance.destroy();
    }

    pieChartRef.current.chartInstance = new Chart(
      pieChartRef.current.getContext("2d"),
      {
        type: "pie",
        data: {
          labels: data.roomNightsByChannel.labels,
          datasets: [
            {
              label: "Room Nights by Channel",
              data: data.roomNightsByChannel.data,
              backgroundColor: [
                "#3182ce",
                "#f59e0b",
                "#10b981",
                "#e53e3e",
                "#9f7aea",
              ], // Custom colors
              borderColor: "white",
              borderWidth: 2,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right" },
          },
        },
      }
    );
  }, [data]);

  if (!data)
    return <p className="loading">Loading Distribution & Marketing Data...</p>;

  return (
    <div className="distribution-wrapper">
      <h2 className="kpi-section-title">
        Distribution & Marketing Performance
      </h2>
      <hr className="kpi-divider" />

      {/* KPI Cards */}
      <div className="distribution-cards">
        {[
          {
            title: "Direct Booking Ratio",
            value: `${data.directBookingRatio}%`,
          },
          {
            title: "Pickup Rooms (Last 7 Days)",
            value: `${benchmarkData ? benchmarkData.pickupRooms : "-"} Rms`,
            extra: benchmarkData ? (
              <p className="kpi-change text-positive">
                {benchmarkData.pickupRevenue}
              </p>
            ) : null,
          },
        ].map((metric, index) => (
          <div key={index} className="distribution-card">
            <h3 className="kpi-title">{metric.title}</h3>
            <p className="kpi-value">{metric.value}</p>
            {metric.extra}
          </div>
        ))}
      </div>

      {/* Channel Mix Pie Chart */}
      <div className="distribution-charts">
        <div className="distribution-chart-container">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DistributionMarketing;
