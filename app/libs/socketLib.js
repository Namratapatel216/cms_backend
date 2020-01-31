const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLibs');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const check = require('./checkLibs');
const response = require('./responseLibs');
const ContactModel = mongoose.model('Contact');
const fs = require('fs');

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
}

let setServer = (server) => {
    let io = socketio.listen(server);
    let myio = io.of('/');
    let allOnlineUsers = [];
    let data = "";

    myio.on('connection', (socket) => {
       
        socket.on('import-contacts', (data) => {
            
            var base64result = data['import_contacts_path'].substr(data['import_contacts_path'].indexOf(',') + 1);
            var contact_path = base64_decode(base64result, data['import_contacts_name']);

            fs.readFile(data['import_contacts_name'] , (err, data) => {
                if (err)
                { 
                    throw err;
                }
                else
                {
                    let student = JSON.parse(data);
                    let generated_unique_id = shortid.generate();
                    student['contactId'] = generated_unique_id;
                    
                    pass_data(student,generated_unique_id);
                    setTimeout(function () {
                        eventEmitter.emit('save-contacts', student);
                    }, 2000);
                }
            });

            let pass_data = (passed_imported_data,unique_contact_id) => {
                let apiResponse = response.generate_with_unique_id(false,"data imported","data_imported",unique_contact_id,passed_imported_data);
                myio.emit('import-contacts',apiResponse);
            }

        });

        socket.on('update_email_address', (Details) => {
            setTimeout(function () {
                eventEmitter.emit('update-email', Details);
            });
            let apiResponse = response.generate_with_unique_id(false,"email address updated","email_updated",Details.contactId,Details);
            myio.emit('import-contacts',apiResponse);
        });

        socket.on('update_fname', (Details) => {
            setTimeout(function () {
                eventEmitter.emit('update-firstname', Details);
            });
            let apiResponse = response.generate_with_unique_id(false,"first name updated","fname_updated",Details.contactId,Details);
            myio.emit('import-contacts',apiResponse);
        });

        socket.on('update_lname', (Details) => {
            setTimeout(function () {
                eventEmitter.emit('update-lastname', Details);
            });
            let apiResponse = response.generate_with_unique_id(false,"last name updated","lname_updated",Details.contactId,Details);
            myio.emit('import-contacts',apiResponse);
        });

        socket.on('update_home_phone', (Details) => {
            setTimeout(function () {
                eventEmitter.emit('update-home-phone', Details);
            });
            let apiResponse = response.generate_with_unique_id(false,"Home Phone updated","home_phone_updated",Details.contactId,Details);
            myio.emit('import-contacts',apiResponse);
        });
        
        socket.on('update_mobile_phone', (Details) => {
            setTimeout(function () {
                eventEmitter.emit('update-mobile-phone', Details);
            });
            let apiResponse = response.generate_with_unique_id(false,"Mobile Phome updated","mobile_phone_updated",Details.contactId,Details);
            myio.emit('import-contacts',apiResponse);
        });

    });
}

eventEmitter.on('update-email', (emailDetails) => {
    ContactModel.updateOne({ contactId: emailDetails.contactId }, { email_address: emailDetails.email_address })
    .exec((err, result) => {
        if (err) {
            console.log(err);
        }
        else if (check.isEmpty(result)) {
            console.log("no issue found");
        }
        else {
            console.log("email address updated");
        }
    });
});

eventEmitter.on('update-firstname', (fnameDetails) => {
    ContactModel.updateOne({ contactId: fnameDetails.contactId }, { first_name: fnameDetails.first_name })
    .exec((err, result) => {
        if (err) {
            console.log(err);
        }
        else if (check.isEmpty(result)) {
            console.log("no issue found");
        }
        else {
            console.log("first name updated");
        }
    });
});

eventEmitter.on('update-lastname', (lnameDetails) => {
    ContactModel.updateOne({ contactId: lnameDetails.contactId }, { last_name: lnameDetails.last_name })
    .exec((err, result) => {
        if (err) {
            console.log(err);
        }
        else if (check.isEmpty(result)) {
            console.log("no issue found");
        }
        else {
            console.log("last name updated");
        }
    });
});

eventEmitter.on('update-home-phone', (h_phoneDetails) => {
    ContactModel.updateOne({ contactId: h_phoneDetails.contactId }, { home_phone: h_phoneDetails.home_phone })
    .exec((err, result) => {
        if (err) {
            console.log(err);
        }
        else if (check.isEmpty(result)) {
            console.log("no issue found");
        }
        else {
            console.log("home phone updated");
        }
    });
});

eventEmitter.on('update-mobile-phone', (m_phoneDetails) => {
    ContactModel.updateOne({ contactId: m_phoneDetails.contactId }, { mobile_phone: m_phoneDetails.mobile_phone })
    .exec((err, result) => {
        if (err) {
            console.log(err);
        }
        else if (check.isEmpty(result)) {
            console.log("no issue found");
        }
        else {
            console.log("mobile phone updated");
        }
    });
});

eventEmitter.on('save-contacts', (all_contacts) => {
    var cntr = 0;
    var unique_id = all_contacts['contactId'];
    for(let single_contact of all_contacts)
    {
        cntr++;
        let newContact = new ContactModel({
            contactId: unique_id+cntr,
            email_address : single_contact['E-mail Address'],
            related_name : single_contact['Related name'],
            home_address_2 : single_contact['Home Address 2'],
            anniversary : single_contact['Anniversary'],
            first_name : single_contact['First Name'],
            business_address_2 : single_contact['Business Address 2'],
            department : single_contact['Department'],
            display_name : single_contact['Display Name'],
            home_state : single_contact['Home State'],
            business_country : single_contact['Business Country'],
            home_street : single_contact['Home Street'],
            birthday : single_contact['Birthday'],
            home_country : single_contact['Home Country'],
            pager : single_contact['Pager'],
            categories : single_contact['Categories'],
            home_city : single_contact['Home City'],
            email_address3 : single_contact['E-mail 3 Address'],
            home_fax : single_contact['Home Fax'],
            gender : single_contact['Gender'],
            notes : single_contact['Notes'],
            country_code : single_contact['Country Code'],
            job_title : single_contact['Job Title'],
            business_address : single_contact['Business Address'],
            webpage_2 : single_contact['Web Page 2'],
            mobile_phone : single_contact['Mobile Phone'],
            organization : single_contact['Organization'],
            home_phone : single_contact['Home Phone'],
            email_address2 : single_contact['E-mail 2 Address'],
            last_name : single_contact['Last Name'],
            nick_name : single_contact['Nickname'],
            business_fax : single_contact['Business Fax'],
            home_postal_code : single_contact['Home Postal Code'],
            business_phone : single_contact['Business Phone'],
            business_postal_code : single_contact['Business Postal Code'],
            web_page : single_contact['Web Page'],
            business_city : single_contact['Business City'],
            business_state : single_contact['Business State'],
        });
        newContact.save((err, result) => {
            if (err) {
                //console.log(`error occured ${err}`);
            }
            else if (check.isEmpty(result)) {
                //console.log('contact is not saved');
            }
            else {
                //console.log('contact saved');
            }
        });
    }

});

module.exports = {
    setServer: setServer
}