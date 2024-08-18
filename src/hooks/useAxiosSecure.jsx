import axios from "axios";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const LogInContext = useContext(AuthContext)
  // const navigate = useNavigate();
  // axiosSecure.interceptors.request.use(
  //   function (config) {
  //     return config;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
  axiosSecure.interceptors.response.use(
    function (response) {
      // console.log(response);
      return response;
    },
    async function (error) {
      const status = error?.response?.status;
      console.log(status)
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
