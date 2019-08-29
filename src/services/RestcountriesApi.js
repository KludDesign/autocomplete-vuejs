import axios from 'axios'

// The restcountries API Endpoint
const RESTCOUNTRIES_API_URL = 'https://restcountries.eu/rest/v2';

export default {
  // Add a get call from the API to get all countries
  getAllContries () {
    return axios.get(`${RESTCOUNTRIES_API_URL}/all`)
  }
}
