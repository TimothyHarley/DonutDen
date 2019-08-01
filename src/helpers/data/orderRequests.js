import axios from 'axios';
import apiKeys from '../apiKeys';

const apiBaseUrl = apiKeys.DonutDenApi.apiBaseUrl;

const createOrder = newOrder => axios.post(`${apiBaseUrl}orders`, newOrder)

export default {
  createOrder,
}