var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { response } = require('express');

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
    changeFormStatus: ({ id, status }) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(collection.FORM_COLLECTION).updateOne(
                { _id: ObjectId(id) },
                { $set: { 'status': status } }
            ).then((response) => {
                console.log((response));
                resolve()
            })
        })
    },
    getAllSlots: () => {
        return new Promise(async (resolve) => {
            let slots = await db.get().collection(collection.SLOT_COLLECTION).find().toArray()
            resolve(slots)
        })
    },

    slotAppllication: () => {
        return new Promise(async (resolve, reject) => {
            let results = await db.get().collection(collection.FORM_COLLECTION).find({ status: 'approved' }).toArray()
            resolve(results)
        })
    },
    updateSlots: ({ applicantId, slotId, slotSection }) => {
        console.log(applicantId);
        return new Promise(async (resolve) => {
            await db.get().collection(collection.FORM_COLLECTION).updateOne(
                { _id: ObjectId(applicantId) }, { $set: { isBooked: true, status: 'selected' } }
            ).then((response) => {
                console.log(response);
            })
            await db.get().collection(collection.SLOT_COLLECTION).updateOne(
                { slot: slotId, section: slotSection },
                {
                    $set:
                    {
                        userID: applicantId,
                        isBooked: true
                    }
                }
            ).then(() => {

                resolve();
            })
        })
    }



}