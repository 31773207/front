import { useState, useCallback } from 'react';
import api from '../services/api';

export const useDashboard = () => {
  const [missionsReport, setMissionsReport] = useState([]);
  const [driverActivity, setDriverActivity] = useState([]);
  const [fuelReport, setFuelReport] = useState(null);
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDriverActivity = useCallback(async () => {
    try {
      const res = await api.get('/dashboard/driver-activity');
      setDriverActivity(Array.isArray(res.data) ? res.data : []);
    } catch {
      setDriverActivity([]);
    }
  }, []);

  const fetchMissionsReport = useCallback(async (params) => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/stats', { params });
      setMissionsReport(res.data ? [res.data] : []);
    } catch {
      setMissionsReport([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFuelReport = useCallback(async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setFuelReport(res.data);
    } catch {
      setFuelReport(null);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch {
      setStats(null);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setAlerts(res.data);
    } catch {
      setAlerts(null);
    }
  }, []);

  return {
    missionsReport,
    driverActivity,
    fuelReport,
    stats,
    alerts,
    loading,
    fetchMissionsReport,
    fetchDriverActivity,
    fetchFuelReport,
    fetchStats,
    fetchAlerts,
  };
};

export default useDashboard;