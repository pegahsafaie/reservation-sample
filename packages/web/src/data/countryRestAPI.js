import baseRestAPI from './baseRestAPI';

const countryAPI = {
  getCountries,
}

function getCountries () {
  const countryConnection = new baseRestAPI(process.env.VUE_APP_COUNTRY_BASE_URL);
  return countryConnection.get('/all');
}

export default countryAPI;