import React, { useState, useEffect } from 'react';
import { crearVideoGames, getGenres, getPlatform } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css'
import { Link } from 'react-router-dom';
/**Ruta de creación de videojuegos: debe contener
Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Descripción
Fecha de lanzamiento
Rating
[Posibilidad de seleccionar/agregar varios géneros
[Posibilidad de seleccionar/agregar varias plataformas
[Botón/Opción para crear un nuevo videojuego 

*/

export default function JuegoCreate() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platformss = useSelector((state) => state.platform);

    const [input, setInput] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    })
    // console.log("GENRES", genres)

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatform())

    }, [dispatch])
    // console.log("jajaj", platformss);
    // console.log("jojoj",genres);

    function handleChange(e) {
        // console.log("value",)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSelectp(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handleSubmit(e) {

        if (!input.name || input.name.length <= 2 || input.name.length > 50) {
            e.preventDefault();
            return alert("Debe ingresar un nombre que contenga entre 2 y 50 caracteres")
        } else if (!input.genres.length) {
            e.preventDefault();
            return alert('Selecciona al menos un tipo de genero')
        } else if (input.image.length === 0) {
            e.preventDefault();
            return alert('Debe ingresar la URL de la imagen')
        } else if (!(/https:\/\/[a-zA-Z./-]+/gm).test(input.image)) {
            e.preventDefault();
            return alert('Debes ingresar una URL válida')
        }
        else if (!input.rating || input.rating.length <= 0 || input.rating.length >= 100) {
            e.preventDefault();
            return alert('Debes asignar un nivel de Rating entre 1 y 100!')
        }
        else if (!input.description || input.description.length <= 5) {
            e.preventDefault();
            return alert('la description del juego debe contener al menos 20 caracteres!')
        }

        dispatch(crearVideoGames(input))
        alert("Tu juego ha sido creada con éxito!")
        setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: [],
        })
        handleClear()

    }

    function handleClear() {
        document.getElementById("miForm").reset();
        setInput({
            name: "",
            image: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            genres: []
        })
    }

    let handleDelete = (genres) => {
        // alert("borrado")
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== genres)
        })
    }
    let handleDeletep = (platforms) => {
        // alert("borrado")
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== platforms)
        })
    }


    return (
        <div className={styles.container}>
            {/* TITULO */}
            <div className={styles.title}>
                <Link to='/home' style={{ textDecoration: 'none', boxShadow: 'none' }}>
                    <h1>Home</h1>
                </Link>
            </div>
            <div className={styles.cards}>
                <h2>CREÁ TU JUEGO</h2>
                <form id="miForm">
                    <div>

                        {/* INPUT NOMBRE */}
                        <div>
                            <label>Nombre:</label>
                            <input type="text" maxlength="50" id='7' value={input.name} name="name" placeholder='Nombre de tu juego' onChange={(e) => handleChange(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }} />
                        </div>

                        {/* SELECT GENRES */}
                        <div className={styles.genres}>
                            <label>Tipos de generos</label>
                            <select id='8' onChange={(e) => handleSelect(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }}>
                                <option value="" hidden name="genres">Elegí los tipos de generos:</option>
                                {
                                    genres?.map(el => {
                                        // { console.log("KEY", genres) }
                                        return (<option value={el.name} key={el.id}>{el.name}</option>)

                                    })
                                }
                            </select>

                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    {
                                        input.genres.map(el =>
                                            <div className={styles.delete}>
                                                <h5>
                                                    {genres?.find(p => p.name === el)?.name}
                                                    <button onClick={() => handleDelete(el)}>x</button>
                                                </h5>
                                            </div>
                                        )
                                    }
                                </li>
                            </ul>
                            {

                            }
                        </div>
                        {/*----------------------------------------------------------------------------------------------------- */}

                        {/* SELECT PLATFORM */}
                        <div className={styles.genres}>
                            <label>plataformas</label>
                            <select id='9' onChange={(e) => handleSelectp(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }}>
                                <option value="" hidden name="platforms">Elegí los tipos de plataformas:</option>
                                {
                                    platformss?.map(el => {
                                        return (<option value={el.platforms} key={el.id}>{el.platforms}</option>)

                                    })
                                }
                            </select>

                            <ul style={{ listStyle: 'none' }}>
                                <li>
                                    {
                                        input.platforms.map(el =>
                                            <div className={styles.delete}>
                                                <h5>
                                                    {platformss?.find(p => p.platforms === el)?.platforms}
                                                    <button onClick={() => handleDeletep(el)}>x</button>
                                                </h5>
                                            </div>
                                        )
                                    }
                                </li>
                            </ul>
                            {

                            }
                        </div>

                        {/* INPUT IMAGEN */}
                        <div>
                            <label>Imagen:</label>
                            <input type="url" id='9' value={input.image} name="image" placeholder='Ingresá el URL de una imagen...' onChange={(e) => handleChange(e)} style={{ width: '300px', fontSize: '15px', textAlign: 'center' }} />
                        </div>
                        {/* INPUT RATING */}
                        <div>
                            <label>"Rating " :</label>
                            <input type="range" name="rating" onChange={handleChange} style={{ width: '60%', height: '60px', fontSize: '15px', textAlign: 'center' }} min="1" max="100" required />
                            <h5>{input.rating + ' rating'}</h5>
                        </div>
                        <br />
                        {/* INPUT RESUMEN */}
                        <div className={styles.description}>
                            <label>Resumen del juego:</label>
                            <input type="text" name="description" cols="30" rows="10" onChange={handleChange} style={{ width: '300px', height: '100px', fontSize: '15px', textAlign: 'left' }} min="5" max="500" />

                        </div>
                        <br />

                    </div>
                </form>
                <button id='submit' type='submit' onClick={(e) => handleSubmit(e)}>CREAR</button>
                <button type="reset" onClick={(e) => handleClear(e)}>LIMPIAR</button>
            </div>
        </div>
    )


}

// c.image? c.image:<img src:"url..."/> imagen por default

