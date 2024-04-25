import axios from "axios";

export default axios.create({
  baseURL: "https://food-delivery-production.up.railway.app/api"
});