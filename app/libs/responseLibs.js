const express = require('express');
const app = express();
let generate = (error, message, status, data) => {
    let response = {
        error : error,
        message : message,
        status : status,
        data : data
    }
    return response;
}

let generate_with_unique_id = (error, message, status,unique_id, data) => {
    let response = {
        error : error,
        message : message,
        status : status,
        unique_id:unique_id,
        data : data
    }
    return response;
}

module.exports = {
    generate : generate,
    generate_with_unique_id : generate_with_unique_id
}