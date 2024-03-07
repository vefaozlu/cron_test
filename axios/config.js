import axios from "axios";
import axiosRetry from "axios-retry";
import qs from "qs";

export const HttpMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export default class NetworkService {
  constructor(baseURL) {
    this.baseURL = baseURL;

    this.instance = axios.create({
      baseURL,
      timeout: 2000,
      maxBodyLength: Infinity,
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    axiosRetry(this.instance, {
      retries: 10,
      shouldResetTimeout: true,
      retryDelay: (count, error) => {
        if (error) {
          console.log(clc.redBright(error));
          return count * 2000;
        }
      },
      onRetry: (retryCount, error, requestConfig) => {
        return console.log("Retrying...", error.message);
      },
    });
  }

  fetchData = async ({
    endpoint,
    method = HttpMethod.GET,
    data = null,
    headers = null,
  }) => {
    const dt = qs.stringify(data);

    try {
      const response = await this.instance.request({
        headers: headers,
        url: endpoint,
        method,
        data: dt,
      });

      console.log(clc.green("Data received:", response.data));

      return response;
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };
}

