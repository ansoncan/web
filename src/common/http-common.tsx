// src/common/http-common.ts
import axios from 'axios';

const baseURL = 'http://pcpdfilm.starsknights.com:18888/api/v2'; // Replace with your API base URL

const userAPI = {
  getFilms: (page: number, limit: number) => {
    return axios.get(`${baseURL}/films?page=${page}&limit=${limit}`);
  },
};

export { userAPI };