import axios from 'axios'

const RESTCOUNTRIES_API_URL = 'https://restcountries.eu/rest/v2';

export default {
  getAllContries () {
    return axios.get(`${RESTCOUNTRIES_API_URL}/all`)
  }
}
