var express = require('express');
const path = require('path');
var router = express.Router();
var userHelper = require('../Helpers/userhelper')
const multer = require('multer')
let fs = require('fs');
const jwt = require('jsonwebtoken')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, 'companyLogo.jpg')
  }
})
let upload = multer({ storage: storage }).single('logo')



router.post('/signup', (req, res) => {
  let details = req.body
  try {
    userHelper.dosignUp(details).then((response) => {
      if (response.alreadyExist) {
        res.status(400).json({ err: 'User Already Exist' })
      } else {
        res.status(200).json({ success: 'success' })
      }
    })
  } catch (error) {
    console.log('something went wrong', error);
  }
})
router.post('/login', (req, res) => {
  let details = req.body
  try {
    userHelper.doLogin(details).then((response) => {
      if (response.loggedIn) {
        const token = jwt.sign(
          {
            id: response.user._id,
            name: response.user.name,
            email: response.user.email,
          },
          'secret11'
        )
        res.status(200).json({ response ,usertoken:token})
      } else if (response.inCorrectPassword) {
        res.status(400).json({ err: 'Incorrect Password' })
      } else if (response.inCorrectEmail) {
        res.status(400).json({ err: 'Incorrect Mail Id' })
      }
    })
  } catch (error) {
    console.log('Something went wrong', error);
  }
})
router.post('/formSubmit/:id', (req, res) => {
  
  try {

    upload(req, res, (err) => {
      let userId=req.params.id
      let formData = JSON.parse(req.body.data)
      console.table(formData)
      userHelper.formSubmission(formData,userId).then((response) => {
        const currentPath = path.join(__dirname, "../public", "companyLogo.jpg")
        const destinationPath = path.join(__dirname, "../public/logoImages", response.id + ".jpg")
        fs.rename(currentPath, destinationPath, function (error) {
          if (error) {
            throw error

          } else {
            // console.log('successfully mobved')
          }
        })
        res.status(200).json({ success: 'form submitted successfully' })
      })

      if (err instanceof multer.MulterError) {
        return res.status(500).json({ err: '12345' })
      } else if (err) {
        return res.status(500).json({ err: '54321' })
      }

    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
