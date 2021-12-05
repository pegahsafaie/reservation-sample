
/*
Think about how we will reservations
think about conditions(if) as well as groupping
think about the size of each collection- it should not be too big
use nested structure when necessary but dont forget too many nested structures will decrease the readability of data
--------------------------
Datas we are intrested in:
#[user-information]: [user name, lastname, phone, email]
#[user-address]: [address, country, postalcode, city] 
#[reservation info]: [check-in date, check-out date, number of guests]
--------------------------
Queries we might in intrested in:
# all reservations!
# reservations per user
# users from specifc city
# users from specifc country
---------------------------
we can put all the information in one schema[embedded or denormalization]. it would be like:
user: {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  billings: [{ // subdocument- one to many relation
    country: '',
    address: ''
  }],
  reservations: [{ // one to many relation- subdocument
    city: '',
    postalcode: '',
    number-of-guets: #,
    check-in date: '',
    check-out-date: ''
   }]
}

we also can put reservation in a separated collection to avoid having big dicuments/collections
user: {,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

billing: [
    country: '',
    address: ''
}

reservations: {
  city: '',
  postalcode: '',
  number-of-guets: #,
  check-in date: '',
  check-out-date: ''
  user-phone-number: ''
  }

because I dont know what makes a user unique, I prefer to go for first design
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillingSchema = new Schema({ 
  country: { type: String, required: true}, 
  address: { type: String, required: true} 
});
const ReservationSchema = new Schema({ 
  city: {type: String, required: true}, 
  postalCode: {type: String, required: true}, 
  numberOfGuests: {type: Number, required: true}, 
  checkInDate: {type: Date, required: true}, 
  checkOutDate: {type: Date, required: true} 
});
const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    billings: [BillingSchema],
    reservations: [ReservationSchema]
});

module.exports = mongoose.model('User', UserSchema);