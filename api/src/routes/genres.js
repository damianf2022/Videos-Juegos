const {Router} = require('express')
const {Genres} = require('../db')
const router = Router()
const { infoGeneros } = require('../controllers/genres')


router.get('/', async (req, res, next)=>{
    try {
        const traer= await infoGeneros()
        const generosDb= await Genres.findAll()
        if(!generosDb.length){
            const map= traer.map(e=>({
                id: e.id,
                name: e.name
            }))
            const guardar= await Genres.bulkCreate(map)
            res.send(guardar)
        }else{
            const filtroDb= generosDb.map(e=>{
                return{
                    id: e.id,
                    name: e.name
                }
            })
            res.send(filtroDb)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router
