// tests/post.test.js

const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());


describe('POST /api/reservation', () => {
  test('It should insert a new reservation',  done => {
    agent
      .post('/api/reservation')
      .attach(
        { contentType: 'application/json' },
      )
      .send({
        firstName: 'Pegah',
        lastName: 'Safaie',
        phone: '00491744444',
        email: 'pegahsafaie@gmail.com',
        billings: [{
          country: 'Germany',
          address: 'Passau Heining'
        }],
        reservations: [{
          numberOfGuests: 2,
          checkInDate: new Date(),
          checkOutDate: new Date(),
          city: 'München',
          postalCode: '1234'
        }]
      })
      .expect(201)
      .then(res => {
        expect(res.body.trackingId).toBeTruthy();
        expect(res.body.error).toBe(false);
        done();
      })
  });
});

describe('GET /public-api/reservation', () => {
  test('It should fetch all reservation',  done => {
    agent
      .get('/public-api/reservation')
      .expect(200)
      .then(res => {
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toBe(false);
        done();
      });
  });
});

/*describe('Validation', () => {
  test('It should response with 404 when uri is not available', done => {

  })
  test('It should validate the reservation before inseritng them', done => {

  })
})*/