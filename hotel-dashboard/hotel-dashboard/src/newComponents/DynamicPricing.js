import React, { useEffect, useState } from "react";
import "../index.css";
import { Download } from "lucide-react";
import { fetchCompetitiveRateSnapshot } from "../services/api";

const DynamicPricing = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCompetitiveRateSnapshot()
      .then((response) => setData(response.competitiveRateSnapshot))
      .catch((error) =>
        console.error("Error fetching competitive rate snapshot:", error)
      );
  }, []);

  const getMarketDemandClass = (percentage) => {
    const value = parseInt(percentage);
    if (value >= 80) return "market-demand-high"; // green
    if (value >= 60) return "market-demand-medium"; // yellow/orange
    return "market-demand-low"; // red
  };

  const downloadCSV = () => {
    if (!data?.futureRateComparison) return;

    const headers = [
      "DAY",
      "DATE",
      "YOUR OTB%",
      "YOUR RATE",
      "COMPSET MEDIAN",
      "MARKET DEMAND",
    ];
    const rows = data.futureRateComparison.labels.map((day, idx) => [
      day,
      data.futureRateComparison.dates[idx],
      data.futureRateComparison.yourOTB[idx],
      data.futureRateComparison.yourHotelRates[idx],
      data.futureRateComparison.compSetMedianRates[idx],
      data.futureRateComparison.marketDemand[idx],
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dynamic_pricing_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="competitive-rate-wrapper">
      {/* Section Title */}
      <h2 className="kpi-section-title">Dynamic Pricing & Forward Outlook</h2>
      <hr className="kpi-divider" />

      <div className="competitive-rate-content">
        {data?.futureRateComparison ? (
          <>
            <table className="rate-comparison-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Your OTB%</th>
                  <th>Your Rate</th>
                  <th>CompSet Median</th>
                  <th>Market Demand</th>
                </tr>
              </thead>
              <tbody>
                {data.futureRateComparison.labels.map((day, idx) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{data.futureRateComparison.dates[idx]}</td>
                    <td>{data.futureRateComparison.yourOTB[idx]}</td>
                    <td>{data.futureRateComparison.yourHotelRates[idx]}</td>
                    <td>{data.futureRateComparison.compSetMedianRates[idx]}</td>
                    <td>
                      <span
                        className={`market-demand-badge ${getMarketDemandClass(
                          data.futureRateComparison.marketDemand[idx]
                        )}`}
                      >
                        {data.futureRateComparison.marketDemand[idx]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Download Button */}
            <div style={{ padding: "16px" }}>
              <button
                onClick={downloadCSV}
                className="download-btn margin-top-10"
              >
                <svg
                  style={{ width: "16px", height: "16px", marginRight: "8px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 002 2z"
                  />
                </svg>
                Download Data (CSV)
              </button>
            </div>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default DynamicPricing;
