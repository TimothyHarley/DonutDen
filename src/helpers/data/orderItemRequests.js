import axios from 'axios';
import apiKeys from '../apiKeys';

const apiBaseUrl = apiKeys.DonutDenApi.apiBaseUrl;

const createOrderItem = newOrderItem => axios.post(`${apiBaseUrl}orderItems`, newOrderItem);

export default {
  createOrderItem,
};