const Reservation = require('../models/reservation');

function ReservationController() {
  this.getAll = async (req, res) => {
    res.set('Content-Type', 'application/json');
    let response;
    try {
      const items = await Reservation.find()
      const total = await Reservation.count();
      response = {
        error: false,
        statusCode: 200,
        data: items,
        total
      };
    } catch (errors) {
      console.log(errors);
      response = {
        error: true,
        statusCode: 500,
        errors
      };
    }
    return res.status(200).send(response);
  }

  this.insert = (req, res) => {
    res.set('Content-Type', 'application/json');
    const genErrRes = (error) => ({
      error: true,
      statusCode: 500,
      message: error.errmsg || "Not able to create item",
      errors: error.errors
    });
    try {
      const reservation = new Reservation(req.body);
      reservation.save(function(error, reservation) {
        if (error) 
            res.status(500).send(genErrRes(error));
        else
          res.status(201).send(JSON.stringify({ trackingId: reservation.id, message: 'Booking created!' }));
      });
    } catch (error) {
      res.status(500).send(genErrRes(error));
    }
  }
}

module.exports = new ReservationController();