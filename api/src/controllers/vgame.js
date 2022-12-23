const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const URL = 'https://api.rawg.io/api/games'
const { Videogame, Genres } = require('../db')


const infoApi = async () => {
    const games = []
    let url = `https://api.rawg.io/api/games?key=f9ee51ed795746a1970f93399a92c096`
    for (let i = 1; i < 6; i++) {
        let pages = await axios.get(url)
        pages.data?.results.forEach((e) => {
            games.push({
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                image: e.background_image,
                platforms: e.platforms.map(e => e.platform.name),
                genres: e.genres.map(e => e.name),
            })
        })

        url = pages.data.next
    }
    // console.log(games);
    return games
}

const infoDb = async () => {
    const findAllDb = await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    const bdMap = await findAllDb.map(e => ({
        id: e.id,
        name: e.name,
        description: e.description,
        released: e.released,
        rating: e.rating,
        platform: e.platform,
        genres: e.genres.map(e => e.name)
    }))
    return bdMap
}

const infoAll = async () => {
    const api = await infoApi()
    const db = await infoDb()
    const infoTotal = [...api, ...db]
    return infoTotal
}

const infoById = async (id) => {
    if (typeof id === 'string' && id.length > 8) {
        const infoIdDb = await Videogame.findByPk(id, {
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return infoIdDb
    } else {
        const infoIdApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=f9ee51ed795746a1970f93399a92c096`)
        const e = infoIdApi.data
        const info = {
            id: e.id,
            name: e.name,
            image: e.background_image,
            description: e.description_raw,
            released: e.released,
            rating: e.rating,
            platform: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name)
        }
        return info
    }
}
module.exports = {
    infoApi,
    infoDb,
    infoAll,
    infoById,
}
