<template>
  <v-app>    
    <v-main>
      <v-form  v-model="isFormValid">
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="9">
            <h1>Book your suite at limehome</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
            <v-row >
              <v-col cols="6">
                <range-date-picker required outlined label="Check-in/out dates" v-model="dates"></range-date-picker>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="noOfGuests" outlined required :rules="validationRules.numeric">
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Number Of Guests
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            
            <v-row >
              <v-col cols="6">
                <v-text-field v-model="firstName" outlined required>
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>First Name
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="lastName" outlined required >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Last Name
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <v-row >
              <v-col cols="6">
                <v-text-field v-model="billingAddress" outlined required>
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Billing Address
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete  v-model="country" outlined required :items="countries">
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Billing Country
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row >
              <v-col cols="6">
                <v-text-field v-model="postalCode" outlined required >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Postal Code
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="city" outlined required>
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>City
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <v-row >
              <v-col cols="6">
                <v-text-field label="Email" placeholder="your@email.com" v-model="email" outlined required :rules="validationRules.email">
                  <template #label>
                    <span class="red--text"><strong>* </strong></span>Email
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                
            <v-text-field v-model="phoneNumber" outlined required :rules="validationRules.numeric">
                <template #label>
                    <span class="red--text"><strong>* </strong></span>Your Phone Number
                </template>
            </v-text-field>
              </v-col>
            </v-row>

          </v-col>
          <v-col cols="3"></v-col>
        </v-row>
        
        <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="9">
            <v-btn :disabled="!isFormValid" @click.prevent="book">BOOK NOW</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-main>
    <v-dialog v-model="successDialog" width="500">
      <v-card>
        <v-card-title>
          THANKS FOR YOUR RESERVATION!
        </v-card-title>

        <v-card-text>
          Here is your tracking number: {{trackingNumber}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="successDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errDialog" width="500">
      <v-card>
        <v-card-title>
          An Error Happend!
        </v-card-title>

        <v-card-text>
          We could not save your reservation. please contact support.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="errDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

import countryRestAPI from './data/countryRestAPI';
import reservationRestAPI from './data/reservationRestAPI';
import RangeDatePicker from './components/RangeDatePicker.vue';
export default {
  name: 'App',

  components: {
    'range-date-picker': RangeDatePicker
  },
  mounted() {
    this.fetchCountries();
  },
  data: () => ({
    isFormValid: false,
    countries: [],
    country: null,
    dates: null,
    firstName: null,
    lastName:null,
    noOfGuests:null,
    billingAddress:null,
    city:null,
    postalCode:null,
    email:null,
    phoneNumber:null,
    errDialog: false,
    successDialog: false,
    trackingNumber: null,
    validationRules: {
      email: [ v => /.+@.+/.test(v) || 'Invalid Email address' ],
      numeric: [
        v => { 
          return !v || !isNaN(v) || 'A number is required!';
        }
      ],
    }
  }),
  methods: {
    fetchCountries() {
      countryRestAPI.getCountries()
      .then((items) => {
        this.countries = items.map(item => item.name.common);
      })
    },
    async book() {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phoneNumber,
        email: this.email,
        billings: [{
          country: this.country,
          address: this.billingAddress
        }],
        reservations: [{
          numberOfGuests: this.noOfGuests,
          checkInDate: this.dates[0],
          checkOutDate: this.dates[1],
          city: this.city,
          postalCode: this.postalCode
        }]
      }
      const response = await reservationRestAPI.insertReservation(payload);
      if(!response.error) {  
        this.successDialog = true;
        this.trackingNumber = response.trackingId;
      } else {
        this.errDialog = true,
        this.trackingNumber = null;
      }
    }
  }
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>