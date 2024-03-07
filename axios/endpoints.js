import NetworkService from "./config.js";

const service = new NetworkService("https://kvfozlu.xyz");

export default class Endpoints {
  static fetchToken = async ({ data }) => {
    try {
      const response = await service.fetchData({
        endpoint: "/test",
        method: "get",
        //	data: data,
      });

      return response;
    } catch (e) {
      throw e;
    }
  };
}

