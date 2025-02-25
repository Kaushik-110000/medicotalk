import { retry } from "@reduxjs/toolkit/query";
import server from "../conf/conf.js";
import axios from "axios";
axios.defaults.withCredentials = true;
export class DoctorService {
  async getDiagnosisStatement(data) {
    try {
      const response = await axios.post(`${server.serverUrl}/dignose`, data);
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async tumorCheck(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/reports/tumourtest`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios set the correct content-type
          },
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async pneumoniaCheck(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/reports/pneumoniatest`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios set the correct content-type
          },
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async covidCheck(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/reports/covidtest`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios set the correct content-type
          },
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async bloodReportCheck(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/reports/bloodreport`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios set the correct content-type
          },
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async doctorPrescriptionCheck(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/reports/prescription`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios set the correct content-type
          },
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }
}
const doctorService = new DoctorService();
export default doctorService;
