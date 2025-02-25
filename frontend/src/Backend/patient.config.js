import { retry } from "@reduxjs/toolkit/query";
import server from "../conf/conf.js";
import axios from "axios";
axios.defaults.withCredentials = true;
export class Authservice {
  async RegisterPatient(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/patient/register`,
        data
      );
      if (response) {
        return response;
      } else {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async LoginPatient(data) {
    try {
      const response = await axios.post(
        `${server.serverUrl}/patient/login`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async LogoutPatient() {
    try {
      const response = await axios.post(`${server.serverUrl}/patient/logout`);
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentPatient() {
    try {
      const response = await axios.get(`${server.serverUrl}/patient`);
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async ServerHealthCheck(){
    try {
      const response = await axios.get(`${server.serverUrl}/healthcheck`)
      if (response) return response;
      else throw error;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new Authservice();
export default authService;
