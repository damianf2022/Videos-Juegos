import React from 'react'
import styles from './home.module.css'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getvideogames, clearHome, filtroGenres, ordenABC, filtroCreadosApi, ordenRating } from '../../redux/actions';
import { Link } from 'react-router-dom'
//COMPONENTES
import Card from "../Card";
import Paginated from "../Paginacion/index.js";
import NavBar from "../NavBar/index.js";
import Loading from '../Loading/loading';

const Home = () => {

  // hook
  const dispatch = useDispatch()

  //ESTADOS GLOBALES
  const allVideos = useSelector((state) => state.videogames)
  const allGenres = useSelector((state) => state.genres)



  //ESTADOS LOCALES
  const [paginaActual, setpaginaActual] = useState(1)
  const [order, setOrder] = useState("")

  //paginado
  const [juegosForPage, setJuegosForPage] = useState(15)
  const indexUltimoVideo = paginaActual * juegosForPage;
  const indexPriJuego = indexUltimoVideo - juegosForPage;
  const juegosActual = allVideos.slice(indexPriJuego, indexUltimoVideo
  );
  if (juegosActual > Math.ceil(allVideos.length / juegosForPage) && paginaActual != 1) {
    setpaginaActual(1)
  }
  const paginated = (numPage) => {
    setpaginaActual(numPage)
  }
  //montaje
  useEffect(() => {
    dispatch(getvideogames());
    dispatch(getGenres());
  }, [dispatch])

  useEffect(() => {
    dispatch(clearHome())
  }, [dispatch])

  // MANEJO DE ACCIONES
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getvideogames());
    setpaginaActual(1);
  }

  const handlefiltroGenres = (e) => {
    e.preventDefault()
    if (e.target.value === '') {
      dispatch(getvideogames())
    } else {
      dispatch(filtroGenres(e.target.value))
      setpaginaActual(1)
    }
  }

  const handlefiltroCreadosApi = (e) => {
    e.preventDefault();
    dispatch(filtroCreadosApi(e.target.value));
    setpaginaActual(1);
  }
  const handleName = (e) => {
    e.preventDefault();
    dispatch(ordenABC(e.target.value));
    setpaginaActual(1);
  }
  const handleForRating = (e) => {
    e.preventDefault();
    dispatch(ordenRating(e.target.value));
    setpaginaActual(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  const handleReload = (e) => {
    window.location.reload();
  }

  if (allVideos.length === 0) {
    return (
      <div className={styles.home}>
        <div>
          <Loading />
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.home}>

        <NavBar
          setpaginaActual={setpaginaActual}
        />

        {/* <hr /><hr /> */}

        <div className={styles.contenedor}>

          <select className={styles.filter} onChange={e => { handleName(e) }}>
            <option value='todos'>Ordenar ⇅</option>
            <option value='asc'>A - Z</option>
            <option value='desc'>Z - A</option>
          </select>

          <select className={styles.filter} onChange={(e) => { handleForRating(e) }}>
            <option value='default'>Rating</option>
            <option value='all'>Todos</option>
            <option value='rMax'>Máximo</option>
            <option value='rMin'>Minimo</option>
          </select>

          <select className={styles.filter} onChange={(e) => handlefiltroGenres(e)}>
            <option value=''>Generos</option>
            {allGenres && allGenres.map(g => {
              return (
                <option key={g.id} value={g.name}>{g.name}</option>
              )
            })}

          </select>

          <select className={styles.filter} onChange={e => { handlefiltroCreadosApi(e) }}>
            <option value='default'>Creados o Existentes</option>
            <option value='all'>Todos</option>
            <option value='db'>Creados</option>
            <option value='api'>Existentes</option>
          </select>

          <button className={styles.reload} onClick={e => { handleReload(e) }}>⟳</button>

        </div>

        <Paginated
          juegosForPage={juegosForPage}
          allVideos={allVideos.length}
          paginated={paginated}
        />


        <div className={styles.cards} >
          {juegosActual.map(el => {
            return (
              <div key={el.id}>
                <Link to={"/games/" + el.id} style={{ textDecoration: 'none' }}>
                  <Card
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    genres={el.genres.name}
                  />
                </Link>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default Home