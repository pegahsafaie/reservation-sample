import baseRestAPI from './baseRestAPI';
const reservationConnection = new baseRestAPI(process.env.VUE_APP_RESERVATION_API);

const reservationAPI = {
  insertReservation,
}

function insertReservation (payload) {
  return reservationConnection.post('/api/reservation', payload);
}

export default reservationAPI;