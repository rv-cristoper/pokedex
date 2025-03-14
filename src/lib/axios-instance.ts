import axios from "axios";
import { config as environmentVariables } from "../config";

axios.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";
  config.baseURL = environmentVariables.VITE_API_URL;
  return config;
});
export default axios;
