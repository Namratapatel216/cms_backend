const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contact = new Schema({
    contactId : {
        type:String,
        default:'',
        index:true,
        unique:true
    },
    email_address : {
        type:String,
        default:''
    },
    related_name : {
        type:String,
        default:''
    },
    home_address_2 : {
        type:String,
        default:''
    },
    anniversary : {
        type:String,
        default:''
    },
    first_name : {
        type:String,
        default:''
    },
    business_address_2 : {
        type:String,
        default:''
    },
    department : {
        type:String,
        default:''
    },
    display_name : {
        type:String,
        default:''
    },
    home_state : {
        type:String,
        default:''
    },
    business_country : {
        type:String,
        default:''
    },
    home_street : {
        type:String,
        default:''
    },
    birthday : {
        type:String,
        default:''
    },
    home_country : {
        type:String,
        default:''
    },
    pager : {
        type:String,
        default:''
    },
    categories : {
        type:String,
        default:''
    },
    home_city : {
        type:String,
        default:''
    },
    email_address3 : {
        type:String,
        default:''
    },
    home_fax : {
        type:String,
        default:''
    },
    gender : {
        type:String,
        default:''
    },
    notes : {
        type:String,
        default:''
    },
    country_code : {
        type:String,
        default:''
    },
    job_title : {
        type:String,
        default:''
    },
    business_address : {
        type:String,
        default:''
    },
    webpage_2 : {
        type:String,
        default:''
    },
    mobile_phone : {
        type:String,
        default:''
    },
    organization : {
        type:String,
        default:''
    },
    home_phone : {
        type:String,
        default:''
    },
    email_address2 : {
        type:String,
        default:''
    },
    last_name : {
        type:String,
        default:''
    },
    nick_name : {
        type:String,
        default:''
    },
    business_fax : {
        type:String,
        default:''
    },
    home_postal_code : {
        type:String,
        default:''
    },
    business_phone : {
        type:String,
        default:''
    },
    business_postal_code : {
        type:String,
        default:''
    },
    web_page : {
        type:String,
        default:''
    },
    business_city : {
        type:String,
        default:''
    },
    business_state : {
        type:String,
        default:''
    },
    image : {
        type:String,
        default:''
    }
});

module.exports = mongoose.model('Contact',Contact);