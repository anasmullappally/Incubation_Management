var express = require('express');
var router = express.Router();
var adminHelpers = require('../Helpers/adminHelpers')
const jwt = require('jsonwebtoken')



router.post('/login', (req, res) => {
  let details = req.body
  try {
    adminHelpers.doLogin(details).then((response) => {
      if (response.loggedIn) {


        const token = jwt.sign(
          {
            id: response.admin._id,
            name: response.admin.name,
            email: response.admin.email,
          },
          'secret11'
        )
        res.status(200).json({ response, adminToken: token })
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

router.get('/applictions/list', (req, res) => {
  adminHelpers.applicationList().then((response) => {

    res.status(200).json({ data: response })
  }).catch(() => {
    res.status(400).json({ data: 'error' })
  })
})

router.get('/user/change', (req, res) => {
  console.table(req.query)
  adminHelpers.changeFormStatus(req.query).then(() => {
    res.status(200).json({ success: 'success' })
  })
})
router.get('/allApllications', (req, res) => {
  adminHelpers.applicationList().then((formDetails) => {
    let response = {}
    let newApplication = []
    let pendingApplication = []
    let confirmedApplication = []
    for (i of formDetails) {
      if (i.status === 'pending') {
        pendingApplication.push(i)
      } else if (i.status === 'approved') {
        confirmedApplication.push(i)
      } else if (i.status === 'new') {
        newApplication.push(i)
      }
    }
    response.all = formDetails
    response.pending = pendingApplication
    response.confirmed = confirmedApplication
    response.new = newApplication
    res.status(200).json(response)
    console.log(response);
  })
})


module.exports = router;
