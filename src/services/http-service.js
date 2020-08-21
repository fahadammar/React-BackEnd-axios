import axios from "axios";
import Raven from "raven-js";
import { toast } from "react-toastify";

// axios interceptor
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    Raven.captureException(error);
    toast("An unexpected Error Occurred");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.get,
  delete: axios.delete,
};
