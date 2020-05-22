import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reactburgerbuilder-f6368.firebaseio.com/'
})

export default instance;