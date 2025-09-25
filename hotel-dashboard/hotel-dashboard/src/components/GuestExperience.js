import React, { useEffect, useState, useRef } from "react";
import { fetchGuestExperienceReputation } from "../services/api";
import { Chart, registerables } from "chart.js";
import "../index.css";

Chart.register(...registerables);

const GuestExperience = () => {
  const pieChartRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchGuestExperienceReputation()
      .then((response) => setData(response.guestExperienceReputation))
      .catch((error) =>
        console.error("Error fetching guest experience data:", error)
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
          labels: data.customerTypeDistribution.labels,
          datasets: [
            {
              label: "Customer Type Distribution",
              data: data.customerTypeDistribution.data,
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

  if (!data) return <p className="loading">Loading Guest Experience Data...</p>;

  return (
    <div className="guest-exp-wrapper">
      <h2 className="kpi-section-title">Guest Satisfaction & Demographics</h2>
      <hr className="kpi-divider" />
      {/* KPI Cards */}
      <div className="guest-exp-cards">
        {/* Guest Satisfaction Gauge */}
        <div className="guest-exp-card text-center">
          <h3 className="kpi-title">Guest Satisfaction</h3>
          <div className="gauge-container">
            <div
              className="gauge-fill"
              style={{
                width: `${(data.aggregatedSatisfaction.score / 5) * 120}px`,
              }}
            ></div>
            <div className="gauge-cover">
              <span className="gauge-value">
                {data.aggregatedSatisfaction.score}
              </span>
            </div>
          </div>
          <p className="text-xs text-red-500 mt-1">/ 5</p>
          <p className="kpi-change text-gray-100 text-sm mt-2">
            {" "}
            based on {data.aggregatedSatisfaction.basedOnReviews} reviews
          </p>
        </div>

        {/* Satisfaction by OTA */}
        <div className="guest-exp-card ota-satisfaction-card">
          <h3 className="kpi-title mb-3">Satisfaction by OTA</h3>
          <div className="guest-exp-cards ota-satisfaction-list">
            {data.satisfactionByOTA.map((ota, index) => (
              <div key={index} className="guest-exp-card text-center">
                <h3 className="kpi-title">{ota.name}</h3>
                <p className="kpi-value">{ota.score}</p>
                <p className="kpi-change">{ota.reviews} reviews</p>
              </div>
            ))}
          </div>
        </div>
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

export default GuestExperience;
