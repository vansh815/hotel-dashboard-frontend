import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

export const fetchSummaryData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/summary`);
        return response.data;
    } catch (error) {
        console.error("Error fetching summary data:", error);
        return null;
    }
};

export const fetchKpiData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/kpi`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchRevenueProfitability = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/revenueProfitability`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchOperationalEfficiency = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/OperationalEfficiency`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchGuestExperienceReputation = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/guestExperienceReputation`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchDistributionMarketingPerformance = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/distributionMarketingPerformance`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchMarketBenchmarkingFutureOutlook = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/marketBenchmarkingFutureOutlook`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};

export const fetchCompetitiveRateSnapshot = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/competitiveRateSnapshot`);
        return response.data;
    } catch (error) {
        console.error("Error fetching KPI data:", error);
        return null;
    }
};