const express = require('express')
const http = require('http')


const response = http.ServerResponse;

class Helper {
    constructor(response) {
        this.response = response
    }

    handleError(callback) {
        try {
            callback();
        } catch(error) {
            return this.response.status(400).json({ name: error.name, message: error.message})
        }
    }

    async idVerification(Model, id, bool = true) {
        if (typeof id == 'undefined') {
            return this.response.status(403).json({ name: 'Verification Error', message: `${Model.collection.collectionName} id is required for this action.`});
        }
        const model = await Model.findById(id);
        if (model == null) {
            return this.response.status(403).json({ name: 'Validation Error', message: `${Model.collection.collectionName} id is incorrect.`});
        }
        return bool ? true : model;
      }
}

module.exports = Helper