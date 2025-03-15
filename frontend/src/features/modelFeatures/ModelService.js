import axios from "axios";

const API_URL = "/api/c02/predict";

const postDatatoModel = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const ModelService = { postDatatoModel };

export default ModelService;
