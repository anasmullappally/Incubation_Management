var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');

module.exports={
    doLogin: (details) => {
        return new Promise(async (resolve) => {
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ email: details.email })
            if (admin) {
                bcrypt.compare(details.password, admin.password).then((status) => {
                    if (status) {
                        response.loggedIn = true
                        response.admin = admin
                       
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
    }


}