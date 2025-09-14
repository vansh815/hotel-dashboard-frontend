import React, { useEffect, useState } from "react";
import { fetchKpiData } from "../services/api";
import Chart from "chart.js/auto";

const KpiSection = () => {
  const [kpis, setKpis] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchKpiData(); // Fetch KPI & Chart data from API
      if (fetchedData) {
        setKpis(fetchedData.kpis || []);
        setChartData(fetchedData.chart || null);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = document
        .getElementById("keyMetricsTrendChart")
        ?.getContext("2d");
      if (ctx) {
        if (window.keyMetricsChart) {
          window.keyMetricsChart.destroy();
        }
        window.keyMetricsChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.labels, // Dynamic labels from API
            datasets: [
              {
                label: "RevPAR",
                data: chartData.revpar,
                borderColor: "#3182ce",
                tension: 0.4,
                fill: false,
                pointBackgroundColor: "#3182ce",
                pointRadius: 4,
                yAxisID: "yCurrency",
              },
              {
                label: "ADR",
                data: chartData.adr,
                borderColor: "#4299E1",
                tension: 0.4,
                fill: false,
                pointBackgroundColor: "#4299E1",
                pointRadius: 4,
                yAxisID: "yCurrency",
              },
              {
                label: "Occupancy",
                data: chartData.occupancy,
                borderColor: "#F6AD55",
                tension: 0.4,
                fill: false,
                pointBackgroundColor: "#F6AD55",
                pointRadius: 4,
                yAxisID: "yPercentage",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "bottom" }, // Legend at the bottom
            },
            scales: {
              x: {
                ticks: {
                  font: { size: 12, family: "Poppins", weight: "bold" },
                },
                grid: { color: "#edf2f7", drawBorder: false },
              },
              yCurrency: {
                type: "linear",
                position: "left",
                ticks: {
                  callback: (value) => `$${value}`,
                  font: { size: 12 },
                  color: "#718096",
                },
              },
              yPercentage: {
                type: "linear",
                position: "right",
                ticks: {
                  callback: (value) => `${value}%`,
                  font: { size: 12 },
                  color: "#718096",
                },
                grid: { drawOnChartArea: false },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return (
    <div>
      <h2 className="kpi-section-title" style={{ marginTop: 25 }}>
        Key Performance Snapshot
      </h2>
      <div className="kpi-section-inner">
        <div className="kpi-wrapper">
          <hr className="kpi-divider" />
          <div className="kpi-container">
            {kpis.length > 0 ? (
              kpis
                .filter(
                  (kpi) =>
                    kpi.title === "RevPAR" ||
                    kpi.title === "ADR" ||
                    kpi.title === "Occupancy Rate"
                )
                .map((kpi, index) => (
                  <div key={index} className="kpi-card text-center">
                    <div className="kpi-title-container">
                      {/* RevPAR */}
                      {kpi.title === "RevPAR"}

                      {/* ADR */}
                      {kpi.title === "ADR"}

                      {/* Occupancy Rate */}
                      {kpi.title === "Occupancy Rate"}
                      <h3 className="kpi-title">{kpi.title}</h3>
                    </div>
                    <div>
                      <p className="kpi-value">{kpi.value}</p>
                      <p
                        className={`kpi-change ${
                          kpi.change.includes("-")
                            ? "kpi-change-negative"
                            : "kpi-change-positive"
                        }`}
                      >
                        {kpi.change}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </div>

          {/* Chart Card */}
          <div className="chart-card">
            <div className="chart-containerkpi">
              <canvas id="keyMetricsTrendChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiSection;
