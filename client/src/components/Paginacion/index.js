import React from "react";
import styles from './paginacion.module.css'

export default function Paginated({juegosForPage,allVideos,paginated}){
    const numPage = []
    for(let i=1; i<=Math.ceil(allVideos/juegosForPage); i++){
        numPage.push(i)
    }
    return(
        <nav>
            <ul className={styles.paginated}>
                {numPage &&
                numPage.map(number =>(
                        <li className={styles.nro} key={number}>
                        <a onClick={() => paginated(number)} key={number}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}