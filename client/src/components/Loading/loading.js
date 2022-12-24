import React from 'react'
import styles from './loading.module.css'
import imagen from "../imagenes/pacman.gif"

export default function Loading() {
    return (
        <div>
            <div className={styles.loading}>
                <img src={imagen}></img>
                <h1>CARGANDO...</h1>
            </div>
        </div>




    )
}