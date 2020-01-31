const express = require('express');

const router = express.Router();

const app = express();

const appConfig = require('./../../config/config');

const contactController = require('./../controllers/contactController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/contacts`;

    app.get(`${baseUrl}/view_all_contacts`,contactController.getallcontacts),
    app.post(`${baseUrl}/Contact_info`,contactController.particular_contact_information)
}