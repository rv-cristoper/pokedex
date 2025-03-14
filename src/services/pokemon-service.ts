import axios from "../lib/axios-instance";

export default class PokemonService {
  static get = async () => {
    const response = await axios.request({
      method: "GET",
      url: "?offset=1&limit=20",
    });
    return response.data;
  };

  static getDetail = async (id: number) => {
    const response = await axios.request({
      method: "GET",
      url: `/${id}`,
    });
    return response.data;
  };
}
