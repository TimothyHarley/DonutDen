import axios from 'axios';
import apiKeys from '../apiKeys';

const apiBaseUrl = apiKeys.DonutDenApi.apiBaseUrl;

const getMenu = () => new Promise((resolve, reject) => {
  axios
    .get(`${apiBaseUrl}/menuItems`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
})