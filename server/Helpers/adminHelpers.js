var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');
const { response } = require('express');
const { ObjectId } = require('mongodb');

module.exports = {
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
    },
    applicationList: () => {
        return new Promise(async (resolve, reject) => {
            let results = await db.get().collection(collection.FORM_COLLECTION).find().toArray()
            resolve(results)
        })
    },
    applicationStatusToPending : (appId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.FORM_COLLECTION).updateOne(
                {_id:ObjectId(appId)},
                {$set:{'status':'pending'}}
            ).then((response)=>{
                console.log((response));
                resolve()
            })
        })
    },
    applicationStatusToCancel : (appId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.FORM_COLLECTION).updateOne(
                {_id:ObjectId(appId)},
                {$set:{'status':'cancel'}}
            ).then((response)=>{
                console.log((response));
                resolve()
            })
        })
    },
    applicationStatusToApprove : (appId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.FORM_COLLECTION).updateOne(
                {_id:ObjectId(appId)},
                {$set:{'status':'approved'}}
            ).then((response)=>{
                console.log((response));
                resolve()
            })
        })
    }



}