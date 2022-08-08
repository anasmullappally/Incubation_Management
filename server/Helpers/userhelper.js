var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');


module.exports = {
    dosignUp: (details) => {
       
        return new Promise(async (resolve) => {
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: details.email })
            if (user) {
                response.alreadyExist = true
                resolve(response)
            } else {
                let password = await bcrypt.hash(details.password, 10)
                db.get().collection(collection.USER_COLLECTION).insertOne({
                    userName: details.userName,
                    email: details.email,
                    password: password
                }).then((response) => {
                    resolve(response)
                })
            }
        })
    },
    doLogin: (details) => {
        return new Promise(async (resolve) => {
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: details.email })
            if (user) {
                bcrypt.compare(details.password, user.password).then((status) => {
                    if (status) {
                        response.loggedIn = true
                        response.user = user
                        resolve(response)
                    } else {
                        response.inCorrectPassword = true
                        resolve(response)
                    }
                })
            } else {
                response.inCorrectEmail = true
                resolve(response)
            }

        })
    },
    formSubmission: (formDetails, userId) => {
        formDetails.userId = userId
        formDetails.status = 'new'
        return new Promise((resolve) => {
            let response = {}
            db.get().collection(collection.FORM_COLLECTION).insertOne(formDetails).then((details) => {
                response.id = details.insertedId
                resolve(response)
            })
        })
    }
}