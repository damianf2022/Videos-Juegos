const { Router } = require('express');

const router = Router();
const videogameRoute= require ('./games')
const generoRoute= require ('./genres')


router.use('/videogames', videogameRoute)
router.use('/generos', generoRoute)

module.exports = router;
  