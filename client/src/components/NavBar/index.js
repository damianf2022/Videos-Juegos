import React from 'react';
import styles from './navBar.module.css'
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import imagen from "../imagenes/pacman.gif"


export default function NavBar({setpaginaActual}) {

  return (
    <nav>
      <div className={styles.navBar}>
        <h1>#HenryGame</h1>
        {/* <img src={imagen}></img> */}
        <div>
          <ul>
            <Link to='/games'>
              <button className={styles.button}>
                <li><a href="/games"></a>Crear Juego</li>
              </button>
            </Link>
          </ul>
        </div>

        <SearchBar setpaginaActual={setpaginaActual}
        />
      </div>
    </nav>
  )
}
