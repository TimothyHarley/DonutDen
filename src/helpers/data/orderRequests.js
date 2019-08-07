import axios from 'axios';
import apiKeys from '../apiKeys';

const apiBaseUrl = apiKeys.DonutDenApi.apiBaseUrl;

const createOrder = newOrder => axios.post(`${apiBaseUrl}orders`, newOrder)

const getOrdersByDate = (date) => new Promise((resolve, reject) => {
  axios.get(`${apiBaseUrl}orders/order-date/${date}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
})
export default {
  createOrder,
  getOrdersByDate,
}