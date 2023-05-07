import axios from 'axios';

const TOKEN = "ch8n1t1r01qtgm5donbgch8n1t1r01qtgm5donc0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})