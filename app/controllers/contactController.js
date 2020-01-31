const express = require('express');
const app = express();
const appConfig = require('./../../config/config');
const Logger = require('./../libs/loggerLibs');
const Response = require('./../libs/responseLibs');
const Check = require('./../libs/checkLibs');
const mongoose = require('mongoose');
const ContactModel = mongoose.model('Contact');

//function to get all the contact details
let getallcontacts = (req,res) => {
    ContactModel.find()
    .exec((err,result) => {
        if(err)
        {
            Logger.error(err.message,"Contact Controller : get all contacts()",10);
            let apiresponse = Response.generate(true,error.message,500,null);
            res.send(apiresponse);
        }
        else if(Check.isEmpty(result))
        {
            Logger.Info("Contact not Found","Contact Controller : get all contacts()",10);
            let apiresponse = Response.generate(true,"Contact Not Found",404,null);
            res.send(apiresponse);
        }
        else
        {
            let all_data = result; //.reverse();
            let apiresponse = Response.generate(false,"Contact Listed",200,all_data);
            res.send(apiresponse);
        }
    });
}//end of function to get all contact details

//function to get particular contacts
let particular_contact_information = (req,res) => {
    ContactModel.findOne({contactId : req.body.contactId})
    .exec((err,result) => {
        if(err)
        {
            Logger.error(err.message,"Contact Controller : Contact Info()",10);
            let apiresponse = Response.generate(true,err.message,500,null);
            res.send(apiresponse);
        }
        else if(Check.isEmpty(result))
        {
            Logger.Info("Contact Not Found","Contact Controller : Contact Info()",10);
            let apiresponse = Response.generate(true,"Contact Not Found",404,null);
            res.send(apiresponse);
        }
        else
        {
            let apiresponse = Response.generate(false,"All information of particular user is listed",200,result);
            res.send(apiresponse);
        }
    });
}//end of function to get particular contact information

module.exports = {
    getallcontacts : getallcontacts,
    particular_contact_information : particular_contact_information
}