import React from 'react';
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetalle, clearDetalle } from '../../redux/actions';
// import Loading from '../Loading/loading';
import style from "./detail.module.css"





const Details = () => {
    const myJuego = useSelector(state => state.detalle);



    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetalle(id));
        return () => { dispatch(clearDetalle()) }
    }, [dispatch, id]);


    // console.log('myJuego=', myJuego)

    return (

        <div className={style.container}>
            <div key={myJuego.id}>
                <h1>{myJuego.name}</h1>
                <img src={myJuego.background_image ? myJuego.background_image : myJuego.image} alt='nada' width='400px' height='250px' />
                <div>
                    <h4>Rating: {myJuego.rating}</h4>
                    <h4>Released: {myJuego.released}</h4>
                    <h4>Platforms: {' '}
                        {myJuego.platform ? myJuego.platform + ', ' : myJuego.platform?.map((p, i) => (<li key={i}>{p.name}</li>))}
                    </h4>
                    <h4>Genres : {myJuego.genres?.map((g,i)=>(<li key={i}>{g.name}</li>))}</h4>
                <h4>Descripcion :</h4><p>{myJuego.description}</p>
                </div>

            </div>




        </div >
    )
}

export default Details
/*
[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas */