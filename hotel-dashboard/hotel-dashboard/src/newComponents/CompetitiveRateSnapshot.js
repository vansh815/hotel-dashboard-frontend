// src/newComponents/CompetitiveRateSnap.js
import React, { useEffect, useState, useRef } from "react";
import { fetchCompetitiveRateSnapshot } from "../services/api";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function CompetitiveRateSnap() {
  const ChartRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCompetitiveRateSnapshot()
      .then((response) => setData(response.competitiveRateSnapshot))
      .catch((error) =>
        console.error("Error fetching competitive rate snapshot:", error)
      );
  }, []);

  useEffect(() => {
    if (!data || !ChartRef.current) return;

    // Destroy old chart if exists
    if (ChartRef.current.chartInstance) {
      ChartRef.current.chartInstance.destroy();
    }

    // Init chart
    ChartRef.current.chartInstance = new Chart(
      ChartRef.current.getContext("2d"),
      {
        type: "line",
        data: {
          labels: data.futureRateComparison.labels,
          datasets: [
            {
              label: "Your Hotel Rate",
              data: data.futureRateComparison.yourHotelRates,
              borderColor: "#2c5282",
              backgroundColor: "rgba(44, 82, 130, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#2c5282",
              pointRadius: 4,
            },
            {
              label: "CompSet Median Rate",
              data: data.futureRateComparison.compSetMedianRates,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#f59e0b",
              pointRadius: 4,
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            title: {
              display: true,
              text: "Future Rate Comparison (Next 7 Days)",
              font: { size: 16, family: "Poppins", weight: "600" },
              color: "#2c5282",
            },
          },
        },
      }
    );
  }, [data]);

  if (!data) {
    return (
      <p className="text-center text-gray-500">
        Loading Competitive Rate Snapshot…
      </p>
    );
  }

  return (
    <div className="competitive-rate-wrapper">
      {/* Section Title */}
      <h2 class="kpi-section-title">Competitive Rate Snapshot</h2>
      <hr className="kpi-divider" />

      {/* 4 KPI Cards */}
      <div className="competitive-rate-cards">
        <div className="kpi-card">
          <h3 className="kpi-title">Your Lead Rate (Tonight)</h3>
          <p className="kpi-value">${data.leadRateTonight}</p>
          <p className="kpi-change text-neutral">
            vs. ${data.compSetMedianTonight} CompSet Median
          </p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">CompSet Median (Tonight)</h3>
          <p className="kpi-value">${data.compSetMedianTonight}</p>
          <p className="kpi-change text-positive">{data.futureRateChange}</p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">CompSet Rate Range (Tonight)</h3>
          <p className="kpi-value text-base">{data.compSetRateRange}</p>
          <p className="kpi-change text-neutral">5 Competitors Tracked</p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">Your Rate Rank (Tonight)</h3>
          <p className="kpi-value">{data.rateRankTonight} </p>
          <p className="kpi-change text-neutral">Above 2, Below 2</p>
        </div>
      </div>

      {/* Rate Comparison Chart Row */}
      <div className="competitive-rate-charts">
        <div className="chart-container">
          <canvas ref={ChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

{
  /* KPI Cards
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-6">
        <div className="kpi-card">
          <h3 className="kpi-title">Your Lead Rate (Tonight)</h3>
          <p className="kpi-value">${data.leadRateTonight}</p>
          <p className="kpi-change text-neutral">
            vs. ${data.compSetMedianTonight} CompSet Median
          </p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">CompSet Median (Tonight)</h3>
          <p className="kpi-value">${data.compSetMedianTonight}</p>
          <p className="kpi-change text-positive">{data.futureRateChange}</p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">CompSet Rate Range (Tonight)</h3>
          <p className="kpi-value text-base">{data.compSetRateRange}</p>
          <p className="kpi-change text-neutral">5 Competitors Tracked</p>
        </div>

        <div className="kpi-card">
          <h3 className="kpi-title">Your Rate Rank (Tonight)</h3>
          <p className="kpi-value">
            {data.rateRankTonight}{" "}
            <span className="text-sm font-normal">Lowest</span>
          </p>
          <p className="kpi-change text-neutral">Above 2, Below 2</p>
        </div>
      </div> */
}
{
  /* First Row - 4 KPI Cards */
}
