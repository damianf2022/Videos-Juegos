const { Router } = require('express')
const { infoAll, infoById,infoplatform} = require('../controllers/vgame')
const { Videogame, Genres } = require('../db')
// const platforms = require('../models/platforms')
const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query
        let juegos = await infoAll()
        if (name) {
            let juegosName = juegos.find(e => e.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15)
            if (juegosName.length) res.send(juegosName)

            else res.status(404).send('El Video Juego no existe')

        } else {
            let todos = juegos.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    genres: e.genres,
                    image: e.image,
                    rating: e.rating,
                    platforms: e.platforms
                }
            })
            res.send(todos)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/platforms', async (req, res, next) => {
    let juegos = await infoplatform()
    // // let arrjuegos = juegos.map(e => {
    // //     return { platforms: e.platforms }
    // })
    res.send(juegos)

})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const filtroId = await infoById(id)
        return res.send(filtroId)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const { name, description, released, rating, genres, platforms, image } = req.body

    try {
        let newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image
        })

        const addGenres = await Genres.findAll({
            where: {
                name: genres
            }
        })
        newGame.addGenre(addGenres)
        res.send(newGame)
        // console.log(newGame)

    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { name, description, rating, released, platforms } = req.body
    try {
        let updateVideo = await Videogame.findOne({
            where: {
                id: id,
            },
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
        await updateVideo.update({
            name,
            description,
            rating,
            released,
            platforms
        });
        let genDb = await Genres.findAll({
            where: {
                name: {
                    [Op.in]: req.body.genres,
                },
            },
        });
        await updateVideo.setGenres(genDb);
        res.send(updateVideo)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const videoDelete = await Videogame.findByPk(id, {
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        if (videoDelete) {
            await videoDelete.destroy();
            return res.send('Videojuego eliminado!')
        }
        res.status(404).send('Videojuego no encontrado')
    } catch (error) {
        next(error)
    }
})


module.exports = router
