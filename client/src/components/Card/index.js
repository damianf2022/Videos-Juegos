import React from "react";
import styles from './cards.module.css'

export default function Cards({ id, name, image, genres }) {
    return (
        <div className={styles.card}>
            <div className={styles.front}>
                <img src={image} alt='Image not found' width='200px' height='250px'></img>
                <h3>{name}</h3>
                <h2>{genres}</h2>
            </div>
            <div className={styles.back}>
                {/* <h3>Genres: {genres.map(el => { return el.name + " - " })}</h3> */}
            </div>
        </div>
    )
}

