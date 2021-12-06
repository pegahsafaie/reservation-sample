import baseRestAPI from './baseRestAPI';
const countryConnection = new baseRestAPI(process.env.VUE_APP_COUNTRY_BASE_URL);

const countryAPI = {
  getCountries,
}

function getCountries () {
  return countryConnection.get('/all');
}

export default countryAPI;