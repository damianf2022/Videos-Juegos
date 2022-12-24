
import axios from 'axios'
import {
    GET_DETALLE,
    FILTRO_API_DB,
    FILTRO_GENRES,
    GET_GENRES,
    GET_NAME,
    GET_VIDEOGAMES,
    ORDEN_ABC,
    ORDEN_RATING,
    CLEAR_DETALLE,
    CLEAR_SEARCH,
    HOME,
    CLEAR_HOME,
    DELETE_VIDEOGAME,
    GET_PLATFORM
} from './constantes'


export function getvideogames() {
    return async function (dispatch) {
        try {
            let videogames = await axios.get('http://localhost:3001/videogames')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: videogames.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function home(payload) {
    return {
        type: HOME,
        payload
    }
}
export function getName(name) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: GET_NAME,
                payload: json.data
            })
        } catch (error) {
            alert(`El nombre " ${name} " no corresponde a un VideoGame existente`)
        }
    }
}

export function getGenres() {
    return async (dispatch) => {
        try {
            let infogenres = await axios.get('http://localhost:3001/generos')
            // console.log("bbbbbbb",infogenres);
            return dispatch({
                type: GET_GENRES,
                payload: infogenres.data.map(genero => genero)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getPlatform() {
    return async (dispatch) => {
        try {
            let infoplat = await axios.get('http://localhost:3001/videogames/platforms')
            // console.log("aaaaa",infoplat);
            return dispatch({
                type: GET_PLATFORM,
                payload: infoplat.data.map(platforms=>platforms)
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function filtroGenres(payload) {
    return {
        type: FILTRO_GENRES,
        payload
    }
}
export function filtroCreadosApi(payload) {
    return {
        type: FILTRO_API_DB,
        payload
    }
}
export function crearVideoGames(input) {
    return async function () {
        const crear = axios.post('http://localhost:3001/videogames', input)
        return crear.data
    }
}
export function deleteVideogame(id) {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/videogames/${id}`)
        return dispatch({
            type: DELETE_VIDEOGAME
        })
    }
}
export function ordenABC(payload) {
    return {
        type: ORDEN_ABC,
        payload
    }
}

export function ordenRating(payload) {
    return {
        type: ORDEN_RATING,
        payload
    }
}

export function getDetalle(id) {
    return async function (dispatch) {
        try {
            const detail = await axios.get(`http://localhost:3001/videogames/${id}`)

            return dispatch({
                type: GET_DETALLE,
                payload: detail.data
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type: GET_DETALLE,
                payload: { name: 404 }
            })
        }
    }
}

export function clearDetalle() {
    return {
        type: CLEAR_DETALLE,
    }
}
export function clearSearch() {
    return {
        type: CLEAR_SEARCH,
    }
}
export function clearHome() {
    return {
        type: CLEAR_HOME,
    }
}

