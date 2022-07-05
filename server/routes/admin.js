var express = require('express');
var router = express.Router();
var adminHelpers = require('../Helpers/adminHelpers')



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
module.exports = router;
