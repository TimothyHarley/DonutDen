import axios from 'axios';
import apiKeys from '../apiKeys';

const apiBaseUrl = apiKeys.DonutDenApi.apiBaseUrl;

const getMenu = () => new Promise((resolve, reject) => {
  axios.get(`${apiBaseUrl}menuItems`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
})

const getMenuItem = (id) => axios.get(`${apiBaseUrl}menuItems/${id}`);

export default {
  getMenu,
  getMenuItem,
}