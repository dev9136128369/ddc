const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String }, 
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);